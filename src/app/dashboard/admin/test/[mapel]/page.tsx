"use client";

import Sidebar from "@/app/components/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaTrash, FaPlus, FaPen, FaCheckCircle } from "react-icons/fa";

// Import Firebase
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, arrayRemove, arrayUnion, setDoc, getDoc } from "firebase/firestore";

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

export default function BuatSoalPage() {
    const { mapel } = useParams();
    const [soal, setSoal] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const soalRef = useRef<HTMLDivElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [currentSoalIndex, setCurrentSoalIndex] = useState<number | null>(null);
    const [formInput, setFormInput] = useState({
        pertanyaan: "",
        opsiA: "",
        opsiB: "",
        opsiC: "",
        opsiD: "",
        jawabanBenar: ""
    });

    useEffect(() => {
        const fetchSoal = async () => {
            try {
                setLoading(true);
                setError(null);

                // Ambil semua dokumen dari koleksi soal_test
                const snapshot = await getDocs(collection(db, "soal_test"));
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const transformedData = [];
                data.forEach((doc) => {
                    // Cek jika dokumen memiliki properti soal dan mapel yang sesuai
                    if (doc.soal && doc.nama_pelajaran === mapel) {
                        doc.soal.forEach((s: any) => {
                            transformedData.push({
                                id: doc.id,
                                pertanyaan: s.judul,
                                opsiA: s.jawaban[0],
                                opsiB: s.jawaban[1],
                                opsiC: s.jawaban[2],
                                opsiD: s.jawaban[3],
                                jawabanBenar: s.jawaban_benar
                            });
                        });
                    }
                });

                setSoal(transformedData);
            } catch (error: any) {
                console.error("Gagal fetch soal:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSoal();
    }, [mapel]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (currentSoalIndex !== null) {
            // Edit existing soal
            try {
                const docRef = doc(db, "soal_test", mapel);
                const docSnapshot = await getDoc(docRef);

                if (!docSnapshot.exists()) {
                    // Jika dokumen tidak ada, buat dokumen baru dan tambahkan soal
                    await setDoc(docRef, {
                        nama_pelajaran: mapel,
                        soal: [
                            {
                                judul: formInput.pertanyaan,
                                jawaban: [
                                    formInput.opsiA,
                                    formInput.opsiB,
                                    formInput.opsiC,
                                    formInput.opsiD
                                ],
                                jawaban_benar: formInput.jawabanBenar
                            }
                        ]
                    });
                } else {
                    // Jika dokumen ada, perbarui soal yang ada
                    await updateDoc(docRef, {
                        soal: arrayRemove(soal[currentSoalIndex])
                    });

                    await updateDoc(docRef, {
                        soal: arrayUnion({
                            judul: formInput.pertanyaan,
                            jawaban: [
                                formInput.opsiA,
                                formInput.opsiB,
                                formInput.opsiC,
                                formInput.opsiD
                            ],
                            jawaban_benar: formInput.jawabanBenar
                        })
                    });
                }

                setSoal(prev => prev.map((s, i) => i === currentSoalIndex ? {
                    ...s,
                    pertanyaan: formInput.pertanyaan,
                    opsiA: formInput.opsiA,
                    opsiB: formInput.opsiB,
                    opsiC: formInput.opsiC,
                    opsiD: formInput.opsiD,
                    jawabanBenar: formInput.jawabanBenar
                } : s));

                setShowForm(false);
                setCurrentSoalIndex(null);
                setFormInput({
                    pertanyaan: "",
                    opsiA: "",
                    opsiB: "",
                    opsiC: "",
                    opsiD: "",
                    jawabanBenar: ""
                });
            } catch (err: any) {
                console.error("Gagal edit soal:", err);
                setError(err.message);
            }
        } else {
            // Add new soal
            try {
                const docRef = doc(db, "soal_test", mapel);
                const docSnapshot = await getDoc(docRef);

                if (!docSnapshot.exists()) {
                    // Jika dokumen tidak ada, buat dokumen baru dan tambahkan soal
                    await setDoc(docRef, {
                        nama_pelajaran: mapel,
                        soal: [
                            {
                                judul: formInput.pertanyaan,
                                jawaban: [
                                    formInput.opsiA,
                                    formInput.opsiB,
                                    formInput.opsiC,
                                    formInput.opsiD
                                ],
                                jawaban_benar: formInput.jawabanBenar
                            }
                        ]
                    });
                } else {
                    // Jika dokumen ada, tambahkan soal baru
                    await updateDoc(docRef, {
                        soal: arrayUnion({
                            judul: formInput.pertanyaan,
                            jawaban: [
                                formInput.opsiA,
                                formInput.opsiB,
                                formInput.opsiC,
                                formInput.opsiD
                            ],
                            jawaban_benar: formInput.jawabanBenar
                        })
                    });
                }

                setSoal(prev => [...prev, {
                    id: mapel,
                    pertanyaan: formInput.pertanyaan,
                    opsiA: formInput.opsiA,
                    opsiB: formInput.opsiB,
                    opsiC: formInput.opsiC,
                    opsiD: formInput.opsiD,
                    jawabanBenar: formInput.jawabanBenar
                }]);

                setShowForm(false);
                setFormInput({
                    pertanyaan: "",
                    opsiA: "",
                    opsiB: "",
                    opsiC: "",
                    opsiD: "",
                    jawabanBenar: ""
                });
            } catch (err: any) {
                console.error("Gagal tambah soal:", err);
                setError(err.message);
            }
        }
    };

    const handleEditSoal = (index: number) => {
        const soalToEdit = soal[index];
        setFormInput({
            pertanyaan: soalToEdit.pertanyaan,
            opsiA: soalToEdit.opsiA,
            opsiB: soalToEdit.opsiB,
            opsiC: soalToEdit.opsiC,
            opsiD: soalToEdit.opsiD,
            jawabanBenar: soalToEdit.jawabanBenar
        });
        setCurrentSoalIndex(index);
        setShowForm(true);
    };

    const handleHapusSoal = async (index: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus soal ini?")) {
            try {
                const docRef = doc(db, "soal_test", mapel);
                await updateDoc(docRef, {
                    soal: arrayRemove(soal[index])
                });

                setSoal(prev => prev.filter((_, i) => i !== index));
            } catch (err: any) {
                console.error("Gagal hapus soal:", err);
                setError(err.message);
            }
        }
    };

    const handleTambahSoal = () => {
        setShowForm(true);
        setCurrentSoalIndex(null);
        setFormInput({
            pertanyaan: "",
            opsiA: "",
            opsiB: "",
            opsiC: "",
            opsiD: "",
            jawabanBenar: ""
        });
    };

    const handleNavigateToSoal = (index: number) => {
        if (soalRef.current) {
            soalRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) return <div className="flex min-h-screen bg-gray-100"><Sidebar /><div className="flex-1 p-8 flex items-center justify-center"><div className="loading loading-spinner loading-lg"></div></div></div>;

    if (error) return <div className="flex min-h-screen bg-gray-100"><Sidebar /><div className="flex-1 p-8 flex items-center justify-center"><h2 className="text-error">Error: {error}</h2></div></div>;

    return (
        <div className="flex min-h-screen bg-gray-100 text-black">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-xl font-bold mb-6">BUAT SOAL - {mapel?.toUpperCase()}</h1>

                {showForm && (
                    <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded-lg p-8 mb-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Pertanyaan</label>
                            <input
                                type="text"
                                value={formInput.pertanyaan}
                                onChange={(e) => setFormInput(prev => ({...prev, pertanyaan: e.target.value}))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Opsi A</label>
                            <input
                                type="text"
                                value={formInput.opsiA}
                                onChange={(e) => setFormInput(prev => ({...prev, opsiA: e.target.value}))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Opsi B</label>
                            <input
                                type="text"
                                value={formInput.opsiB}
                                onChange={(e) => setFormInput(prev => ({...prev, opsiB: e.target.value}))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Opsi C</label>
                            <input
                                type="text"
                                value={formInput.opsiC}
                                onChange={(e) => setFormInput(prev => ({...prev, opsiC: e.target.value}))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Opsi D</label>
                            <input
                                type="text"
                                value={formInput.opsiD}
                                onChange={(e) => setFormInput(prev => ({...prev, opsiD: e.target.value}))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Jawaban Benar</label>
                            <select
                                value={formInput.jawabanBenar}
                                onChange={(e) => setFormInput(prev => ({...prev, jawabanBenar: e.target.value}))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="" disabled selected>Pilih Jawaban Benar</option>
                                <option value={formInput.opsiA}>A. {formInput.opsiA}</option>
                                <option value={formInput.opsiB}>B. {formInput.opsiB}</option>
                                <option value={formInput.opsiC}>C. {formInput.opsiC}</option>
                                <option value={formInput.opsiD}>D. {formInput.opsiD}</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setCurrentSoalIndex(null);
                                    setFormInput({
                                        pertanyaan: "",
                                        opsiA: "",
                                        opsiB: "",
                                        opsiC: "",
                                        opsiD: "",
                                        jawabanBenar: ""
                                    });
                                }}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Batal
                            </button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Simpan
                            </button>
                        </div>
                    </form>
                )}

                <div className="flex flex-col lg:flex-row gap-6 overflow-y-auto h-[50rem]">
                    <div className="flex-1 overflow-y-auto pr-4">
                        {soal.length === 0 ? (
                            <div className="bg-white shadow-md rounded-lg p-8 text-center">
                                <p>Tidak ada soal untuk mapel ini.</p>
                                <button onClick={handleTambahSoal} className="btn btn-success mt-4">Simpan Soal</button>
                            </div>
                        ) : (
                            soal.map((item, index) => (
                                <div key={`${item.id}-${item.pertanyaan}`} className="flex bg-white shadow-md rounded-lg mb-6 overflow-hidden">
                                    <div className="flex-1 p-5">
                                        <p className="mb-3 font-medium">{index + 1}. {item.pertanyaan}</p>
                                        <div className="space-y-2">
                                            {['A', 'B', 'C', 'D'].map((huruf, i) => {
                                                const jawaban = item[`opsi${huruf}`];
                                                const isCorrect = jawaban === item.jawabanBenar;

                                                return (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name={`soal-${index}`}
                                                            className="radio radio-sm bg-gray-300"
                                                            readOnly
                                                            checked={isCorrect}
                                                        />
                                                        <input
                                                            type="text"
                                                            value={jawaban || ""}
                                                            className="input input-bordered input-sm w-full bg-gray-100"
                                                            readOnly
                                                        />
                                                        {isCorrect && (
                                                            <FaCheckCircle className="text-green-500" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center bg-[#278550] px-2 py-4 text-white gap-3">
                                        <button onClick={() => handleEditSoal(index)} className="btn btn-ghost text-xs hover:btn-accent">
                                            <FaPen />
                                        </button>
                                        <button onClick={() => handleHapusSoal(index)} className="btn btn-ghost text-xs hover:btn-accent">
                                            <FaTrash />
                                        </button>
                                        <button onClick={handleTambahSoal} className="btn btn-ghost text-xs hover:btn-accent">
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8 w-1/3 h-fit">
                        <div className="grid grid-cols-5 gap-6">
                            {soal.map((_, i) => (
                                <button key={i} onClick={() => handleNavigateToSoal(i)} className="btn btn-lg bg-white border-1 text-md w-full text-black focus:bg-[#278550] focus:text-white">
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}