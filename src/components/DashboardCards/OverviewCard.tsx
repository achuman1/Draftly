import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import OverviewSubCards from "./OverviewSubCards";

const OverviewCard :React.FC = () => {
	return (
			<Card className="h-full">
				<CardHeader>
					<CardTitle>Dashboard</CardTitle>
					<CardDescription>
						Get an overview of your documents and their status.
					</CardDescription>
				</CardHeader>
				<CardContent>
                    <OverviewSubCards />
                </CardContent>
			</Card>
	);
};

export default OverviewCard;
