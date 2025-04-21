"use client";
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
import DocumentList from "./DocumentList";
import Link from "next/link";
import MarkdownEdit from "../MarkdownEdit";
import MDEditor from "@uiw/react-md-editor";

interface DocumentsCardProps {
	mini?: boolean;
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ mini }) => {
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Documents</CardTitle>
				<CardDescription>
					View and manage your existing legal agreements.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4">
					<DocumentList mini={mini} />
					{!mini && (
						<MDEditor.Markdown
							className="w-3/4 p-6"
							source={`## Employment Agreement

This Employment Agreement (the “Agreement”) is made and entered into as of the [DATE], by and between Cygnet Infotech Pvt Ltd, a company incorporated and existing under the laws of India, with its registered office at [ADDRESS], Ahmedabad, India (hereinafter referred to as "Company"), and John, residing at [ADDRESS] (hereinafter referred to as “Employee”).

**WITNESSETH:**

WHEREAS, the Company desires to employ the Employee as a Full Stack Engineer and the Employee desires to be employed by the Company;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

**1.  Employment**

1.1. The Company hereby agrees to employ the Employee as a Full Stack Engineer, and the Employee hereby agrees to be employed by the Company, on the terms and conditions set forth in this Agreement.

1.2.  The Employee’s working hours shall be eight (8) hours per day, Monday through Friday, except for public holidays as recognized by the Government of India.

**2.  Scope of Work**

2.1. The Employee shall perform the following duties and responsibilities:

* Develop and maintain web applications using various programming languages and technologies.
* Participate in all phases of the software development lifecycle, including design, coding, testing, and deployment.
* Collaborate with other team members to ensure timely project delivery.
* Adhere to Company policies and procedures, including but not limited to those related to data security, confidentiality, and intellectual property.

2.2. The specific duties and responsibilities of the Employee may be modified from time to time by the Company, in its sole discretion, as reasonably required by the needs of the Company.

**3. Compensation and Benefits**

3.1. The Company shall pay the Employee an annual salary of INR 8,00,000 (Eight Lakhs Indian Rupees) (the “Salary”), payable in monthly installments on the [DATE] of each month.

3.2. The Company shall provide the Employee with the following benefits:

* [List any benefits provided, such as health insurance, paid time off, etc.]

**4. Term and Termination**

4.1. This Agreement shall commence on [DATE] and shall continue for a period of one (1) year (the “Term”). 

4.2. This Agreement may be terminated by either party upon written notice to the other party, with [NUMBER] days prior written notice, for any reason or no reason at all.

4.3. The Company may terminate this Agreement immediately upon written notice to the Employee for any of the following reasons:

* Material breach of this Agreement by the Employee.
* Gross misconduct by the Employee.
* Failure to perform the Employee’s duties in a satisfactory manner.

**5. Confidentiality**

5.1.  The Employee acknowledges that during the course of employment, the Employee will have access to confidential information of the Company, including but not limited to trade secrets, customer information, financial data, and other proprietary information.

5.2.  The Employee agrees to hold all confidential information of the Company in strict confidence and not disclose it to any third party without the prior written consent of the Company.

5.3.  The Employee’s obligation of confidentiality shall survive the termination of this Agreement.

**6. Intellectual Property**

6.1.  The Employee agrees that all intellectual property rights, including but not limited to copyrights, patents, trademarks, and trade secrets, created by the Employee during the course of employment shall be the sole and exclusive property of the Company.

6.2.  The Employee agrees to assign to the Company all right, title, and interest in and to such intellectual property rights.

**7. Liability**

7.1. The Employee shall be responsible for all acts and omissions of the Employee, including but not limited to any liability arising out of the Employee’s negligence, breach of this Agreement, or violation of any applicable law or regulation.

7.2. The Company shall not be liable for any damages arising out of any act or omission of the Employee, including but not limited to any liability arising out of the Employee’s negligence, breach of this Agreement, or violation of any applicable law or regulation.

**8. Dispute Resolution**

8.1. Any dispute arising out of or relating to this Agreement shall be settled amicably between the parties.

8.2.  In the event that the parties are unable to reach a mutually agreeable settlement within [NUMBER] days of the dispute arising, the dispute shall be referred to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996.

**9. General Provisions**

9.1. This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous communications, representations, or agreements, whether oral or written.

9.2. This Agreement may only be amended or modified by a written instrument signed by both parties.

9.3. If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.

9.4. This Agreement shall be governed by and construed in accordance with the laws of India.

**IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.**

**Cygnet Infotech Pvt Ltd**

**[Name of Authorized Representative]**

**John**

**[Date]**


Signed by: John on 10/25/2024
Hash: 44090f6ae6c2e9d57d29c677165a9482cb6ed21e25065c263a4ae677979e26db`}
							readOnly={true}
						/>
					)}
				</div>
			</CardContent>
			{mini && (
				<CardFooter className="flex justify-end">
					<Link href={"/docs"}>
						<Button variant="link">See more</Button>
					</Link>
				</CardFooter>
			)}
		</Card>
	);
};

export default DocumentsCard;
