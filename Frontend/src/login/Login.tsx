import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import imagebackground from '@/assets/rafayraja.avif'

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (Cookies.get('token')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    const apiUrl = 'http://localhost:5000/auth/login';

    try {
      const response = await axios.post(apiUrl, { email, password });

      if (response.status === 200) {
        if (response.data.token) {
          Cookies.set('token', response.data.token, { expires: 1 });
          setSuccessMessage('Login successful!');
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          console.error('Token is undefined');
          setError('Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
      setError('Invalid email or password. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgetpassword");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imagebackground})` }}
    >
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="cursor-pointer text-blue-600 hover:underline" onClick={handleForgotPassword}>
              Forgot Password?
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;