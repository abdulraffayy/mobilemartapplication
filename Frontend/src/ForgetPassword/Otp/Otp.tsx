import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import imagebackground from '@/assets/rafayraja.avif';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Otp: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  const correctOTP = "123456"; 

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const handleVerifyOTP = () => {
    if (otp === correctOTP) {
      navigate("/ResetPassword");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={imagebackground} 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"></div>
      </div>

      <div className="relative flex w-full justify-center items-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md space-y-8 p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <CardHeader>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
              <p className="mt-2 text-sm text-gray-600">Please enter the 6-digit code sent to your email</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP 
                  maxLength={6} 
                  className="gap-2"
                  value={otp}
                  onChange={handleChange}
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(3)].map((_, index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index} 
                        className="w-12 h-14 text-lg font-semibold border-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                      />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2 text-gray-400">-</InputOTPSeparator>
                  <InputOTPGroup className="gap-2">
                    {[...Array(3)].map((_, index) => (
                      <InputOTPSlot 
                        key={index + 3} 
                        index={index + 3} 
                        className="w-12 h-14 text-lg font-semibold border-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="space-y-4">
                <Button 
                  className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Didn't receive code? 
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Resend OTP
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Otp;