import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"
    ,systemInstruction: `
        Based on the provided details, generate a formal legal contract. 
        The contract should include the following sections:
        1. Introduction with parties and their roles.
        2. Scope of work, describing the tasks to be performed.
        3. Responsibilities of both parties.
        4. Payment terms with the total cost and payment schedule.
        5. Deadlines and project timelines.
        6. Confidentiality clauses protecting sensitive information.
        7. Liability limitations.
        8. Dispute resolution process.
        9. Entire agreement clause.
        10. Governing law.
        11. Signature lines with names and titles of both parties.

        Ensure all placeholders like [Company Name], [Employee Name], [Wage], etc., are replaced with actual values extracted from the content. 
        The contract must be professionally formatted, legally sound, and free of any warnings, disclaimers, or additional commentary. 
        Output only the contract text.
    `
});
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

export {model, fileManager, FileState};