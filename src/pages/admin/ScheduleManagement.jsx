import React, { useEffect, useState } from 'react';
import {
  getAllSchedules,
  createSchedule,
  deleteSchedule,
} from '@/api/schedule.api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    courseSectionId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    room: '',
  });

  const fetchSchedules = async () => {
    try {
      const res = await getAllSchedules();
      setSchedules(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch schedules:', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
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
      await createSchedule(formData);
      fetchSchedules();
      setFormData({
        courseSectionId: '',
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        room: '',
      });
    } catch (err) {
      console.error('❌ Failed to create schedule:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      fetchSchedules();
    } catch (err) {
      console.error('❌ Failed to delete schedule:', err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Schedules</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow"
      >
        <div>
          <Label htmlFor="courseSectionId">Course Section ID</Label>
          <Input
            id="courseSectionId"
            name="courseSectionId"
            value={formData.courseSectionId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dayOfWeek">Day of Week</Label>
          <Input
            id="dayOfWeek"
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="room">Room</Label>
          <Input
            id="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-2">
          <Button type="submit">Create Schedule</Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedules.map((sch) => (
          <Card key={sch._id}>
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>Course Section:</strong> {sch.courseSectionId}
              </p>
              <p>
                <strong>Day:</strong> {sch.dayOfWeek}
              </p>
              <p>
                <strong>Start:</strong> {sch.startTime}
              </p>
              <p>
                <strong>End:</strong> {sch.endTime}
              </p>
              <p>
                <strong>Room:</strong> {sch.room}
              </p>
              <Button
                variant="destructive"
                onClick={() => handleDelete(sch._id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
