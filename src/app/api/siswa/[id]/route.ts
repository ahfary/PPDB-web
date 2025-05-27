// File: src/app/api/siswa/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/fiebaseAdmin";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Check for valid ID
    if (!id) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const pendaftaranRef = db.collection("pendaftaran").doc(id);
    const pendaftaranDoc = await pendaftaranRef.get();

    if (!pendaftaranDoc.exists) {
      return NextResponse.json({ error: "Data pendaftaran tidak ditemukan" }, { status: 404 });
    }

    await pendaftaranRef.delete();

    // Delete subcollection if needed
    const subcollectionRef = pendaftaranRef.collection('subcollectionName');
    const subcollectionSnapshot = await subcollectionRef.get();

    const batch = db.batch();
    subcollectionSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    const errorMessage = error instanceof Error ? error.message : "Gagal menghapus data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}