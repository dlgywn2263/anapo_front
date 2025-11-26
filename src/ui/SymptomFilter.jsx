// 메인에 있는 증상별 빠른 병원 찾기 검색창 아래 증상 버튼 ui

"use client";

export default function SymptomFilter({ symptoms, selected, onSelect }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      {symptoms.map((s) => {
        const active = selected.name === s.name;
        return (
          <button
            key={s.name}
            onClick={() => onSelect(s)}
            className={`rounded-full px-5 py-2 text-sm transition border ${
              active
                ? "bg-[#4C7DFF] text-white border-[#4C7DFF]"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s.name}
          </button>
        );
      })}
    </div>
  );
}
