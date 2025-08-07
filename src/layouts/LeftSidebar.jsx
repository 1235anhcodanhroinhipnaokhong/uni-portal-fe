// src/components/layout/LeftSidebar.jsx
import { useAuth } from '@/providers/authContext';
import { NavLink } from 'react-router-dom';

const navItemsAdmin = [
  { label: 'Quản lý khóa học', path: '/courses-manage' },
  { label: 'Quản lý chương học', path: '/sections-manage' },
  { label: 'Quản lý lịch học', path: '/schedules-manage' },
  { label: 'Quản lý bảng điểm', path: '/scores-manage' },
  { label: 'Quản lý sinh viên', path: '/students-manage' },
  { label: 'Quản lý giảng viên', path: '/teachers-manage' },
  { label: 'Quản lý người dùng', path: '/users-manage' },
];
const navItemsStudent = [
  { label: 'Xem chương trình đào tạo', path: '/courses' },
  { label: 'Đăng ký môn học', path: '/section-register' },
  { label: 'Xem thời khóa biểu', path: '/schedules' },
  { label: 'Xem điểm', path: '/scores' },
  { label: 'Xem thông tin', path: '/user-info' },
];
const navItemsTeacher = [
  { label: 'Xem chương trình đào tạo', path: '/courses' },
  { label: 'Xem thời khóa biểu', path: '/schedules' },
  { label: 'Xem điểm', path: '/scores' },
  { label: 'Xem thông tin', path: '/user-info' },
];
export default function LeftSidebar() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const navItems = isAdmin
    ? navItemsAdmin
    : isStudent
    ? navItemsStudent
    : navItemsTeacher;

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
