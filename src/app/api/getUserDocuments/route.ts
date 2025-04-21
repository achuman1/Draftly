import { db } from "@/lib/firebaseAdmin";
import { auth } from "@/auth";
// Fetch documents belonging to the logged-in user
export async function GET(req, res) {
    const session = await auth()

    if (!session) {
        return Response.json({ message: "Unauthorized" }, {status: 401});
    }

    const userId = session.user.id;
    try {
        const documentsRef = db.collection("documents").where("userId", "==", userId);
        const snapshot = await documentsRef.get();
        const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return Response.json({ success: true, documents });
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return Response.json({ message: "Internal server error" }, {status:500});
    }
}
