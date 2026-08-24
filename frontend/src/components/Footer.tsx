import React from 'react';
import { Sparkles, Shield, Lock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-['Space_Grotesk']">
                AURA<span className="text-indigo-400">MART</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Curating premium consumer electronics, fashion apparel, accessories, and smart home innovations for modern lifestyles.
            </p>
            
            {/* Security Badges */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> Buyer Protection
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Tech & Gadgets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apparel & Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sneakers & Footwear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Watches & Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Home Living</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty & Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About AuraMart</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} AuraMart Inc. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for exceptional shopping.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Accepted Payments:</span>
            <div className="flex gap-2">
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-300">VISA</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-300">MASTERCARD</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-300">AMEX</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-300">PAYPAL</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-300">APPLE PAY</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
