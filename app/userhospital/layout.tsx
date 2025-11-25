import Sidebar from "@/components/hospital/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 왼쪽 사이드바 */}
      <div className="w-64 bg-[#1f2a44] text-white p-6">
        <Sidebar />
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
}
