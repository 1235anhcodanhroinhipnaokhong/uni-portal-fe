// src/pages/Teacher/TeacherList.jsx
import { useEffect, useState } from 'react';
import { getAllTeachers } from '@/api/teacher.api';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllTeachers()
      .then((res) => setTeachers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách giảng viên</h2>
      <ul className="space-y-2">
        {teachers.map((teacher) => (
          <li key={teacher._id} className="border p-3 rounded">
            <p>Tên: {teacher.fullName}</p>
            <p>{teacher.department}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
