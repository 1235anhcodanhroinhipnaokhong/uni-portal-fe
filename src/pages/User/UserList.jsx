// src/pages/User/UserList.jsx
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/user.api';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="border p-3 rounded">
            <p>Tên: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Vai trò: {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
