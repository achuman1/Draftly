import { db } from "@/lib/firebaseAdmin"; // Assuming you have firebaseAdmin setup

export async function GET(req) {
  const { documentId } = await req.json();
    console.log(documentId)
  if (!documentId) {
    return Response.json({ message: 'Document ID is required' }, { status: 400 });
  }

  try {
    const documentRef = db.collection('documents').doc(documentId);
    const doc = await documentRef.get();

    if (!doc.exists) {
      return Response.json({ message: 'Document not found' }, { status: 404 });
    }

    const documentData = doc.data();

    return Response.json({ success: true, document: documentData });
  } catch (error) {
    console.error("Error fetching document:", error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
