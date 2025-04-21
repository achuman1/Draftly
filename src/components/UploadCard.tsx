"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const UploadCard = ({ setDocument, setDocumentId }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
	console.log(userId)
    const [audioBase64, setAudioBase64] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [mimeType, setMimeType] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the button
    const [error, setError] = useState<string | null>(null); // Error state
    // State for company details
    const [companyDetails, setCompanyDetails] = useState({
        companyName: "",
        companyCity: "",
        companyCountry: "",
        position: "",
    });

    useEffect(() => {
        const fetchCompanyDetails = async () => {
			console.log(userId)
            if (!userId) return; // Return if userId is not available
            try {
                const response = await fetch("/api/onboarding", {
					method:"GET"
				});
                const data = await response.json();

                if (data.success) {
                    setCompanyDetails({
                        companyName: data.companyName,
                        companyCity: data.companyCity,
                        companyCountry: data.companyCountry,
                        position: data.position,
                    });
                } else {
                    setError(data.error);
                }
            } catch (err) {
                console.error("Error fetching company details:", err);
                setError("Failed to fetch company details.");
            }
        };

        fetchCompanyDetails();
    }, [userId]); // Fetch details when the component mounts or userId changes

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMimeType(file.type);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAudioBase64(reader.result as string); // Base64-encoded string
            };
            reader.readAsDataURL(file); // This will trigger the reader.onloadend event
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state
        if (!audioBase64 && !description) {
            setError("Either a file or a description must be provided.");
            return;
        }
        setLoading(true); // Set loading state to true
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    audioBase64: audioBase64, // Send the base64 encoded audio
                    mimeType: mimeType,       // Send the MIME type
                    description: description, // Include description
                    companyDetails: companyDetails // Include existing company details
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate document");
            }

            const data = await response.json();
            console.log("Response from server:", data);

			const documentResponse = await fetch("/api/createDoc", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userId, // The user's ID
					content: data.message, // The generated document content
				}),
			});
	
			if (!documentResponse.ok) {
				throw new Error("Failed to upload document");
			}
	
			const documentData = await documentResponse.json();
			console.log(documentData)
			setDocumentId(documentData.id)
            setDocument(data.message);
            // You can handle successful response here
        } catch (error) {
            console.error("Error uploading file:", error);
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Document</CardTitle>
                <CardDescription>
                    Generate a new agreement by uploading a voice recording and/or giving a description.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="audio">Upload a Call Recording</Label>
                    <Input type="file" name="audio" onChange={handleFileChange} />
                    <br />
                    <Label htmlFor="description">Description</Label>
                    <Input
                        type="text"
                        name="description"
                        value={description} // Bind description input
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        type="text"
                        name="companyName"
                        value={companyDetails.companyName} // Bind company name
                        readOnly // Make it read-only if you don't want to allow edits
                    />
                    <Label htmlFor="companyCity">Company City</Label>
                    <Input
                        type="text"
                        name="companyCity"
                        value={companyDetails.companyCity} // Bind company city
                        readOnly // Make it read-only if you don't want to allow edits
                    />
                    <Label htmlFor="companyCountry">Company Country</Label>
                    <Input
                        type="text"
                        name="companyCountry"
                        value={companyDetails.companyCountry} // Bind company country
                        readOnly // Make it read-only if you don't want to allow edits
                    />
                    <Label htmlFor="position">Position</Label>
                    <Input
                        type="text"
                        name="position"
                        value={companyDetails.position} // Bind position
                        readOnly // Make it read-only if you don't want to allow edits
                    />
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button className="bg-voilet" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <MoonLoader size={15} />
                                Processing...
                            </>
                        ) : (
                            "Generate"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default UploadCard;
