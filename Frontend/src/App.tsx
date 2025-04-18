import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Layout from './Layout/Layout';
import Iphone from './Iphone/Iphone';
import { useState, useEffect, ReactNode } from 'react';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Otp from './ForgetPassword/Otp/Otp';
import ResetPassword from './ForgetPassword/ResetPassword/ResetPassword';
import { CartProvider } from './cartContext/CartContext';
import Cookies from 'js-cookie';
import ViewDetails from './Iphone/ViewDetails/ViewDetails';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import AdminDashboard from './AddminDashboard/AdminDashboard';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

interface DecodedToken {
  role: string;
  id: string;
  exp: number;
  iat: number;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for existing token on initial load
    const token = Cookies.get('token');
    if (token) {
      try {
        jwtDecode<DecodedToken>(token);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove('token');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = Cookies.get('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const AdminRoute = ({ children }: { children: ReactNode }) => {
    const token = Cookies.get('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken.role !== 'admin') {
        return <Navigate to="/login" replace />;
      }
      return children;
    } catch (error) {
      console.error('Error decoding token:', error);
      Cookies.remove('token');
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <CartProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Admin Routes */}
                <Route path="/AdminDashboard" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/Iphone" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/Android" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/Laptops" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/Acessories" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />

                {/* Protected Routes */}
                <Route
                  path="/iphone"
                  element={
                    <ProtectedRoute>
                      <Iphone />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/viewdetails/:id"
                  element={
                    <ProtectedRoute>
                      <ViewDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <PaymentMethod />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
              </Routes>
            </Layout>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
