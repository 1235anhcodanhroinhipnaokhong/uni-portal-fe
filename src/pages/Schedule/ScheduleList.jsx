// src/pages/Schedule/ScheduleList.jsx
import { useEffect, useState } from 'react';
import { getAllSchedules } from '@/api/schedule.api';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getAllSchedules()
      .then((res) => setSchedules(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lịch học</h2>
      <ul className="space-y-2">
        {schedules.map((s) => (
          <li key={s._id} className="border p-3 rounded">
            <p>Lớp học: {s.section}</p>
            <p>Thời gian: {s.time}</p>
            <p>Địa điểm: {s.room}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
