import React from 'react';
import { LegalDocType } from './LegalModal';
import { ResourceDocType } from './ResourceModal';

interface FooterProps {
  onLegalClick: (type: LegalDocType) => void;
  onResourceClick: (type: ResourceDocType) => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick, onResourceClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-24 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-10 h-10 rounded-full border-[3px] border-[#e2b07e] flex items-center justify-center bg-[#0d2d2d]">
                  <div className="w-6 h-6 rounded-full bg-[#1a4d4d] opacity-80 blur-[1px]"></div>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase">Rank<span className="text-[#e2b07e]">KV</span></span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-medium">
                Democratizing high-performance SEO data. RankKV provides real-time keyword search volume for everyone, from creators to enterprise teams.
              </p>
              <div className="flex gap-4 mt-8">
                 <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#e2b07e] hover:text-slate-900 transition-all"><i className="fab fa-twitter"></i></a>
                 <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#e2b07e] hover:text-slate-900 transition-all"><i className="fab fa-linkedin-in"></i></a>
                 <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#e2b07e] hover:text-slate-900 transition-all"><i className="fab fa-youtube"></i></a>
              </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Product</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-[#e2b07e] transition-colors">Free Keyword Tool</button></li>
              <li><button className="hover:text-[#e2b07e] transition-colors cursor-not-allowed opacity-50">Global API</button></li>
              <li><button className="hover:text-[#e2b07e] transition-colors cursor-not-allowed opacity-50">Browser Extension</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Resources</h4>
            <ul className="space-y-4 text-sm font-bold flex flex-col items-start">
              <li><button onClick={() => onResourceClick('academy')} className="hover:text-[#e2b07e] transition-colors text-left">SEO Academy</button></li>
              <li><button onClick={() => onResourceClick('guide')} className="hover:text-[#e2b07e] transition-colors text-left">Master Guide</button></li>
              <li><button onClick={() => onResourceClick('cases')} className="hover:text-[#e2b07e] transition-colors text-left">Creator Stories</button></li>
              <li><button onClick={() => onResourceClick('help')} className="hover:text-[#e2b07e] transition-colors text-left">Support Center</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Compliance</h4>
            <ul className="space-y-4 text-sm font-bold flex flex-col items-start">
              <li><button onClick={() => onLegalClick('privacy')} className="hover:text-[#e2b07e] transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => onLegalClick('terms')} className="hover:text-[#e2b07e] transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={() => onLegalClick('gdpr')} className="hover:text-[#e2b07e] transition-colors text-left">GDPR Standard</button></li>
              <li><button onClick={() => onLegalClick('guidelines')} className="hover:text-[#e2b07e] transition-colors text-left">Guidelines</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© 2024 RankKV.com • THE WORLD'S #1 FREE KEYWORD RESEARCH TOOL</p>
          <div className="flex gap-8">
            <span className="text-[#e2b07e]">SERP ENGINE v4.1 LIVE</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;