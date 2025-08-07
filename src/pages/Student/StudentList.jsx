// src/pages/Student/StudentList.jsx
import { useEffect, useState } from 'react';
import { getAllStudents } from '@/api/student.api';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((res) => setStudents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách sinh viên</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student._id} className="border p-3 rounded">
            <p>Tên: {student.name}</p>
            <p>Email: {student.email}</p>
            <p>MSSV: {student.studentCode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
