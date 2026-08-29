import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, Sparkles, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { loginApi } from '../services/api';
import { loginSchema, LoginFormData } from '../schemas/authSchema';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination (if user came from a protected route or default to '/')
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  // React Hook Form initialization with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setLoading(true);

    try {
      const response = await loginApi(data.email, data.password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setServerError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">

        {/* Left Side: Brand Highlights */}
        <div className="lg:col-span-5 text-left space-y-6 hidden lg:block pr-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to AuraMart</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-tight">
            Discover Exceptional <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Shopping</span> Experience.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            Log in to access your orders, track shipments, manage your wishlist, and enjoy personalized deals crafted just for you.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>100% Secure & Encrypted Authentication</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span>Saved Cart & Wishlist Synchronization</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <span>Instant Order Status & Live Tracking</span>
            </div>
          </div>
        </div>

        {/* Right Side: Dedicated Login Form Card */}
        <div className="lg:col-span-7">
          <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">

            {/* Top Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Sign In</h2>
              <p className="text-slate-400 text-xs mt-1.5">
                Enter your credentials below to access your account.
              </p>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-3 text-rose-400 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block">Authentication Error</span>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            {/* Login Form using React Hook Form & Zod */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className={`w-full bg-slate-950/90 border rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${errors.email
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/50'
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <a href="#forgot" className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="••••••••"
                    className={`w-full bg-slate-950/90 border rounded-xl pl-11 pr-11 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${errors.password
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/50'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password.message}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500/20"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
