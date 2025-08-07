// pages/SchedulePage.jsx
import { useEffect, useState } from 'react';
import { getScheduleByUserRole } from '@/api/schedule.api';
import { useAuth } from '@/providers/authContext';

export default function SchedulePage() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await getScheduleByUserRole(user);
        setSchedules(res.data);
      } catch (err) {
        console.error('Failed to fetch schedules', err);
      }
    };

    fetchSchedules();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lịch học của bạn</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Môn học</th>
            <th className="border p-2">Ngày</th>
            <th className="border p-2">Thời gian</th>
            <th className="border p-2">Phòng</th>
            <th className="border p-2">Giảng viên</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.sectionId?.courseId?.name}</td>
              <td className="border p-2">{s.dayOfWeek}</td>
              <td className="border p-2">
                {s.startTime} - {s.endTime}
              </td>
              <td className="border p-2">{s.location}</td>
              <td className="border p-2">{s.sectionId?.teacherId?.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
