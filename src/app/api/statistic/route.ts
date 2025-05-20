// src/app/api/statistik/route.ts
import { NextResponse } from 'next/server';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDqaxNwwZF5W5Oy2kw1CtQdnrDKlNJmImc",
  authDomain: "ppdb-project-b213e.firebaseapp.com",
  projectId: "ppdb-project-b213e",
  storageBucket: "ppdb-project-b213e.firebasestorage.app",
  messagingSenderId: "562454569704",
  appId: "1:562454569704:web:3f457426b101d5fe36df5d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET() {
  const pendaftaranRef = collection(db, 'pendaftaran');
  const snapshot = await getDocs(pendaftaranRef);
  const data = snapshot.docs.map(doc => doc.data());

  // Hitung statistik
  const total = data.length;
  const berdasarkanJurusan: Record<string, number> = {};
  const berdasarkanJenisKelamin: Record<string, number> = {};

   data.forEach(item => {
    const jurusan = item?.siswa?.jurusan;
    const gender = item?.siswa?.jenisKelamin;

    if (jurusan) {
      berdasarkanJurusan[jurusan] = (berdasarkanJurusan[jurusan] || 0) + 1;
    }
    if (gender) {
      berdasarkanJenisKelamin[gender] = (berdasarkanJenisKelamin[gender] || 0) + 1;
    }
  });

  return NextResponse.json({
    total,
    berdasarkanJurusan,
    berdasarkanJenisKelamin,
    dataSiswa: data  // <-- ini data lengkap tiap dokumen
  });
}
