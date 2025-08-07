// src/pages/Score/ScoreList.jsx
import { useEffect, useState } from 'react';
import { getAllScores } from '@/api/score.api';

export default function ScoreList() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getAllScores()
      .then((res) => setScores(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bảng điểm</h2>
      <ul className="space-y-2">
        {scores.map((score) => (
          <li key={score._id} className="border p-3 rounded">
            <p>Sinh viên: {score.student}</p>
            <p>Điểm: {score.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
