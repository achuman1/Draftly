import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerifyCard: React.FC = () => {
	return (
			<Card className="h-full">
				<CardHeader>
					<CardTitle>Verify a Signature</CardTitle>
					<CardDescription>
                    Verify a signature made on Draftly with the hash value.


					</CardDescription>
				</CardHeader>
				<CardContent>
					<Link href={"/verify"}>
						<Button className="w-full bg-bottlegreen">
							<span className="material-symbols-outlined">
								new_window
							</span>{" "}
							Verify
						</Button>
					</Link>
				</CardContent>
			</Card>
	);
};

export default VerifyCard;
