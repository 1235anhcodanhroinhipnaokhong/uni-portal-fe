// src/pages/Course/CourseList.jsx
import { useEffect, useState } from 'react';
import { getAllCourses } from '@/api/course.api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses()
      .then((res) => setCourses(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách khóa học</h1>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course._id} className="p-4 border rounded shadow">
            <p className="font-semibold">{course.name}</p>
            <p>Mã khóa học: {course.code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
