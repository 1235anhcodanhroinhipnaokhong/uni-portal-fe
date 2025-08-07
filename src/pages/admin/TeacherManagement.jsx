import React, { useEffect, useState } from 'react';
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '@/api/teacher.api';
import { Button } from '@/components/ui/button';

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', department: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchTeachers = async () => {
    try {
      const { data } = await getAllTeachers();
      setTeachers(data);
      console.log(data);
    } catch (error) {
      console.error('Lỗi khi load teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTeacher(editingId, form);
      } else {
        await createTeacher(form);
      }
      setForm({ name: '', email: '', department: '' });
      setEditingId(null);
      fetchTeachers();
    } catch (error) {
      console.error('Lỗi khi submit:', error);
    }
  };

  const handleEdit = (teacher) => {
    setForm({
      name: teacher.name,
      email: teacher.email,
      department: teacher.department,
    });
    setEditingId(teacher._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý giảng viên</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Khoa"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <Button type="submit">{editingId ? 'Cập nhật' : 'Tạo mới'}</Button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Khoa</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 &&
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="border p-2">{teacher.name}</td>
                <td className="border p-2">{teacher.email}</td>
                <td className="border p-2">{teacher.department}</td>
                <td className="border p-2 space-x-2">
                  <Button onClick={() => handleEdit(teacher)}>Sửa</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(teacher._id)}
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
