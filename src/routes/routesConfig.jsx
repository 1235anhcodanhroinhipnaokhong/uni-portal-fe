// src/routes/routesConfig.js
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';

// Import các page
import CourseList from '@/pages/Course/CourseList';
import CourseSectionList from '@/pages/CourseSection/CourseSectionList';
import ScheduleList from '@/pages/Schedule/ScheduleList';
import ScoreList from '@/pages/Score/ScoreList';
import StudentList from '@/pages/Student/StudentList';
import TeacherList from '@/pages/Teacher/TeacherList';
import UserList from '@/pages/User/UserList';
import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup';
import PrivateRoute from '../components/PrivateRoute';
import adminRoutes from './adminRoutes';

const router = createBrowserRouter([
  { path: '/signin', element: <Signin /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'dashboard', element: <div>this is dashboard</div> },
      { path: 'courses', element: <CourseList /> },
      { path: 'course-sections', element: <CourseSectionList /> },
      { path: 'schedules', element: <ScheduleList /> },
      { path: 'scores', element: <ScoreList /> },
      { path: 'students', element: <StudentList /> },
      { path: 'teachers', element: <TeacherList /> },
      { path: 'users', element: <UserList /> },
    ],
  },
  adminRoutes,
]);

export default router;
