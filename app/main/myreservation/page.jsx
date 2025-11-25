"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// ✅ 나중에 Spring 백엔드 연결할 때 이 구조에 맞춰서 데이터 받아오면 됨
// 예: GET /api/reservations/me → Spring에서 JWT의 userId로 내 예약만 조회
// 현재는 UI 확인용으로 mock 데이터만 사용
const mockReservations = [
  {
    id: 1,
    hospitalId: 101,
    hospitalName: "서울바른정형외과",
    department: "정형외과",
    doctorName: "김정훈",
    date: "2025-11-20",
    time: "14:30",
    status: "CONFIRMED", // CONFIRMED | CANCELED | COMPLETED
    address: "서울시 강남구 테헤란로 123",
    isUpcoming: true,
  },
  {
    id: 2,
    hospitalId: 102,
    hospitalName: "하늘빛내과의원",
    department: "내과",
    doctorName: "이수연",
    date: "2025-11-10",
    time: "10:00",
    status: "COMPLETED",
    address: "서울시 송파구 올림픽로 45",
    isUpcoming: false,
  },
  {
    id: 3,
    hospitalId: 103,
    hospitalName: "맑은눈안과",
    department: "안과",
    doctorName: "박지훈",
    date: "2025-11-05",
    time: "16:10",
    status: "CANCELED",
    address: "서울시 마포구 월드컵북로 21",
    isUpcoming: false,
  },
];

const STATUS_LABEL = {
  CONFIRMED: "예약 확정",
  CANCELED: "취소됨",
  COMPLETED: "진료 완료",
};

const STATUS_STYLE = {
  CONFIRMED: "bg-blue-50 text-blue-600 border border-blue-100",
  CANCELED: "bg-red-50 text-red-600 border border-red-100",
  COMPLETED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
};

export default function MyReservationPage() {
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming | past
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true); // 나중에 Spring 연동하면 그대로 재사용
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ 나중에 Spring 서버 API로 교체할 부분
    // 예시:
    // fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations/me`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setReservations(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError("예약 정보를 불러오는 중 오류가 발생했습니다.");
    //     setLoading(false);
    //   });

    // 지금은 UI 확인용 mock 데이터 사용
    setTimeout(() => {
      setReservations(mockReservations);
      setLoading(false);
    }, 400);
  }, []);

  const upcomingReservations = reservations.filter((r) => r.isUpcoming);
  const pastReservations = reservations.filter((r) => !r.isUpcoming);

  const listToShow =
    activeTab === "upcoming" ? upcomingReservations : pastReservations;

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* 상단 헤더 영역 */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 pt-8">
            나의 예약
          </h1>
          <p className="mt-2 text-gray-500">
            anapo로 예약한 병원 진료 내역을 한 눈에 확인해보세요.
          </p>
        </header>

        {/* 탭 버튼 */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "upcoming"
                ? "bg-[#3B8DFF] text-white shadow-sm"
                : "bg-white text-gray-600 border hover:bg-gray-50"
            }`}
          >
            다가오는 예약
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "past"
                ? "bg-[#3B8DFF] text-white shadow-sm"
                : "bg-white text-gray-600 border hover:bg-gray-50"
            }`}
          >
            지난 예약
          </button>
        </div>

        {/* 본문 카드 영역 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          {/* 로딩 상태 */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mb-3" />
              <p>예약 정보를 불러오는 중입니다...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {!loading && error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 text-red-700">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div>
                <p className="font-medium">오류가 발생했습니다</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* 목록 */}
          {!loading && !error && (
            <>
              {listToShow.length === 0 ? (
                <EmptyState activeTab={activeTab} />
              ) : (
                <ul className="space-y-4">
                  {listToShow.map((reservation) => (
                    <ReservationCard
                      key={reservation.id}
                      reservation={reservation}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 예약 카드 컴포넌트
 * 나중에 Spring에서 넘어오는 DTO와 필드명을 맞춰서 매핑만 바꿔주면 UI는 그대로 사용 가능
 */
function ReservationCard({ reservation }) {
  const {
    id,
    hospitalId,
    hospitalName,
    department,
    doctorName,
    date,
    time,
    status,
    address,
    isUpcoming,
  } = reservation;

  const statusLabel = STATUS_LABEL[status] ?? "알 수 없음";
  const statusStyle = STATUS_STYLE[status] ?? "bg-gray-100 text-gray-600";

  // 날짜 & 시간 포맷 (백엔드에서 ISO로 보내준다고 가정)
  const formattedDate = formatDate(date);
  const formattedTime = time; // 백엔드에서 "HH:mm" 문자열로 온다고 가정

  const handleCancel = () => {
    // ✅ 나중에 Spring 백엔드와 연결 (PATCH /reservations/{id}/cancel 같은 API 호출)
    // 지금은 테스트용
    // eslint-disable-next-line no-alert
    alert(`예약(ID: ${id}) 취소 요청 (나중에 API 연결)`);
  };

  return (
    <li className="rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-[#F7F9FF] p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* 왼쪽 정보 영역 */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs md:text-sm px-2 py-1 rounded-full bg-[#E5F0FF] text-[#3B8DFF] font-semibold">
            {department}
          </span>
          <span
            className={`text-xs md:text-sm px-2 py-1 rounded-full font-medium ${statusStyle}`}
          >
            {statusLabel}
          </span>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-1">
          {hospitalName}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          담당의&nbsp;
          <span className="font-medium text-gray-800">{doctorName} 전문의</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[220px] md:max-w-xs">
              {address}
            </span>
          </div>
        </div>
      </div>

      {/* 오른쪽 버튼 영역 */}
      <div className="flex flex-row md:flex-col items-end md:items-stretch gap-2 min-w-[160px]">
        {/* 병원 상세 페이지로 이동 */}
        {/* hospitalId로 병원 상세 라우팅 (예: /main/findhospital/[id]) */}
        <Link
          href={`/main/findhospital/${hospitalId}`}
          className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition"
        >
          병원 상세 보기
          <ChevronRight className="w-4 h-4" />
        </Link>

        {/* 예약 상세 or 변경 페이지로 이동 */}
        <Link
          href={`/main/myreservation/${id}`}
          className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-[#3B8DFF] text-white hover:bg-[#2f73d1] transition"
        >
          예약 상세
        </Link>

        {/* 다가오는 예약일 때만 취소 버튼 노출 */}
        {isUpcoming && status === "CONFIRMED" && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 transition"
          >
            예약 취소
          </button>
        )}
      </div>
    </li>
  );
}

// 빈 상태 컴포넌트
function EmptyState({ activeTab }) {
  const isUpcoming = activeTab === "upcoming";

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-[#E5F0FF] flex items-center justify-center mb-4">
        <Calendar className="w-7 h-7 text-[#3B8DFF]" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">
        {isUpcoming ? "다가오는 예약이 없습니다" : "지난 예약 내역이 없습니다"}
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        {isUpcoming
          ? "병원을 검색하고 진료 예약을 진행해보세요."
          : "아직 완료된 진료 기록이 없습니다."}
      </p>

      {isUpcoming && (
        <Link
          href="/main/findhospital"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#3B8DFF] text-white hover:bg-[#2f73d1] transition"
        >
          병원 찾으러 가기
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

// 날짜 포맷 도우미 (백엔드에서 "YYYY-MM-DD"로 보낸다고 가정)
function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}년 ${m}월 ${d}일`;
  } catch (e) {
    return dateString;
  }
}
