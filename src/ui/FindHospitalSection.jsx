// app/main/ page.jsx에 들어갈 최종 증상별 빠른 병원 찾기 + 긴급상황 대처법 컴포넌트

"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import SymptomFilter from "./SymptomFilter";
import EmergencySlider from "./EmergencySlider";
import HospitalCard from "@/components/patient/HospitalCard";
import mockHospitals from "@/data/patient/mockHospitals";

// 증상 → 진료과 매핑
const symptomOptions = [
  { name: "전체", departments: [] },
  { name: "두통", departments: ["신경과", "내과"] },
  { name: "복통", departments: ["내과", "소화기내과"] },
  { name: "기침", departments: ["호흡기내과", "내과"] },
  { name: "인후통", departments: ["이비인후과"] },
  { name: "발열", departments: ["내과"] },
  { name: "어지러움", departments: ["신경과"] },
  { name: "가슴통증", departments: ["순환기내과", "응급의학과"] },
  { name: "허리통증", departments: ["정형외과"] },
  { name: "피부진", departments: ["피부과"] },
  { name: "눈통증", departments: ["안과"] },
];

export default function FindHospitalSection() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(symptomOptions[0]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // ✅ 지금은 mock 데이터 사용
    setHospitals(mockHospitals);

    // ✅ 나중에 백엔드(Spring) 연동 자리
    /*
    async function loadHospitals() {
      const res = await fetch("http://localhost:8080/api/hospitals");
      const data = await res.json();
      setHospitals(data);
    }
    loadHospitals();
    */
  }, []);

  // 검색 + 증상 필터링
  const filteredHospitals = hospitals.filter((h) => {
    const matchSearch =
      h.name.includes(searchText) || h.address.includes(searchText);

    if (selectedSymptom.name === "전체") return matchSearch;

    const hasDept = selectedSymptom.departments.some((dept) =>
      h.departments.includes(dept)
    );

    return matchSearch && hasDept;
  });

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        {/* 타이틀 + 검색창 */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            증상별 빠른 병원 찾기
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            증상을 선택하시면 맞춤 병원을 추천해드립니다.
          </p>

          {/* 검색창 */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search
                className="pointer-events-none absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-3 pl-9 pr-4 text-sm shadow-sm focus:border-[#4C7DFF] focus:outline-none"
                placeholder="병원명 또는 지역으로 검색하세요..."
              />
            </div>
          </div>

          {/* 증상 필터 버튼 */}
          <SymptomFilter
            symptoms={symptomOptions}
            selected={selectedSymptom}
            onSelect={setSelectedSymptom}
          />
        </div>

        {/* 메인 콘텐츠 : 왼쪽 7 / 오른쪽 3 */}
        <div className="grid grid-cols-10 gap-8">
          {/* 왼쪽 : 병원 리스트 (비율 7) */}
          <div className="col-span-7 space-y-5">
            {/* 2열 카드 */}
            <div className="grid grid-cols-2 gap-8">
              {filteredHospitals.map((h) => (
                <HospitalCard key={h.id} hospital={h} />
              ))}
            </div>
          </div>

          {/* 오른쪽 : 응급처치 카드 (비율 3) */}
          <div className="col-span-3">
            <EmergencySlider />
          </div>
        </div>
      </div>
    </section>
  );
}
