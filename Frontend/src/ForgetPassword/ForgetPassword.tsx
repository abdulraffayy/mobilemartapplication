import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import imagebackground from '../assets/rafayraja.avif'
import axios, { AxiosError } from 'axios'

interface ApiError {
  message: string
  response?: {
    data?: {
      message: string
    }
  }
}

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post('http://localhost:5000/api/password-reset/send-otp', { email })
      if (response.data.message === 'OTP sent successfully') {
        navigate('/Otp', { state: { email } })
      }
    } catch (error) {
      const apiError = error as AxiosError<ApiError>
      setError(apiError.response?.data?.message || 'Error sending OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imagebackground})` }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 mb-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white rounded-lg p-4 w-full hover:bg-blue-700 transition duration-200 shadow-md flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : 'Send Email'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Remember your password? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgetPassword