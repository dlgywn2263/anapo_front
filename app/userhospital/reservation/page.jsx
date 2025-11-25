"use client";

import { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2, Plus } from "lucide-react";
import { reservations } from "@/data/hospital/reservations";
import StatusBadge from "@/components/hospital/StatusBadge";

const ReservationManagement = () => {
  return (
    <div className="p-6">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-2">예약 관리</h1>
      <p className="text-gray-500 mb-6">
        병원 예약을 관리하고 확인할 수 있습니다
      </p>

      {/* 카드 */}
      <div className="bg-white rounded-2xl border p-8 shadow-sm">
        {/* 상단 바 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">전체 예약 목록</h2>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            <Plus size={16} /> 새 예약 등록
          </button>
        </div>

        {/* 검색 + 필터 */}
        <div className="flex items-center gap-4 mb-6">
          {/* 검색 입력 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="환자명, 연락처로 검색"
              className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* 필터 */}
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-gray-600 text-sm">
            <Filter size={16} />
            전체
          </button>
        </div>

        {/* 테이블 */}
        <table className="w-full text-left text-gray-700">
          <thead>
            <tr className="text-gray-500 border-b text-sm">
              <th className="pb-3">예약번호</th>
              <th className="pb-3">환자명</th>
              <th className="pb-3">연락처</th>
              <th className="pb-3">담당의</th>
              <th className="pb-3">진료과</th>
              <th className="pb-3">예약일시</th>
              <th className="pb-3">상태</th>
              <th className="pb-3">관리</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {reservations.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition">
                <td className="py-4">{item.code}</td>
                <td className="font-medium">{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.doctor}</td>
                <td>{item.department}</td>
                <td>{item.datetime}</td>
                <td>{StatusBadge(item.status)}</td>

                {/* 아이콘 */}
                <td className="flex gap-3 mt-4 text-gray-500">
                  <Eye
                    size={18}
                    className="cursor-pointer hover:text-gray-700"
                  />
                  <Edit
                    size={18}
                    className="cursor-pointer hover:text-blue-600"
                  />
                  <Trash2
                    size={18}
                    className="cursor-pointer hover:text-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="px-4 py-2 rounded-lg border text-gray-600">
            이전
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            1
          </button>

          <button className="px-4 py-2 rounded-lg border text-gray-600">
            2
          </button>

          <button className="px-4 py-2 rounded-lg border text-gray-600">
            3
          </button>

          <button className="px-4 py-2 rounded-lg border text-gray-600">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;
