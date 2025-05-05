import { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  EyeOff,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import apiInstance from "../api/instance";
import Swal from "sweetalert2";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiInstance.post('/api/auth/forgot-password', { email }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;

      if (response.status !== 200) {
        Swal.fire({
          title: 'Verify Email',
          text: data.detail,
          background: '#0b0f1a',
          color: '#00e0d0',
          icon: 'success',
          iconColor: '#00e0d0',
          timer: 2000, // auto close after 3 seconds
          timerProgressBar: true, // show progress bar
          showConfirmButton: false, // hide OK button
        })
        throw new Error(data.detail || "Failed to send OTP");
      } else {
        Swal.fire({
          title: 'Verify Eail',
          text: 'Otp Send to Email',
          background: '#0b0f1a',
          color: '#00e0d0',
          icon: 'success',
          iconColor: '#00e0d0',
          timer: 2000, // auto close after 3 seconds
          timerProgressBar: true, // show progress bar
          showConfirmButton: false, // hide OK button
        })
      }

      setStep(2);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiInstance.post('/api/auth/verify-otp', { email, otp: enteredOTP }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;

      if (response.status !== 200) {
        Swal.fire({
          title: 'Verify Otp',
          text: data.detail,
          background: '#0b0f1a',
          color: '#00e0d0',
          icon: 'success',
          iconColor: '#00e0d0',
          timer: 2000, // auto close after 3 seconds
          timerProgressBar: true, // show progress bar
          showConfirmButton: false, // hide OK button
        })
        throw new Error(data.detail || "Invalid OTP");
      } else {
        Swal.fire({
          title: 'Verify Otp',
          text: 'Otp is verified',
          background: '#0b0f1a',
          color: '#00e0d0',
          icon: 'success',
          iconColor: '#00e0d0',
          timer: 2000, // auto close after 3 seconds
          timerProgressBar: true, // show progress bar
          showConfirmButton: false, // hide OK button
        })
      }

      setStep(3);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const enteredOTP = otp.join("");

    setLoading(true);
    setError("");

    try {
      const response = await apiInstance.post('/api/auth/reset-password', {
        email,
        new_password: password,
        confirm_password: confirmPassword,
        otp: enteredOTP
      },
        {
          headers: { 'Content-Type': 'application/json', }
        });

      const data = response.data;

      if (response.status !== 200) {
        Swal.fire({
          title: 'Reser Password',
          text: data.detail,
          background: '#0b0f1a',
          color: '#00e0d0',
          icon: 'success',
          iconColor: '#00e0d0',
          timer: 2000, // auto close after 3 seconds
          timerProgressBar: true, // show progress bar
          showConfirmButton: false, // hide OK button
        })
        throw new Error(data.detail || "Failed to reset password");
      }

      setStep(4);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // OTP input handler
  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value !== "" && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // If backspace is pressed and current field is empty, go to previous field
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Focus on previous input
        document.getElementById(`otp-${index - 1}`).focus();
      } else if (otp[index] !== "") {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Navigate back to previous step
  const goBack = () => {
    setError("");
    setStep(step - 1);
  };

  return (
    <div className="flex items-center flex-col justify-center bg-[#020B1C] min-h-screen text-gray-300">
      <div className="flex justify-center" style={{ marginTop: '-5%' }}>
        <img src={logo} alt="" className="w-45" />
      </div>

      <div className="w-full mt-5 bg-[#0A1A3B] max-w-md p-8 rounded-xl border border-[#1E293B] relative group hover:shadow-lg transition-all duration-300">
        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-[#04D2D2] mb-6">
              Forgot Password
            </h2>
            <p className="text-gray-400 mb-8">
              Enter your email address to receive a verification code
            </p>

            <div className="relative mb-6">
              <Mail className="absolute left-3 top-4 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-[380px] rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-10 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {error && (
              <div className="flex items-center text-red-400 mb-4">
                <AlertTriangle size={16} className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className={`w-full bg-[#04D2D2] hover:bg-[#03b1b1] text-[#040C1F] font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Continue'} <ArrowRight size={18} className="ml-2" />
            </button>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <>
            <button
              onClick={goBack}
              className="text-gray-400 hover:text-[#04D2D2] mb-6 transition-colors duration-300"
            >
              ← Back to email
            </button>

            <h2 className="text-2xl font-semibold text-[#04D2D2] mb-6">
              Enter Verification Code
            </h2>
            <p className="text-gray-400 mb-8">
              We've sent a verification code to{" "}
              <span className="text-[#04D2D2]">{email}</span>
            </p>

            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="w-12 h-12 rounded text-center bg-[#1A2C4E] border border-gray-600 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center text-red-400 mb-4">
                <AlertTriangle size={16} className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className={`w-full bg-[#04D2D2] hover:bg-[#03b1b1] text-[#040C1F] font-medium py-3 px-4 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Verifying...' : 'Verify'} <ArrowRight size={18} className="ml-2" />
            </button>

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full bg-transparent border border-[#1E293B] hover:border-[#04D2D2] text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Resend Code
            </button>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <>
            <button
              onClick={goBack}
              className="text-gray-400 hover:text-[#04D2D2] mb-6 transition-colors duration-300"
            >
              ← Back to verification
            </button>

            <h2 className="text-2xl font-semibold text-[#04D2D2] mb-6">
              Create New Password
            </h2>
            <p className="text-gray-400 mb-8">
              Your password must be at least 8 characters long
            </p>

            <div className="relative mb-6">
              <Lock className="absolute left-3 top-4 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-[380px] rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-10 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="New password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="relative mb-6">
              <Lock className="absolute left-3 top-4 text-gray-400" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-[380px] rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-10 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="Confirm new password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center text-red-400 mb-4">
                <AlertTriangle size={16} className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`w-full bg-[#04D2D2] hover:bg-[#03b1b1] text-[#040C1F] font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Resetting...' : 'Reset Password'} <ArrowRight size={18} className="ml-2" />
            </button>
          </>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-[#04D2D2]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#04D2D2] mb-6">
              Password Reset Successfully
            </h2>
            <p className="text-gray-400 mb-8">
              Your password has been reset successfully. You can now login with
              your new password.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#04D2D2] hover:bg-[#03b1b1] text-[#040C1F] font-medium py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}