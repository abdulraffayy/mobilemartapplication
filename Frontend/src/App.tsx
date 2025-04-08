// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './login/Login';
// import Signup from './Signup/Signup';
// import Home from './Home/Home';
// import Layout from './Layout/Layout';
// import Iphone from './Iphone/Iphone';
// import { useState, useEffect, ReactNode } from 'react';
// import ForgetPassword from './ForgetPassword/ForgetPassword';
// import Otp from './ForgetPassword/Otp/Otp';
// import ResetPassword from './ForgetPassword/ResetPassword/ResetPassword';
// import { CartProvider } from './cartContext/CartContext';
// import Cookies from 'js-cookie';
// import ViewDetails from './Iphone/ViewDetails/ViewDetails';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check for existing token on initial load
//     const token = Cookies.get('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove('token');
//     setIsLoggedIn(false);
//   };

//   const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//     if (!isLoggedIn) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       <CartProvider>
//         <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
//           <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
//             <Routes>
//               <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route
//                 path="/iphone"
//                 element={
//                   <ProtectedRoute>
//                     <Iphone />
//                   </ProtectedRoute>
//                 }
//               />

//                  <Route
//                 path="/viewdetials"
//                 element={
//                  <ViewDetails/>
//                 }
//               />
//               <Route
//                 path="/home"
//                 element={
//                   <ProtectedRoute>
//                     <Home />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="/forgetpassword" element={<ForgetPassword />} />
//               <Route path="/otp" element={<Otp />} />
//               <Route path="/resetpassword" element={<ResetPassword />} />
//             </Routes>
//           </Layout>
//         </div>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;













// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './login/Login';
// import Signup from './Signup/Signup';
// import Home from './Home/Home';
// import Layout from './Layout/Layout';
// import Iphone from './Iphone/Iphone';
// import { useState, useEffect, ReactNode } from 'react';
// import ForgetPassword from './ForgetPassword/ForgetPassword';
// import Otp from './ForgetPassword/Otp/Otp';
// import ResetPassword from './ForgetPassword/ResetPassword/ResetPassword';
// import { CartProvider } from './cartContext/CartContext';
// import Cookies from 'js-cookie';
// import ViewDetails from './Iphone/ViewDetails/ViewDetails';
// import PaymentMethod from './PaymentMethod/PaymentMethod';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check for existing token on initial load
//     const token = Cookies.get('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove('token');
//     setIsLoggedIn(false);
//   };

//   const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//     if (!isLoggedIn) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       <CartProvider>
//         <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
//           <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
//             <Routes>
//               <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route
//                 path="/iphone"
//                 element={
//                   <ProtectedRoute>
//                     <Iphone />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/viewdetails/:id"
//                 element={
//                   <ProtectedRoute>
//                     <ViewDetails />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/home"
//                 element={
//                   <ProtectedRoute>
//                     <Home />
//                   </ProtectedRoute>
//                 }
//               />

//                <Route
//                 path="/paymentMethod"
//                 element={
//                   <ProtectedRoute>
//                     <PaymentMethod/>
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="/forgetpassword" element={<ForgetPassword />} />
//               <Route path="/otp" element={<Otp />} />
//               <Route path="/resetpassword" element={<ResetPassword />} />
//             </Routes>
//           </Layout>
//         </div>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;

















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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for existing token on initial load
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup />} />
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
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/paymentMethod"
                element={
              
                    <PaymentMethod />
               
                }
              />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
          </Layout>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
