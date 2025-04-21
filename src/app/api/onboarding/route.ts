// app/api/onboarding/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const formData = await request.json();

    const companyName = formData.companyName;
    const companyCity = formData.companyCity;
    const companyCountry = formData.companyCountry;
    const position = formData.position;

    const companyDetails = {
      companyName,
      companyCity,
      companyCountry,
      position,
      isOnboarded: true,
    };

    const userRef = db.collection("users").doc(userId);
    
    // Check if there's already a companyDetails document for this user
    const existingCompanyDetailsQuery = await db
      .collection("companyDetails")
      .where("userRef", "==", userRef)
      .get();

    if (!existingCompanyDetailsQuery.empty) {
      // If document exists, update it
      const existingDoc = existingCompanyDetailsQuery.docs[0].ref;
      await existingDoc.update(companyDetails);
    } else {
      // If no document exists, create a new one
      const companyDetailsRef = db.collection("companyDetails").doc();
      await companyDetailsRef.set({
        userRef: userRef,
        ...companyDetails,
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error saving company details:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
    try {
      const session = await auth();
  
      if (!session) {
        return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
      }
  
      const userId = session.user.id;
      const userRef = db.collection("users").doc(userId);
      
      // Fetch existing company details for this user
      const existingCompanyDetailsQuery = await db
        .collection("companyDetails")
        .where("userRef", "==", userRef)
        .get();
  
      if (existingCompanyDetailsQuery.empty) {
        return NextResponse.json({ success: false, error: "No company details found" }, { status: 404 });
      }
  
      const existingDoc = existingCompanyDetailsQuery.docs[0].data();
  
      return NextResponse.json({
        success: true,
        companyName: existingDoc.companyName,
        companyCity: existingDoc.companyCity,
        companyCountry: existingDoc.companyCountry,
        position: existingDoc.position,
      });
  
    } catch (error) {
      console.error("Error fetching company details:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  
