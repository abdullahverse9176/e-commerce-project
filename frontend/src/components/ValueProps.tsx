import React from 'react';
import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Worldwide Express Shipping',
      description: 'On all orders over $50 with live tracking',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
    },
    {
      icon: RefreshCw,
      title: '30-Day Hassle-Free Returns',
      description: 'Not satisfied? Full refund guaranteed',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      description: 'Encrypted payment gateways & buyer protection',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Live chat & phone assistance anytime',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <section className="py-10 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
