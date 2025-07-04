// // src/components/ProtectedRoute.jsx
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
