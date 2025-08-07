// src/components/layout/Topbar.jsx
export default function Topbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Hệ thống quản lý đào tạo</h1>
      <div className="flex items-center space-x-4">
        {/* Tạm placeholder, sau có thể thêm tên người dùng, logout, avatar */}
        <span className="text-gray-600">Xin chào, Admin</span>
      </div>
    </header>
  );
}
