import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Keyword Tool', href: '#search-top' },
    { name: 'Intelligence', href: '#features' },
    { name: 'Academy', href: '#blog' },
    { name: 'Support', href: '#faq' }
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={handleLogoClick}
          >
            <div className="relative">
               <div className="w-10 h-10 rounded-full border-[3px] border-[#e2b07e] flex items-center justify-center bg-[#0d2d2d] shadow-lg shadow-black/20 group-hover:border-white transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[#1a4d4d] opacity-80 blur-[1px]"></div>
               </div>
               <div className="absolute -bottom-1 -right-1 w-5 h-2 bg-[#e2b07e] rounded-full rotate-[45deg] border border-black/20"></div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase flex items-baseline">
              Rank<span className="bg-gradient-to-r from-[#e2b07e] via-[#b3875e] to-[#e2b07e] bg-clip-text text-transparent ml-1">KV</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#e2b07e] transition-all hover:translate-y-[-1px]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-[#e2b07e] bg-[#e2b07e]/10 px-4 py-2 rounded-full border border-[#e2b07e]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e2b07e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e2b07e]"></span>
              </span>
              GLOBAL DATA ACTIVE
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white"
            >
              <div className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-20 bg-slate-900 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col p-8 space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-tighter text-white hover:text-[#e2b07e] transition-colors border-b border-white/5 pb-4"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-8">
             <div className="inline-flex items-center gap-2 text-xs font-black text-[#e2b07e] bg-[#e2b07e]/10 px-6 py-4 rounded-2xl border border-[#e2b07e]/20 w-full justify-center">
                <i className="fas fa-signal"></i> REAL-TIME SERP ENGINE ACTIVE
             </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;