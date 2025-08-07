import { useEffect, useState } from 'react';
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/api/course.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [editingCourseId, setEditingCourseId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async () => {
    try {
      await createCourse(newCourse);
      setNewCourse({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateCourse(id, newCourse);
      setEditingCourseId(null);
      setNewCourse({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      console.error('Failed to update course:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Course Management</h2>

      <div className="mb-6">
        <Input
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
          className="mb-2"
        />
        <Input
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          className="mb-2"
        />
        {editingCourseId ? (
          <Button onClick={() => handleUpdate(editingCourseId)}>
            Update Course
          </Button>
        ) : (
          <Button onClick={handleCreate}>Add Course</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card key={course._id}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setNewCourse({
                      title: course.title,
                      description: course.description,
                    });
                    setEditingCourseId(course._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
