import { db } from "@/app/lib/firebase/fiebaseAdmin"; // pastikan path ini benar ya
import { handleCors } from "@/lib/cors"; // middleware cors handling
import { NextRequest, NextResponse } from "next/server";

type Siswa = {
  nama: string;
  umur: number;
  kelas: string;
  domisili?: string;
  jurusan?: string;
  noTelpOrtu?: string;
  asalSekolah?: string;
  alamat?: string;
  status?: string;
};

export async function OPTIONS(req: NextRequest) {
  // Untuk preflight request CORS
  return await handleCors(req);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const headers = await handleCors(req);
  const id = params.id;

  try {
    const siswaRef = db.collection("siswa").doc(id);
    const doc = await siswaRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Siswa tidak ditemukan" },
        { status: 404, headers }
      );
    }

    const data = doc.data() as Siswa;
    return NextResponse.json({ id: doc.id, ...data }, { headers });
  } catch (error) {
    console.error("GET /api/siswa/[id] error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data siswa" },
      { status: 500, headers }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const headers = await handleCors(req);
  const id = params.id;
  const data: Partial<Siswa> = await req.json();

  try {
    const siswaRef = db.collection("siswa").doc(id);

    // Cek dulu apakah dokumen ada
    const doc = await siswaRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        { error: "Siswa tidak ditemukan" },
        { status: 404, headers }
      );
    }

    await siswaRef.update(data);

    return NextResponse.json(
      { message: "Data siswa berhasil diupdate" },
      { headers }
    );
  } catch (error) {
    console.error("PUT /api/siswa/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate data siswa" },
      { status: 500, headers }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const headers = await handleCors(req);
  const id = params.id;

  try {
    const siswaRef = db.collection("siswa").doc(id);
    const doc = await siswaRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Siswa tidak ditemukan" },
        { status: 404, headers }
      );
    }

    await siswaRef.delete();

    return NextResponse.json(
      { message: "Data siswa berhasil dihapus" },
      { headers }
    );
  } catch (error) {
    console.error("DELETE /api/siswa/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data siswa" },
      { status: 500, headers }
    );
  }
}
