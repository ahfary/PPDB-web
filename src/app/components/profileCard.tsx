import Image from "next/image";

// src/components/ProfileCard.tsx
export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow text-center">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
        className="w-20 h-20 mx-auto rounded-full mb-4"
        alt="Mr Smith"
        width={200}
        height={200}
      />
      <h3 className="font-bold text-lg">Mr Abqory</h3>
      <p className="text-sm text-gray-500">Software Engineer</p>
      <div className="flex gap-4 justify-center space-x-4 mt-4 text-sm text-gray-600">
        <div>
          <p className="font-medium">Company</p>
          <p>MadinatulQuran</p>
        </div>
        <div>
          <p className="font-medium">Joined</p>
          <p>14/06/2023</p>
        </div>
        <div>
          <p className="font-medium">Projects</p>
          <p>12 Active</p>
        </div>
      </div>
    </div>
  )
}
