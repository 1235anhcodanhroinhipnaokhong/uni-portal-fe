import React, { useEffect, useState } from 'react';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@/api/user.api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUserId) {
      await updateUser(editingUserId, formData);
    } else {
      await createUser(formData);
    }
    setFormData({ username: '', email: '', password: '', role: 'student' });
    setEditingUserId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
    });
    setEditingUserId(user._id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Quản lý người dùng</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label>Tên người dùng</Label>
          <Input
            type="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label>Mật khẩu</Label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required={!editingUserId}
            placeholder={editingUserId ? 'Để trống nếu không đổi' : ''}
          />
        </div>
        <div>
          <Label>Vai trò</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vai trò</SelectLabel>
                <SelectItem value="student">Sinh viên</SelectItem>
                <SelectItem value="teacher">Giảng viên</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">
          {editingUserId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length > 0 &&
          users.map((user) => (
            <Card key={user._id}>
              <CardContent className="space-y-2">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Vai trò:</strong> {user.role}
                </p>
                <div className="space-x-2">
                  <Button size="sm" onClick={() => handleEdit(user)}>
                    Sửa
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Xoá
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
