import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import "material-symbols/outlined.css";

interface CardData {
    id: number;
    label: string;
    value: number;
    icon: string;
    bgClass: string;
    textClass: string;
}

const OverviewSubCards: React.FC = () => {
    const cardData: CardData[] = [
        { id: 1, label: "Drafts", value: 10, icon: "pending_actions", bgClass: "bg-bottlegreen hover:bg-foreground", textClass: "text-background" },
        { id: 2, label: "Signed", value: 5, icon: "check", bgClass: "", textClass: "text-foreground" },
        { id: 3, label: "Expired", value: 2, icon: "hourglass_disabled", bgClass: "", textClass: "text-foreground" },
    ];
    
    return (
        <div className="grid items-center justify-center w-full grid-cols-3 gap-2 text-3xl text-center">
            {cardData.map(card => (
                <Card key={card.id} className={card.bgClass}>
                    <CardHeader>
                        <CardTitle className="flex justify-center w-full">
                            <span className={`!text-4xl material-symbols-outlined ${card.textClass}`}>
                                {card.icon}
                            </span>
                        </CardTitle>
                        <CardDescription className={card.textClass}>
                            {card.label}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={card.textClass}>
                        {card.value}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default OverviewSubCards;
