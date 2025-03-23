import { Link } from "react-router-dom"




const ForgetPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h1>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="border border-gray-300 rounded-lg p-4 mb-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link 
  to="/Otp"
  className="bg-blue-600 text-white rounded-lg p-4 w-full hover:bg-blue-700 transition duration-200 shadow-md flex justify-center"
>
  Send Link
</Link>
        <p className="mt-4 text-center text-gray-600">
            Do you have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>

          

      </div>



    </div>
  )
}

export default ForgetPassword