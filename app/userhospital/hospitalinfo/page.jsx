"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Edit } from "lucide-react";

const hospitalinfo = () => {
  const [info, setInfo] = useState(null);

  /*  
    📌 Spring 백엔드 연동 예정 부분
    useEffect(() => {
      fetch("/api/hospital/info")
        .then(res => res.json())
        .then(data => setInfo(data));
    }, []);
  */

  // ❗ 임시 Mock Data (백엔드 연결 전)
  useEffect(() => {
    setInfo({
      name: "MEDICARE 종합병원",
      phone: "02-1234-5678",
      email: "info@medicare.com",
      address: "서울특별시 강남구 테헤란로 123",
      intro:
        "최첨단 의료 시설과 우수한 의료진으로 환자 중심의 진료를 제공하는 종합병원입니다.",
      founded: "1985년",
      beds: "500개",
      hours: {
        월요일: "09:00 - 18:00",
        화요일: "09:00 - 18:00",
        수요일: "09:00 - 18:00",
        목요일: "09:00 - 18:00",
        금요일: "09:00 - 18:00",
        토요일: "09:00 - 13:00",
        일요일: "휴무",
      },
      departments: [
        {
          name: "내과",
          description: "일반 내과 진료 및 만성질환 관리",
          doctors: 8,
        },
        { name: "외과", description: "외과 수술 및 응급 처치", doctors: 6 },
        { name: "소아과", description: "소아 청소년 전문 진료", doctors: 5 },
        {
          name: "정형외과",
          description: "근골격계 질환 및 외상 치료",
          doctors: 4,
        },
        { name: "피부과", description: "피부 질환 및 미용 치료", doctors: 3 },
        { name: "안과", description: "눈 질환 및 시력 교정", doctors: 3 },
      ],
    });
  }, []);

  if (!info) return <div>로딩 중...</div>;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">병원 정보 관리</h1>
          <p className="text-gray-500 mt-1">
            병원의 기본 정보 및 운영 정보를 관리합니다
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Edit size={18} />
          편집
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========= 기본 정보 카드 ========= */}
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-lg">📘 기본 정보</span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">병원명</p>
              <p className="text-lg font-medium">{info.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">전화번호</p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone size={16} className="text-gray-500" />
                  {info.phone}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">이메일</p>
                <div className="flex items-center gap-2 mt-1">
                  <Mail size={16} className="text-gray-500" />
                  {info.email}
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm">주소</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} className="text-gray-500" />
                {info.address}
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm">병원 소개</p>
              <p className="mt-1">{info.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">설립년도</p>
                <p className="mt-1">{info.founded}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">병상 수</p>
                <p className="mt-1">{info.beds}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========= 운영 시간 카드 ========= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-blue-600" />
            <span className="font-semibold text-lg">운영 시간</span>
          </div>

          <div className="space-y-3">
            {Object.entries(info.hours).map(([day, time]) => (
              <div key={day} className="flex justify-between text-gray-700">
                <span>{day}</span>
                <span
                  className={
                    time === "휴무" ? "text-red-500 font-semibold" : ""
                  }
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========= 진료 과목 카드 ========= */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">🩺 진료 과목</span>
          <button className="text-blue-600 font-medium hover:underline">
            + 과목 추가
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.departments.map((d, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{d.name}</p>
                <span className="text-gray-500 text-sm">{d.doctors}명</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default hospitalinfo;
