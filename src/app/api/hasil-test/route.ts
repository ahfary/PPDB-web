/* eslint-disable @typescript-eslint/no-explicit-any */
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "@/config/firebaseServiceAccountKey.json";
import { NextResponse } from "next/server";

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

const db = getFirestore();

export async function GET() {
  try {
    // Ambil semua pendaftar
    const daftarSnapshot = await db.collection("pendaftaran").get();
    const pendaftarMap: Record<string, string> = {};

    daftarSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userid) {
        pendaftarMap[data.userid] = data.nama || "Tidak diketahui";
      }
    });

    // Ambil semua hasil test
    const snapshot = await db.collection("hasil_test").get();
    const rawData = snapshot.docs.map((doc) => doc.data() as any);

    const userGrouped: Record<string, any> = {};

    for (const item of rawData) {
      const id = item.userId;

      if (!userGrouped[id]) {
        const studentName = pendaftarMap[id] || "Tidak diketahui";

        userGrouped[id] = {
          userId: id,
          scores: {},
          studentName,
        };
      }

      userGrouped[id].scores[item.namaPelajaran.toLowerCase()] = item.skor;
    }

    const result = Object.values(userGrouped).map((user: any) => {
      const subjects = ["matematika", "bahasa-inggris", "agama", "psikolog"];
      const total = subjects.reduce(
        (sum, subject) => sum + (user.scores[subject] || 0),
        0
      );
      const average = Math.round(total / subjects.length);

      return {
        studentName: user.studentName,
        ...user.scores,
        rataRata: average,
        status: average >= 70 ? "Lulus" : "Tidak Lulus",
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memuat data." },
      { status: 500 }
    );
  }
}
