import { useEffect, useState } from 'react';
import {
  getAllScores,
  createScore,
  updateScore,
  deleteScore,
} from '@/api/score.api';
import { getAllSections } from '@/api/courseSection.api';
import { getStudentsBySection } from '@/api/student.api';

export default function ScoreManagement() {
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);

  const [scores, setScores] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    sectionId: '',
    midterm: '',
    final: '',
    bonus: '',
    total: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSections = async () => {
    try {
      const res = await getAllSections();
      setSections(res.data);
    } catch (err) {
      console.error('Error fetching sections', err);
    }
  };

  const fetchScores = async () => {
    try {
      const res = await getAllScores();
      setScores(res.data);
    } catch (err) {
      console.error('Error fetching scores', err);
    }
  };
  useEffect(() => {
    fetchScores();
    fetchSections();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateScore(editingId, formData);
      } else {
        await createScore(formData);
      }
      setFormData({
        studentId: '',
        sectionId: '',
        midterm: '',
        final: '',
        bonus: '',
        total: '',
      });
      setEditingId(null);
      fetchScores();
    } catch (err) {
      console.error('Error saving score', err);
    }
  };

  const handleEdit = (score) => {
    setFormData({
      studentId: score.studentId?._id || '',
      sectionId: score.sectionId?._id || '',
      midterm: score.midterm,
      final: score.final,
      bonus: score.bonus,
      total: score.total,
    });
    setEditingId(score._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteScore(id);
      fetchScores();
    } catch (err) {
      console.error('Error deleting score', err);
    }
  };
  const handleSectionChange = async (e) => {
    const sectionId = e.target.value;
    setFormData((prev) => ({ ...prev, sectionId, studentId: '' }));

    try {
      const res = await getStudentsBySection(sectionId);
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Score Management</h2>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <select
          name="sectionId"
          value={formData.sectionId}
          onChange={handleSectionChange}
          className="border p-2"
        >
          <option value="">Chọn lớp học phần</option>
          {sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section.room} - {section.semester}
            </option>
          ))}
        </select>

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          className="border p-2"
          disabled={!formData.sectionId}
        >
          <option value="">Chọn sinh viên</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.fullName}
            </option>
          ))}
        </select>

        <input
          type="number"
          step="0.1"
          name="midterm"
          placeholder="Midterm Score"
          value={formData.midterm}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          step="0.1"
          name="final"
          placeholder="Final Score"
          value={formData.final}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          step="0.1"
          name="bonus"
          placeholder="Bonus"
          value={formData.bonus}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="number"
          step="0.1"
          name="total"
          placeholder="Total"
          value={formData.total}
          onChange={handleChange}
          className="border p-2"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded"
        >
          {editingId ? 'Update Score' : 'Add Score'}
        </button>
      </form>

      <table className="w-full border border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Student</th>
            <th className="border p-2">Section</th>
            <th className="border p-2">Midterm</th>
            <th className="border p-2">Final</th>
            <th className="border p-2">Bonus</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score._id}>
              <td className="border p-2">
                {score.studentId?.fullName || 'N/A'}
              </td>
              <td className="border p-2">
                {score.sectionId?.room || 'N/A'} - {score.sectionId?.semester}
              </td>
              <td className="border p-2">{score.midterm}</td>
              <td className="border p-2">{score.final}</td>
              <td className="border p-2">{score.bonus}</td>
              <td className="border p-2">{score.total}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(score)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(score._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
