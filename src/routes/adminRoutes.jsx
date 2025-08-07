// src/routes/routesConfig.js

import UserManagement from '@/pages/admin/UserManagement';
import TeacherManagement from '@/pages/admin/TeacherManagement';
import StudentManagement from '@/pages/admin/StudentManagement';
import CourseManagement from '@/pages/admin/CourseManagement';
import SectionManagement from '@/pages/admin/SectionManagement';
import ScheduleManagement from '@/pages/admin/ScheduleManagement';
import ScoreManagement from '@/pages/admin/ScoreManagement';

const adminRoutes = {
  path: '/admin',
  children: [
    {
      path: 'users',
      element: <UserManagement />,
    },
    {
      path: 'teachers',
      element: <TeacherManagement />,
    },
    {
      path: 'students',
      element: <StudentManagement />,
    },
    {
      path: 'courses',
      element: <CourseManagement />,
    },
    {
      path: 'sections',
      element: <SectionManagement />,
    },
    {
      path: 'schedules',
      element: <ScheduleManagement />,
    },
    {
      path: 'scores',
      element: <ScoreManagement />,
    },
  ],
};

export default adminRoutes;
