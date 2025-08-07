import React, { useEffect, useState } from 'react';
import {
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
} from '@/api/courseSection.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SectionManagement() {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    semester: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await getAllSections();
      setSections(res.data); // ✅ sửa chỗ này
    } catch (err) {
      console.error('Failed to fetch sections:', err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSection(editingId, formData);
      } else {
        await createSection(formData);
      }
      setFormData({ name: '', courseId: '', semester: '' });
      setEditingId(null);
      fetchSections();
    } catch (err) {
      console.error('Failed to submit section:', err);
    }
  };

  const handleEdit = (section) => {
    setFormData({
      name: section.name,
      courseId: section.courseId,
      semester: section.semester,
    });
    setEditingId(section._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSection(id);
      fetchSections();
    } catch (err) {
      console.error('Failed to delete section:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quản lý Lớp học phần</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          placeholder="Tên lớp học phần"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Mã khóa học"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
        />
        <Input
          placeholder="Học kỳ"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
        />
        <Button type="submit">{editingId ? 'Cập nhật' : 'Tạo mới'}</Button>
      </form>

      <div className="space-y-2">
        {sections.map((s) => (
          <div
            key={s._id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{s.name}</p>
              <p>Mã khóa học: {s.courseId}</p>
              <p>Học kỳ: {s.semester}</p>
            </div>
            <div className="space-x-2">
              <Button onClick={() => handleEdit(s)}>Sửa</Button>
              <Button variant="destructive" onClick={() => handleDelete(s._id)}>
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
