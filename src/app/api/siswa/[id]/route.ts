// File: pages/api/siswa/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/fiebaseAdmin";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || id === "[id]") {
      return NextResponse.json({ error: "Invalid or missing document ID" }, { status: 400 });
    }

    const pendaftaranRef = db.collection("pendaftaran").doc(id);
    const pendaftaranDoc = await pendaftaranRef.get();

    if (!pendaftaranDoc.exists) {
      return NextResponse.json({ error: "Registration document not found" }, { status: 404 });
    }

    const data = pendaftaranDoc.data();
    return NextResponse.json({ id, data });
  } catch (error) {
    console.error("GET error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || id === "[id]") {
      return NextResponse.json({ error: "Invalid or missing document ID" }, { status: 400 });
    }

    const pendaftaranRef = db.collection("pendaftaran").doc(id);
    const pendaftaranDoc = await pendaftaranRef.get();

    if (!pendaftaranDoc.exists) {
      return NextResponse.json({ error: "Registration document not found" }, { status: 404 });
    }

    // Batch delete operation
    const batch = db.batch();
    batch.delete(pendaftaranRef);

    // Delete subcollections (example with 'subcollectionName')
    const subcollections = ['subcollectionName']; // Add more subcollections if needed
    
    for (const subcollection of subcollections) {
      const subcollectionRef = pendaftaranRef.collection(subcollection);
      const subcollectionSnapshot = await subcollectionRef.get();

      subcollectionSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    await batch.commit();

    return NextResponse.json({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}