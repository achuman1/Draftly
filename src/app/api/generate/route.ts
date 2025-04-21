import { model, fileManager, FileState } from "@/lib/gemini";
import fs from "fs";
import os from "os";
import path from "path";


export async function POST(req) {
	try {
	  const { audioBase64, mimeType, description, companyDetails } = await req.json();
	  let prompt = "";
	  let result;
	  const { companyName, companyCity, companyCountry, position } = companyDetails;

	  if (audioBase64 && mimeType) {
		// Convert the base64 audio to a buffer
		const base64Data = audioBase64.split(",")[1];
		const audioBuffer = Buffer.from(base64Data, "base64");
  
		// Save the file to the system's temporary directory
		const tempDir = os.tmpdir();
		const tempFilePath = path.join(tempDir, `uploaded_audio_${Date.now()}.mp3`);
  
		fs.writeFileSync(tempFilePath, audioBuffer); // Write audio file
		console.log("Temporary file saved at:", tempFilePath);
  
		// Upload file to Google file API
		const uploadResult = await fileManager.uploadFile(tempFilePath, {
		  mimeType: mimeType,
		  displayName: "Uploaded Call Recording",
		});
		console.log("File uploaded:", uploadResult);
  
		// Wait for file processing to complete
		let file = await fileManager.getFile(uploadResult.file.name);
		while (file.state === FileState.PROCESSING) {
		  console.log("Processing file...");
		  await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
		  file = await fileManager.getFile(uploadResult.file.name);
		}
  
		// Check if file processing failed
		if (file.state === FileState.FAILED) {
		  throw new Error("Audio processing failed.");
		}
  
		// Construct the prompt based on the uploaded audio
		prompt =
		  "Analyze the uploaded voice recording and extract the key details such as the company name, employee name, wage, job title, and any other relevant terms discussed. Using these details, generate a comprehensive legal contract. The contract should include: a clear title, the introduction specifying the parties involved and their roles, the scope of work, responsibilities, payment terms, deadlines, confidentiality, liability, dispute resolution clauses.Make sure you Also delete the signature placeholders for both the parties. Ensure all placeholders like [Company Name], [Employee Name], [Wage], etc., are replaced with actual values extracted from the call." +  `User Details: Company - ${companyName}, ${position}, located in ${companyCity}, ${companyCountry}. Date: ${new Date().toLocaleDateString()}`;
		  
		  // Call the model API with both the audio file and description
		result = await model.generateContent([
		  {
			fileData: {
			  fileUri: uploadResult.file.uri, // Use the file URI from the uploaded file
			  mimeType: uploadResult.file.mimeType, // Pass the MIME type
			},
		  },
		  {
			text: description ? prompt + description : prompt, // Include description if provided
		  },
		]);
	  } else if (description) {
		  prompt =
		  "Using the provided description, generate a legal contract that formalizes the agreements. The contract should include: a clear title for the contract, an introduction specifying the parties involved, their roles, and the date of the agreement, the scope of work, responsibilities, payment terms, deadlines, confidentiality, liability, dispute resolution clauses. Make sure you Also delete the signature placeholders for both the parties. Ensure the contract uses professional legal language and is based on the provided details."+  `User Details: Company - ${companyName}, ${position}, located in ${companyCity}, ${companyCountry}.`;
		  
		  result = await model.generateContent([{ text: prompt + description }]);
	  } else {
		throw new Error("Either audio or description must be provided.");
	}
  
	  // Return the result
	  return new Response(
		JSON.stringify({ message: result.response.text() }),
		{
			status: 200,
		  headers: {
			"Content-Type": "application/json",
		},
		}
	);
	} catch (error) {
		console.error("Error processing request:", error);
	  return new Response(
		JSON.stringify({ error: "Internal server error" }),
		{ status: 500, headers: { "Content-Type": "application/json" } }
	  );
	}
  }


  
  
  
  
  // export async function POST(req) {
  // 	try {
  // 		const { audioBase64, mimeType, description } = await req.json();
  // 		let prompt = "";
  // 		let result;
  
  // 		if (audioBase64 && mimeType) {
  // 			// Convert the base64 audio to a buffer
  // 			const base64Data = audioBase64.split(",")[1];
  // 			const audioBuffer = Buffer.from(base64Data, "base64");
  
  // 			// Save the file to the system's temporary directory
  // 			const tempDir = os.tmpdir();
  // 			const tempFilePath = path.join(tempDir, `uploaded_audio_${Date.now()}.mp3`);
  
  // 			fs.writeFileSync(tempFilePath, audioBuffer); // Write audio file
  // 			console.log("Temporary file saved at:", tempFilePath);
  
  // 			// Upload file to Google file API
  // 			const uploadResult = await fileManager.uploadFile(tempFilePath, {
  // 				mimeType: mimeType,
  // 				displayName: "Uploaded Call Recording",
  // 			});
  // 			console.log("File uploaded:", uploadResult);
  
  // 			// Wait for file processing to complete
  // 			let file = await fileManager.getFile(uploadResult.file.name);
  // 			while (file.state === FileState.PROCESSING) {
  // 				console.log("Processing file...");
  // 				await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
  // 				file = await fileManager.getFile(uploadResult.file.name);
  // 			}
  
  // 			// Check if file processing failed
  // 			if (file.state === FileState.FAILED) {
  // 				throw new Error("Audio processing failed.");
  // 			}
  
  // 			// Construct the prompt based on the uploaded audio
  // 			prompt =
  // 			"Using the provided description, generate a legal contract that formalizes the agreements. The contract should include: a clear title for the contract, an introduction specifying the parties involved, their roles, and the date of the agreement, the scope of work, responsibilities, payment terms, deadlines, confidentiality, liability, dispute resolution clauses, and signature lines. Ensure the contract uses professional legal language and is based on the provided details.";
  
  // 			// Call the model API with both the audio file and description
  // 			result = await model.generateContent([
  // 				{
  // 					fileData: {
  // 						fileUri: uploadResult.file.uri, // Use the file URI from the uploaded file
  // 						mimeType: uploadResult.file.mimeType, // Pass the MIME type
  // 					},
  // 				},
  // 				{
  // 					text: description? prompt + description : prompt, // Include description if provided
  // 				},
  // 			]);
  // 		} else if (description) {
  // 			prompt =
  // 				"Using the following description, generate a legal contract that formalizes the agreements. The contract should include: A clear title for the contract, an introduction specifying the parties involved, their roles, and the date of the agreement, the scope of work, responsibilities, payment terms, deadlines, confidentiality, liability, dispute resolution clauses, and signature lines. Ensure that the contract uses professional legal language and is based on the provided details.";
  
  // 			result = await model.generateContent([{ text: prompt + description }]);
  // 		} else {
  // 			throw new Error("Either audio or description must be provided.");
  // 		}
  
  
  // 		// Return the result
  // 		return new Response(
  // 			JSON.stringify({ message: result.response.text() }),
  // 			{
  // 				status: 200,
  // 				headers: {
  // 					"Content-Type": "application/json",
  // 				},
  // 			}
  // 		);
  // 	} catch (error) {
  // 		console.error("Error processing request:", error);
  // 		return new Response(
  // 			JSON.stringify({ error: "Internal server error" }),
  // 			{ status: 500, headers: { "Content-Type": "application/json" } }
  // 		);
  // 	}
  // }