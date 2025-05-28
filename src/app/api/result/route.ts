// app/api/hasil_test/route.ts
import { NextResponse } from "next/server";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/app/lib/firebase/firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "hasil_test"));

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching test results:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
