import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './login/Login'
import Signup from './Signup/Signup'
import Home from './Home/Home';
import Layout from './Layout/Layout';
import Iphone from './Iphone/Iphone';
import { useState } from 'react';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Otp from './ForgetPassword/Otp/Otp';
import ResetPassword from './ForgetPassword/ResetPassword/ResetPassword';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Layout isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/iphone" element={<Iphone />} />
            <Route path="/home" element={<Home />} />
            <Route path="/forgetpassword" element={<ForgetPassword/>} />
            <Route path="/Otp" element={<Otp/>} />
            <Route path="/ResetPassword" element={<ResetPassword/>} />



          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
