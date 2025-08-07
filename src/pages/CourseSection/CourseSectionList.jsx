// src/pages/CourseSection/CourseSectionList.jsx
import { useEffect, useState } from 'react';
import { getAllSections } from '@/api/courseSection.api';

export default function CourseSectionList() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getAllSections()
      .then((res) => setSections(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách chương học</h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section._id} className="border p-3 rounded">
            <p className="font-semibold">{section.name}</p>
            <p>ID Khóa học: {section.course}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
