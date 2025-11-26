"use client";
import { useState, useEffect } from "react";
import { Search, Pin, Edit, Trash2, Plus } from "lucide-react";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  /*
    📌 Spring 백엔드 연동 예정 구간
    useEffect(() => {
      fetch("/api/notices")
        .then(res => res.json())
        .then(data => setNotices(data));
    }, []);

    // POST / PUT / DELETE API도 여기에서 연결 가능
  */

  // 현재는 Mock 데이터
  useEffect(() => {
    setNotices([
      {
        id: 1,
        title: "2024년 설 연휴 진료 안내",
        content:
          "설 연휴 기간 동안 응급실은 정상 운영되며, 외래는 2월 10일부터 정상 진료합니다.",
        writer: "관리자",
        date: "2024-01-20",
        status: "게시중",
        pinned: true,
      },
      {
        id: 2,
        title: "건강검진센터 리모델링 완료",
        content:
          "보다 쾌적한 환경에서 건강검진을 받을 수 있도록 시설을 개선하였습니다.",
        writer: "관리자",
        date: "2024-01-18",
        status: "게시중",
        pinned: false,
      },
      {
        id: 3,
        title: "신규 의료진 채용 안내",
        content: "정형외과 전문의 2명이 새롭게 합류하였습니다.",
        writer: "관리자",
        date: "2024-01-15",
        status: "게시중",
        pinned: false,
      },
      {
        id: 4,
        title: "주차장 이용 안내 (임시)",
        content: "주차장 공사로 인해 임시 주차장을 이용해주시기 바랍니다.",
        writer: "관리자",
        date: "2024-01-10",
        status: "임시저장",
        pinned: false,
      },
    ]);
  }, []);

  // 검색 필터
  const filteredNotices = notices.filter((n) =>
    `${n.title} ${n.content}`.toLowerCase().includes(search.toLowerCase())
  );

  // 상태 배지 스타일
  const statusBadge = (status) => {
    if (status === "게시중")
      return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm";
    return "bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm";
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* 상단 제목 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">공지사항 관리</h1>
          <p className="text-gray-500 mt-1">
            병원 공지사항을 작성하고 관리합니다
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18} /> 새 공지사항
        </button>
      </div>

      {/* 검색창 */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="제목 또는 내용으로 검색"
            className="w-full border rounded-lg pl-10 p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 공지 리스트 */}
      <div className="space-y-4">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-start"
          >
            {/* 왼쪽 내용 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                {/* 고정 아이콘 */}
                {n.pinned && (
                  <Pin size={20} className="text-blue-500" fill="#3b82f6" />
                )}

                <h2 className="text-lg font-semibold">{n.title}</h2>
              </div>

              <p className="text-gray-700 mb-2">{n.content}</p>

              <div className="flex gap-3 text-gray-500 text-sm mt-2">
                <span>{n.writer}</span>
                <span>·</span>
                <span>{n.date}</span>
              </div>
            </div>

            {/* 오른쪽 아이콘 그룹 */}
            <div className="flex items-center gap-3">
              {/* 상태 배지 */}
              <span className={statusBadge(n.status)}>{n.status}</span>

              {/* 고정 아이콘 */}
              <Pin
                size={18}
                className="text-gray-600 hover:text-black cursor-pointer"
              />

              {/* 수정 */}
              <Edit
                size={18}
                className="text-gray-600 hover:text-black cursor-pointer"
              />

              {/* 삭제 */}
              <Trash2
                size={18}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />

              {/*
                📌 삭제 기능: Spring 연결
                fetch(`/api/notices/${n.id}`, { method: "DELETE" })
                  .then(() => setNotices(prev => prev.filter(item => item.id !== n.id)));
              */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
