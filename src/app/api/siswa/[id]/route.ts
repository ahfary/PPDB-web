// app/api/siswa/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/fiebaseAdmin";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doc = await db.collection("siswa").doc(params.id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Data siswa tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("GET siswa error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siswaRef = db.collection("siswa").doc(params.id);
    const doc = await siswaRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Data siswa tidak ditemukan" }, { status: 404 });
    }

    await siswaRef.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE siswa error:", error);
    return NextResponse.json({ error: "Gagal menghapus siswa" }, { status: 500 });
  }
}