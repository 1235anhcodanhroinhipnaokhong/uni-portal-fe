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
import { useAuth } from '@/providers/authContext';

export default function UserManagementPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUsers();
      console.log(user);
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error('Loi fetch users', error);
    }
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
  if (!user) {
    return (
      <p className="text-center py-10">Đang tải thông tin người dùng...</p>
    );
  }
  return (
    <div className="p-8 space-y-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary">
        Quản lý người dùng
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-6 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tên người dùng</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editingUserId}
              placeholder={editingUserId ? 'Để trống nếu không đổi' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label>Vai trò</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
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
        </div>

        <div className="pt-4 text-end">
          <Button type="submit">
            {editingUserId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
          </Button>
        </div>
      </form>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 &&
          users.map((user) => (
            <Card key={user._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-4">
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Vai trò:</strong> {user.role}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
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
