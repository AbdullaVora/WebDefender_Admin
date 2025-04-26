import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import logo2 from '../../assets/logo2.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, loading, error } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    console.log("Login submitted:", formData);
  };

  // Show loader whenever Redux loading state is true
  // No need for a separate loader state
  
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <>
      <div className="flex h-screen w-[100%] bg-[#020B1C] items-center justify-center flex-col z-50 relative">
        {/* Loader Screen - directly using Redux loading state */}
        {loading && (
          <div className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-md z-20">
            <img src={logo2} alt="loader" width={300} className="me-7 z-30" />
            <span className="loader z-30"></span>
          </div>
        )}

        {/* Login Form */}
        <div className={`${loading ? 'z-10' : 'z-30'} min-h-screen flex items-center justify-center px-4`}>
          <div className="max-w-md w-full my-10 space-y-8">
            <div className="flex justify-center">
              <img src={logo} alt="" className="w-30" />
            </div>

            <div className={`bg-[#0A1A3B] rounded-xl p-8 shadow-2xl space-y-6 ${!loading ? 'backdrop-blur-3xl' : ''}`}>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-[380px] rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-4 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="block w-[380px] rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-4 py-3 pr-10 focus:ring-cyan-400 focus:border-cyan-400"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-600 bg-[#1A2C4E] text-cyan-400 focus:ring-cyan-400"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button" 
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="text-center">
                <a
                  href="/register"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Create new account <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;