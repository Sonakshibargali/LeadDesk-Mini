import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, LogIn, Layers, AlertCircle, ArrowLeft } from 'lucide-react';
import { login } from '../services/api.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect straight to admin dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin', { replace: true });
    }

    // Display toast if redirected due to expired token
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('session_expired') === '1') {
      toast.error('Session expired. Please log in again.');
      // Clean query string
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      tempErrors.email = 'Please provide a valid email format';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await login({ email, password });
      if (res.success) {
        toast.success('Welcome back! Authentication approved.');
        navigate('/admin', { replace: true });
      }
    } catch (error) {
      console.error('Login API Error:', error);
      const errMsg = error.response?.data?.message || error.message || '';
      
      // If server database is offline, show connection error
      if (errMsg.includes('Prisma') || errMsg.includes('database') || errMsg.includes('reach') || !error.response) {
        toast.error('Database connection error: Cannot reach MySQL server at localhost:3306. Please ensure the database is running.');
      } else {
        toast.error(errMsg || 'Authentication failed. Please verify credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('token', 'demo-token-12345');
    localStorage.setItem('adminEmail', 'demo@leaddesk.co');
    toast.success('Accessing local demo workspace. Offline mode activated.');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Back to Home Link */}
      <Link to="/" className="absolute top-6 left-6 text-dark-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
        <ArrowLeft className="h-4.5 w-4.5" /> Back to Home
      </Link>

      <div className="w-full max-w-md">
        {/* Logo Head */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl blur opacity-75"></div>
            <div className="relative bg-dark-950 p-3 rounded-2xl border border-dark-700">
              <Layers className="h-7 w-7 text-brand-blue" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            LeadDesk<span className="text-gradient">Mini</span>
          </h1>
          <p className="text-xs text-dark-400 mt-1 uppercase font-semibold tracking-wider">Security Workspace</p>
        </div>

        {/* Login Panel */}
        <div className="glass-panel p-8 rounded-3xl border border-dark-800 bg-dark-900/40 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Administrator Login</h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-dark-400 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-dark-500" />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm transition-all ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="admin@leaddesk.co"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-dark-400 uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-dark-500" />
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm transition-all ${
                    errors.password ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white font-semibold transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-brand-blue/15 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying Identity...
                </>
              ) : (
                <>
                  Sign In
                  <LogIn className="h-4.5 w-4.5" />
                </>
              )}
            </button>

            {/* Demo Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute w-full border-t border-dark-800"></div>
              <span className="relative px-3 bg-dark-900 text-xs text-dark-500 font-semibold uppercase">Or Sandbox</span>
            </div>

            {/* Database Bypass Demo Mode */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-dark-200 hover:text-white border border-dark-700 hover:border-brand-purple/40 font-semibold transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
            >
              Access Demo Workspace (No DB Required)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
