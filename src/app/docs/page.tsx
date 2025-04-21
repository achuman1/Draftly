import DocumentsCard from "@/components/DocumentsCard/DocumentsCard";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Docs: React.FC = async () => {
	const session = await auth();
	if (!session || !session.user) {
	  redirect("/landing");
	}
	return (
		<div className="px-6 py-4 font-inter">
			<DocumentsCard mini={false} />
		</div>
	);
};

export default Docs;
