// src/routes/routesConfig.js
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';

// Import các page
import CourseList from '@/pages/Course/CourseList';
import CourseSectionList from '@/pages/CourseSection/CourseSectionList';
import Schedule from '@/pages/Schedule/Schedule';
import ScoreList from '@/pages/Score/ScoreList';
import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup';
import PrivateRoute from '../components/PrivateRoute';
import adminRoutes from './adminRoutes';

import UserManagement from '@/pages/admin/UserManagement';
import TeacherManagement from '@/pages/admin/TeacherManagement';
import StudentManagement from '@/pages/admin/StudentManagement';
import CourseManagement from '@/pages/admin/CourseManagement';
import SectionManagement from '@/pages/admin/SectionManagement';
import ScheduleManagement from '@/pages/admin/ScheduleManagement';
import ScoreManagement from '@/pages/admin/ScoreManagement';
import { AuthProvider } from '@/providers/authContext';
const router = createBrowserRouter([
  { path: '/signin', element: <Signin /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/',
    element: (
      <AuthProvider>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      { path: 'dashboard', element: <div>this is dashboard</div> },
      { path: 'courses', element: <CourseList /> },
      { path: 'course-sections', element: <CourseSectionList /> },
      { path: 'schedules', element: <Schedule /> },
      { path: 'scores', element: <ScoreList /> },
      // { path: 'user-info', element: <UserList /> },

      {
        path: 'users-manage',
        element: <UserManagement />,
      },
      {
        path: 'teachers-manage',
        element: <TeacherManagement />,
      },
      {
        path: 'students-manage',
        element: <StudentManagement />,
      },
      {
        path: 'courses-manage',
        element: <CourseManagement />,
      },
      {
        path: 'sections-manage',
        element: <SectionManagement />,
      },
      {
        path: 'schedules-manage',
        element: <ScheduleManagement />,
      },
      {
        path: 'scores-manage',
        element: <ScoreManagement />,
      },
    ],
  },
  adminRoutes,
]);

export default router;
