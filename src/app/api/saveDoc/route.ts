// pages/api/saveDoc.js
import { db } from '@/lib/firebaseAdmin';

export async function POST(req) {

    const { documentId, content } = await req.json();
    console.log(documentId, content)
    if (!documentId || !content) {
      return Response.json({ error: 'Document ID and content are required' }, {status:500});
    }

    try {
      await db.collection('documents').doc(documentId).update({
        content,
        updatedAt: new Date().toISOString(),
      });

      return Response.json({ message: 'Document updated successfully' });
    } catch (error) {
      console.error('Error saving document:', error);
      return Response.json({ error: 'Failed to save document' }, {status: 500});
    }
  
}
