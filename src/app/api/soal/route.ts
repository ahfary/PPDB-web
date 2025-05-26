// app/api/soal/route.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// Config Firebase
const firebaseConfig = {
apiKey: "AIzaSyDqaxNwwZF5W5Oy2kw1CtQdnrDKlNJmImc",
  authDomain: "ppdb-project-b213e.firebaseapp.com",
  projectId: "ppdb-project-b213e",
  storageBucket: "ppdb-project-b213e.firebasestorage.app",
  messagingSenderId: "562454569704",
  appId: "1:562454569704:web:3f457426b101d5fe36df5d"
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export async function GET() {
  const soalCollection = collection(db, "soal_test");
  const snapshot = await getDocs(soalCollection);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(data);
}
