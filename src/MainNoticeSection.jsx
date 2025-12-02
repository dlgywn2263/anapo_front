"use client";

import { Bell, CalendarDays, Star, TrendingUp, Users } from "lucide-react";
import { notices } from "@/data/patient/notices";
import { ranking } from "@/data/patient/ranking";

export default function MainNoticeSection() {
  // ----------------------------
  // 📌 1. 나중에 Spring / Node API 연동할 부분
  // ----------------------------
  // useEffect(() => {
  //   fetch("/api/notices")  // ← 백엔드에서 공지사항 가져오기
  //     .then(res => res.json())
  //     .then(data => setNotices(data));
  // }, []);

  const badgeColor = {
    중요: "bg-red-100 text-red-600",
    안내: "bg-blue-100 text-blue-600",
    이벤트: "bg-green-100 text-green-600",
  };

  return (
    <section className=" h-min-screen w-full bg-gray-50 flex justify-center pt-18 ">
      <div className="w-full max-w-8xl flex gap-8 p-16">
        {/* ---------------------- */}
        {/* 📌 왼쪽 - 공지사항 */}
        {/* ---------------------- */}
        <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm">
          {/* 제목 */}
          <div className="flex flex-col items-center mb-6">
            <Bell size={32} className="text-blue-500 mb-2" />
            <h2 className="text-2xl font-bold">병원 공지사항</h2>
            <p className="text-gray-500 mt-1">
              주요 병원의 최신 공지사항과 이벤트를 확인하세요
            </p>
          </div>

          {/* 테이블 */}
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="py-3">번호</th>
                <th className="py-3">병원</th>
                <th className="py-3">구분</th>
                <th className="py-3 pr-15">제목</th>
                <th className="py-3">작성일</th>
                <th className="py-3">조회</th>
              </tr>
            </thead>

            <tbody>
              {notices.map((n) => (
                <tr key={n.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="py-3">{n.id}</td>

                  <td className="py-3 text-blue-600 font-medium">
                    {n.hospital}
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        badgeColor[n.type]
                      }`}
                    >
                      {n.type}
                    </span>
                  </td>

                  <td className="py-3 flex items-center justify-center gap-2">
                    {n.title}
                    {n.tag && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {n.tag}
                      </span>
                    )}
                  </td>

                  {/*  ✅ 수정된 부분 — 작성일(td) 정렬 문제 해결 */}
                  <td className="py-3 text-center">
                    <div className="inline-flex items-center gap-1 justify-center">
                      <CalendarDays size={16} className="text-gray-500" />
                      {n.date}
                    </div>
                  </td>

                  <td className="py-3">{n.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-3 mt-6">
            <button className="px-3 py-1 border rounded-md bg-white">
              이전
            </button>
            <button className="px-3 py-1 border rounded-md bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md bg-white">2</button>
            <button className="px-3 py-1 border rounded-md bg-white">3</button>
            <button className="px-3 py-1 border rounded-md bg-white">
              다음
            </button>
          </div>
        </div>

        {/* ---------------------- */}
        {/* 📌 오른쪽 - 인기 병원 랭킹 */}
        {/* ---------------------- */}
        <div className="w-[380px] bg-white rounded-3xl shadow-md p-7 border border-gray-100">
          {/* 제목 */}
          <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-lg">
              <TrendingUp size={22} />
            </div>

            <div className="ml-3">
              <h2 className="text-lg font-bold">인기 병원 랭킹</h2>
              <p className="text-sm text-gray-500">이번 주 예약 순위</p>
            </div>
          </div>

          {/* 리스트 */}
          <div className="flex flex-col gap-4">
            {ranking.map((h) => (
              <div
                key={h.rank}
                className="w-full bg-gray-50 p-5 rounded-2xl border border-gray-100 flex justify-between items-center hover:bg-gray-100 transition"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-semibold ${h.color}`}
                  >
                    {h.rank}
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">{h.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{h.type}</p>

                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                      <Star size={15} className="text-yellow-500" />
                      {h.rating}
                      <Users size={15} className="text-gray-400 ml-2" />
                      {h.reviews}
                    </div>

                    <p className="text-xs text-gray-500 mt-1">이번 주 예약</p>
                  </div>
                </div>

                <div className="text-blue-500 font-medium text-sm">
                  {h.weekly}
                </div>
              </div>
            ))}
          </div>

          {/* 버튼 */}
          <button className="w-full mt-7 border rounded-xl py-3 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
            전체 랭킹 보기 <span className="text-lg">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
