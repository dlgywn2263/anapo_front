"use client";
import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Search, UserPlus } from "lucide-react";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  /* 
    백엔드와 연동될 부분
    여기서 Spring Boot API로 환자 데이터를 가져오면 됨.

    useEffect(() => {
      fetch("/api/patients")
        .then(res => res.json())
        .then(data => setPatients(data));
    }, []);
  */

  // 금은 임시 Mock 데이터 (백엔드 연동 전)
  useEffect(() => {
    setPatients([
      {
        id: "P001",
        name: "김민수",
        gender: "남",
        age: 35,
        phone: "010-1234-5678",
        email: "minsu@email.com",
        regDate: "2024-03-15",
      },
      {
        id: "P002",
        name: "박지은",
        gender: "여",
        age: 28,
        phone: "010-2345-6789",
        email: "jieun@email.com",
        regDate: "2024-05-20",
      },
      {
        id: "P003",
        name: "이준호",
        gender: "남",
        age: 42,
        phone: "010-3456-7890",
        email: "junho@email.com",
        regDate: "2024-07-10",
      },
      {
        id: "P004",
        name: "정수연",
        gender: "여",
        age: 31,
        phone: "010-4567-8901",
        email: "suyeon@email.com",
        regDate: "2024-09-05",
      },
      {
        id: "P005",
        name: "최동욱",
        gender: "남",
        age: 55,
        phone: "010-5678-9012",
        email: "dongwook@email.com",
        regDate: "2023-11-22",
      },
      {
        id: "P006",
        name: "강서윤",
        gender: "여",
        age: 26,
        phone: "010-6789-0123",
        email: "seoyun@email.com",
        regDate: "2025-01-03",
      },
    ]);
  }, []);

  const filtered = patients.filter((p) =>
    `${p.name} ${p.phone} ${p.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">환자 관리</h1>
      <p className="text-gray-500 mb-8">
        등록된 환자 정보를 관리할 수 있습니다
      </p>

      <div className="bg-white p-6 rounded-xl shadow">
        {/* 헤더 */}
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">전체 환자 목록</h2>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <UserPlus size={18} />새 환자 등록
          </button>
        </div>

        {/* 검색창 */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="환자명, 연락처, 이메일로 검색"
            className="w-full border rounded-lg pl-10 p-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* 테이블 */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">환자번호</th>
              <th className="p-3">이름</th>
              <th className="p-3">성별/나이</th>
              <th className="p-3">연락처</th>
              <th className="p-3">이메일</th>
              <th className="p-3">등록일</th>
              <th className="p-3">관리</th>
            </tr>
          </thead>

          <tbody>
            {current.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">
                  {p.gender} / {p.age}세
                </td>
                <td className="p-3">{p.phone}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.regDate}</td>

                <td className="p-3 flex gap-3 justify-center">
                  <Eye
                    className="text-gray-600 hover:text-black cursor-pointer"
                    size={18}
                  />
                  <Pencil
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    size={18}
                  />

                  {/* 실제 삭제 기능 연결 예정 (백엔드 연동 필요) */}
                  <Trash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={18}
                    onClick={() => console.log(`삭제: ${p.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이징 */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 border rounded-lg"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-lg ${
                page === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded-lg"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            다음
          </button>
        </div>
      </div>
    </section>
  );
};

export default Patient;
