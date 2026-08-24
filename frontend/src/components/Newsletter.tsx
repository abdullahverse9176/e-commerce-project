import React, { useState } from 'react';
import { Mail, Sparkles, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-500/20 shadow-2xl text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Join Aura VIP Club</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-xl mx-auto font-['Space_Grotesk'] leading-tight">
            Unlock <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">20% OFF</span> Your First Order
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Subscribe to receive exclusive access to drops, secret flash sales, tech reviews, and VIP coupon codes.
          </p>

          {subscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2 text-sm font-semibold animate-fadeIn">
              <Check className="w-5 h-5" /> You're subscribed! Check your inbox for your AURA20 code.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3.5 border border-slate-700/80 focus:border-indigo-500 outline-none transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 shrink-0"
              >
                Subscribe VIP
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-500">
            No spam guaranteed. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};
