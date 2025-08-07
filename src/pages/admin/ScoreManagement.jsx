import { useEffect, useState } from 'react';
import {
  getAllScores,
  createScore,
  updateScore,
  deleteScore,
} from '@/api/score.api';

export default function ScoreManagement() {
  const [scores, setScores] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    courseSectionId: '',
    value: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const res = await getAllScores();
      setScores(res.data);
    } catch (err) {
      console.error('Error fetching scores', err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
      setFormData({ studentId: '', courseSectionId: '', value: '' });
      setEditingId(null);
      fetchScores();
    } catch (err) {
      console.error('Error saving score', err);
    }
  };

  const handleEdit = (score) => {
    setFormData({
      studentId: score.studentId,
      courseSectionId: score.courseSectionId,
      value: score.value,
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Score Management</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="courseSectionId"
          placeholder="Course Section ID"
          value={formData.courseSectionId}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="value"
          placeholder="Score"
          value={formData.value}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update' : 'Add'} Score
        </button>
      </form>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Student ID</th>
            <th className="border p-2">Course Section ID</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score._id}>
              <td className="border p-2">{score.studentId}</td>
              <td className="border p-2">{score.courseSectionId}</td>
              <td className="border p-2">{score.value}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(score)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(score._id)}
                  className="text-red-600"
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
