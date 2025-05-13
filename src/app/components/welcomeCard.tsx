// src/components/WelcomeCard.tsx
export default function WelcomeCard() {
  return (
    <div className="bg-[#6264d5] rounded-xl p-6 flex gap-8 items-center justify-between text-white">
      <div>
        <h2 className="text-lg font-bold">Hello Mr Abqory!</h2>
        <p className="text-sm mt-2">
          Kamu memiliki Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, enim! Debitis, temporibus.
        </p>
        <button className="btn btn-info mt-2 text-white">
          Read more
        </button>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
        alt="Illustration"
        className="w-40 hidden md:block"
      />
    </div>
  )
}
