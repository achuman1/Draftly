import Dashboard from "@/components/Dashboard";
import {auth} from "@/auth"
import { redirect } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
export default async function Home() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/landing");
  }else{
    const userId = session.user.id;
    const userRef = db.collection("users").doc(userId);

    const existingCompanyDetailsQuery = await db
    .collection("companyDetails")
    .where("userRef", "==", userRef)
    .get();

  if (existingCompanyDetailsQuery.empty){
    redirect("/onboarding")
  }
  }
  return (
    <div className="font-inter">
        <Dashboard />
    </div>
  );
}
