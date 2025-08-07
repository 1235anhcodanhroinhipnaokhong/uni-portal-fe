// src/layouts/DashboardLayout.jsx
import Topbar from '@/layouts/Topbar';
import LeftSidebar from '@/layouts/LeftSidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <LeftSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
