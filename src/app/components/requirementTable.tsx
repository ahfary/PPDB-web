// src/components/RecruitmentTable.tsx
const candidates = [
  { name: "Mary G. Schunkle", designation: "UI Designer", status: "Tech Interview", color: "bg-orange-200 text-orange-800" },
  { name: "Lawrence A. Mason", designation: "UX Designer", status: "Task", color: "bg-yellow-200 text-yellow-800" },
  { name: "Jimmy E. Wilson", designation: "React Developer", status: "Resume Review", color: "bg-purple-200 text-purple-800" },
  { name: "Vivian J. Joseph", designation: "Backend Developer", status: "Final Interview", color: "bg-green-200 text-green-800" },
]

export default function RecruitmentTable() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recruitment Progress</h3>
        <button className="text-sm text-blue-500 hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {candidates.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-b-0">
            <div className="flex items-center space-x-3">
              <img
                src={`https://randomuser.me/api/portraits/lego/${idx + 1}.jpg`}
                alt={item.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">{item.designation}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${item.color}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
