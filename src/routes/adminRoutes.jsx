// src/routes/routesConfig.js

import UserManagement from '@/pages/admin/UserManagement';
import TeacherManagement from '@/pages/admin/TeacherManagement';
import StudentManagement from '@/pages/admin/StudentManagement';
import CourseManagement from '@/pages/admin/CourseManagement';
import SectionManagement from '@/pages/admin/SectionManagement';
import ScheduleManagement from '@/pages/admin/ScheduleManagement';
import ScoreManagement from '@/pages/admin/ScoreManagement';

const adminRoutes = {
  path: '/',
  children: [
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
};

export default adminRoutes;
