// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import router from './routes/routesConfig';
import { AuthProvider } from './providers/authContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
