// src/components/layout/LeftSidebar.jsx
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Khóa học', path: '/courses' },
  { label: 'Chương học', path: '/course-sections' },
  { label: 'Lịch học', path: '/schedules' },
  { label: 'Bảng điểm', path: '/scores' },
  { label: 'Sinh viên', path: '/students' },
  { label: 'Giảng viên', path: '/teachers' },
  { label: 'Người dùng', path: '/users' },
];

export default function LeftSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Quản lý đào tạo</h2>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
