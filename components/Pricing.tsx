import React from 'react';
import { ICONS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-20">
           <span className="text-xs font-black text-[#e2b07e] uppercase tracking-[0.4em] mb-4 block">Scalable Growth</span>
           <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Professional SEO <span className="text-indigo-600">Solutions</span></h2>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
             Start for free with high-limit global data and scale seamlessly to our enterprise intelligence platform.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col items-center shadow-sm hover:shadow-xl transition-all">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Community</span>
            <div className="text-6xl font-black text-slate-900 mb-8">$0<span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">/mo</span></div>
            <ul className="space-y-5 mb-12 text-left w-full">
              {['25 Searches/day', '24h Data Freshness', 'Standard Trend Analysis', 'CSV Export Ready', 'AI Semantic Clusters'].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                  <div className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-[10px]">
                    <i className="fas fa-check"></i>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-[2rem] border-2 border-slate-100 text-slate-600 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all mt-auto active:scale-95">Get Started Free</button>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-900 p-10 rounded-[3rem] border-[3px] border-[#e2b07e] flex flex-col items-center shadow-2xl relative scale-105 z-10 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <i className="fas fa-crown text-8xl text-[#e2b07e]"></i>
            </div>
            <div className="bg-[#e2b07e] text-slate-900 text-[10px] font-black uppercase tracking-widest px-6 py-1.5 rounded-full mb-6">RANKKV PRO</div>
            <span className="text-xs font-black text-[#e2b07e] uppercase tracking-widest mb-2">Professional</span>
            <div className="text-6xl font-black text-white mb-8">$49<span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">/mo</span></div>
            <ul className="space-y-5 mb-12 text-left w-full">
              {['Unlimited Daily Searches', 'Real-Time SERP Refreshes', 'Deep Historical Trends', 'API Access (10k requests)', 'Priority AI Intelligence'].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                  <div className="w-5 h-5 bg-[#e2b07e]/20 text-[#e2b07e] rounded-full flex items-center justify-center text-[10px]">
                    <i className="fas fa-bolt"></i>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-6 rounded-[2rem] bg-gradient-to-r from-[#e2b07e] via-[#b3875e] to-[#e2b07e] text-slate-900 font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all mt-auto shadow-lg shadow-[#e2b07e]/20 active:scale-95">Upgrade to Pro</button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col items-center shadow-sm hover:shadow-xl transition-all">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Corporation</span>
            <div className="text-6xl font-black text-slate-900 mb-8">$199<span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">/mo</span></div>
            <ul className="space-y-5 mb-12 text-left w-full">
              {['Everything in Pro', 'White-Label Reporting', 'Custom Webhook Alerts', 'Full Team Access', '24/7 Dedicated SEO Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                  <div className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-[10px]">
                    <i className="fas fa-check"></i>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-[2rem] border-2 border-slate-100 text-slate-600 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all mt-auto active:scale-95">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;