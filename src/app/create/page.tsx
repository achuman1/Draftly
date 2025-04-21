"use client";
import React, { useState } from "react";
import UploadCard from "@/components/UploadCard";
import MarkdownEdit from "@/components/MarkdownEdit";
import { SessionProvider } from "next-auth/react"


const create: React.FC = () => {
	const [document, setDocument] = useState(null);
	
	const [documentId, setDocumentId] = useState(null)
	
	return (
		<>
			<SessionProvider>
				{!document && (
					<div className="flex items-center justify-center w-full h-[calc(100vh-72px)] p-4 font-inter">
						<UploadCard setDocument={setDocument} setDocumentId={setDocumentId} />
					</div>
				)}
				{document && (
					<div className="w-screen p-4 font-inter h-[90vh]"><MarkdownEdit document={document} setDocument={setDocument} documentId={documentId} /></div>
				)}
			</SessionProvider>
		</>
	);
};

export default create;
