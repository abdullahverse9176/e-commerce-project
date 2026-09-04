import React from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignUp = () => {
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
            <span>Join AuraMart Today</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-tight">
            Start Your Premium{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Shopping
            </span>{" "}
            Journey.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            Create an account to track shipments, get member-only exclusive discounts, and synchronize your wishlist across devices.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>100% Secure & Encrypted Registration</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span>Instant Welcome Rewards on Sign Up</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <span>Fast Track Checkout & Address Book</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form Card */}
        <div className="lg:col-span-7">
          <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
              <p className="text-slate-400 text-xs mt-1.5">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 text-xs py-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500/20"
                />
                <label htmlFor="terms" className="text-slate-400 cursor-pointer">
                  I agree to the <span className="text-indigo-400 hover:underline">Terms of Service</span> and <span className="text-indigo-400 hover:underline">Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] mt-4 cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
