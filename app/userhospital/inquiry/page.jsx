"use client";
import { useState, useEffect } from "react";
import { MessageSquare, Clock, CheckCircle, Send } from "lucide-react";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");

  /*
    📌 Spring 백엔드 연동 예정 구간
    useEffect(() => {
      fetch("/api/inquiries")
        .then(res => res.json())
        .then(data => setInquiries(data));
    }, []);

    // 답변 POST / 상태 업데이트 PUT 도 여기서 처리
  */

  // 임시 Mock Data
  useEffect(() => {
    setInquiries([
      {
        id: 1,
        title: "진료 예약 변경 문의",
        status: "대기중",
        patientName: "김민수",
        patientId: "P001",
        date: "2024-01-20 14:30",
        content: "다음주 화요일로 예정된 예약을 수요일로 변경할 수 있을까요?",
        reply: null,
      },
      {
        id: 2,
        title: "검사 결과 문의",
        status: "답변완료",
        patientName: "이영희",
        patientId: "P002",
        date: "2024-01-19 10:15",
        content: "지난주에 받은 혈액 검사 결과를 확인하고 싶습니다.",
        reply: {
          date: "2024-01-19 15:20",
          content:
            "검사 결과는 정상 범위입니다. 자세한 내용은 다음 진료 시 설명드리겠습니다.",
        },
      },
    ]);
  }, []);

  // 검색 + 필터링
  const filteredList = inquiries.filter((q) => {
    const matchesSearch = `${q.title} ${q.content} ${q.patientName}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "전체" ? true : q.status === filter;

    return matchesSearch && matchesFilter;
  });

  // 통계값
  const total = inquiries.length;
  const waiting = inquiries.filter((q) => q.status === "대기중").length;
  const completed = inquiries.filter((q) => q.status === "답변완료").length;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">환자 문의 관리</h1>
      <p className="text-gray-500 mb-8">
        환자들의 문의사항을 확인하고 답변할 수 있습니다
      </p>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* 전체 문의 */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">전체 문의</p>
            <p className="text-3xl font-semibold">{total}</p>
          </div>
          <MessageSquare size={32} className="text-blue-500" />
        </div>

        {/* 답변 대기 */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">답변 대기</p>
            <p className="text-3xl font-semibold text-orange-500">{waiting}</p>
          </div>
          <Clock size={32} className="text-orange-500" />
        </div>

        {/* 답변 완료 */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">답변 완료</p>
            <p className="text-3xl font-semibold text-green-600">{completed}</p>
          </div>
          <CheckCircle size={32} className="text-green-600" />
        </div>
      </div>

      {/* 검색 & 필터 */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-center mb-6">
        <input
          type="text"
          placeholder="환자명, 제목, 내용으로 검색"
          className="flex-1 border rounded-lg p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setFilter("전체")}
          className={`px-4 py-2 rounded-lg border ${
            filter === "전체" ? "bg-blue-600 text-white" : ""
          }`}
        >
          전체
        </button>

        <button
          onClick={() => setFilter("대기중")}
          className={`px-4 py-2 rounded-lg border ${
            filter === "대기중" ? "bg-blue-600 text-white" : ""
          }`}
        >
          대기중
        </button>

        <button
          onClick={() => setFilter("답변완료")}
          className={`px-4 py-2 rounded-lg border ${
            filter === "답변완료" ? "bg-blue-600 text-white" : ""
          }`}
        >
          답변완료
        </button>
      </div>

      {/* 문의 리스트 */}
      <div className="space-y-6">
        {filteredList.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-xl shadow">
            {/* 제목 + 상태 */}
            <div className="flex items-center gap-3 mb-2">
              <p className="text-lg font-semibold">{q.title}</p>

              {/* 상태 배지 */}
              {q.status === "대기중" ? (
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                  대기중
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  답변완료
                </span>
              )}
            </div>

            {/* 환자 정보 */}
            <div className="flex gap-3 text-gray-500 text-sm mb-3">
              <span>{q.patientName}</span>
              <span>({q.patientId})</span>
              <span>·</span>
              <span>{q.date}</span>
            </div>

            {/* 문의 내용 */}
            <p className="mb-4">{q.content}</p>

            {/* 답변 미작성 상태 */}
            {q.reply === null ? (
              <button className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                <Send size={16} />
                답변 작성
              </button>
            ) : (
              // 답변 완료 상태
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700 font-medium mb-1">
                  답변 · {q.reply.date}
                </p>
                <p className="text-gray-700">{q.reply.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inquiry;
