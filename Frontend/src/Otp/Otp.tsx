import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'

interface ApiError {
  message: string
  response?: {
    data?: {
      message: string
    }
  }
}

const Otp = () => {
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  useEffect(() => {
    if (!email) {
      navigate('/reset-password')
      return
    }
  }, [email, navigate])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      // First verify OTP
      const verifyResponse = await axios.post('http://localhost:5000/api/password-reset/verify-otp', {
        email,
        otp
      })

      if (verifyResponse.data.message === 'OTP verified successfully') {
        // Then reset password
        const resetResponse = await axios.post('http://localhost:5000/api/password-reset/reset-password', {
          email,
          otp,
          newPassword
        })

        if (resetResponse.data.message === 'Password reset successfully') {
          navigate('/login')
        }
      }
    } catch (error) {
      const apiError = error as AxiosError<ApiError>
      setError(apiError.response?.data?.message || 'Error processing request')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    setError('')
    
    try {
      await axios.post('http://localhost:5000/api/password-reset/send-otp', { email })
      setTimer(60)
      setCanResend(false)
    } catch (error) {
      const apiError = error as AxiosError<ApiError>
      setError(apiError.response?.data?.message || 'Error resending OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg p-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            <div className="mt-2 text-sm text-center">
              {!canResend ? (
                <p className="text-gray-600">Resend OTP in {timer} seconds</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-blue-600 hover:underline"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
          
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Processing...
              </>
            ) : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Otp 