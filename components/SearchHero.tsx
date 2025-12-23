import React, { useState, useEffect } from 'react';
import { Platform, SearchConfig } from '../types';
import { COUNTRIES, ICONS } from '../constants';

interface SearchHeroProps {
  onSearch: (config: SearchConfig) => void;
  isLoading: boolean;
  externalConfig: SearchConfig;
}

const BRAND_LOGOS = [
  { platform: Platform.GOOGLE, icon: 'fa-google', color: '#4285F4', name: 'Google' },
  { platform: Platform.YOUTUBE, icon: 'fa-youtube', color: '#FF0000', name: 'YouTube' },
  { platform: Platform.AMAZON, icon: 'fa-amazon', color: '#FF9900', name: 'Amazon' },
  { platform: Platform.TIKTOK, icon: 'fa-tiktok', color: '#000000', name: 'TikTok' },
  { platform: Platform.INSTAGRAM, icon: 'fa-instagram', color: '#E1306C', name: 'Instagram' },
  { platform: Platform.FACEBOOK, icon: 'fa-facebook', color: '#1877F2', name: 'Facebook' },
  { platform: Platform.X, icon: 'fa-x-twitter', color: '#000000', name: 'X' },
  { platform: Platform.LINKEDIN, icon: 'fa-linkedin', color: '#0077B5', name: 'LinkedIn' },
  { platform: Platform.REDDIT, icon: 'fa-reddit', color: '#FF4500', name: 'Reddit' },
  { platform: Platform.PINTEREST, icon: 'fa-pinterest', color: '#BD081C', name: 'Pinterest' },
  { platform: Platform.EBAY, icon: 'fa-ebay', color: '#0064D2', name: 'eBay' },
  { platform: Platform.ETSY, icon: 'fa-etsy', color: '#F1641E', name: 'Etsy' },
  { platform: Platform.SPOTIFY, icon: 'fa-spotify', color: '#1DB954', name: 'Spotify' },
  { platform: Platform.SHOPIFY, icon: 'fa-shopify', color: '#95BF47', name: 'Shopify' },
  { platform: Platform.APP_STORE, icon: 'fa-apple', color: '#A2AAAD', name: 'App Store' },
  { platform: Platform.PLAY_STORE, icon: 'fa-google-play', color: '#34A853', name: 'Play Store' },
  { platform: Platform.BING, icon: 'fa-microsoft', color: '#00A4EF', name: 'Bing' },
  { platform: Platform.QUORA, icon: 'fa-quora', color: '#A82400', name: 'Quora' },
  { platform: Platform.MEDIUM, icon: 'fa-medium', color: '#000000', name: 'Medium' },
  { platform: Platform.DUCKDUCKGO, icon: 'fa-magnifying-glass', color: '#DE5833', name: 'DuckDuckGo' }
];

const TRENDING_KEYWORDS = [
  "how to use ai for seo", "best mechanical keyboards 2025", "tiktok marketing strategy",
  "amazon fba keywords", "sustainable fashion brands", "remote developer jobs",
  "crypto market trends", "vegan meal prep ideas"
];

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading, externalConfig }) => {
  const [query, setQuery] = useState(externalConfig.query);
  const [country, setCountry] = useState(externalConfig.country);
  const [platform, setPlatform] = useState<Platform>(externalConfig.platform);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    setQuery(externalConfig.query);
    setCountry(externalConfig.country);
    setPlatform(externalConfig.platform);
  }, [externalConfig]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TRENDING_KEYWORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    onSearch({ query, country, language: 'en', platform });
  };

  const handleTrendingClick = (keyword: string) => {
    setQuery(keyword);
    onSearch({ query: keyword, country, language: 'en', platform });
  };

  const handlePlatformClick = (p: Platform) => {
    setPlatform(p);
  };

  return (
    <section id="search-top" className="relative pt-20 pb-32 px-4 overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-widest mb-10 shadow-sm animate-entry">
          <i className="fas fa-bolt text-indigo-500"></i>
          Free Keyword Research Tool • No Signup Required • Global Search Data
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1] animate-entry [animation-delay:100ms]">
          Rank<span className="text-indigo-600">KV</span> <br className="hidden md:block" />
          <span className="text-slate-800">The Best Free Keyword Research Tool</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed animate-entry [animation-delay:200ms] font-medium px-4">
          KV = Keyword Volume — RankKV gives you the real search data you need to rank, optimize content, and grow traffic.
        </p>

        <div className="max-w-6xl mx-auto animate-entry [animation-delay:300ms]">
          <form 
            onSubmit={handleSubmit} 
            className="group relative bg-white p-3 rounded-[2rem] md:rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 ring-4 md:ring-8 ring-slate-50 transition-all hover:ring-indigo-50"
          >
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 md:gap-4">
              <div className="flex-grow flex items-center px-4 md:px-6">
                <div className="text-indigo-500 mr-3 md:mr-4 text-xl">
                  <ICONS.Search />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a keyword..."
                  className="w-full py-4 md:py-6 text-xl md:text-2xl font-semibold border-none focus:ring-0 outline-none placeholder:text-slate-300 text-slate-800 bg-transparent"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-3 px-2 pb-2 lg:pb-0">
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="bg-slate-50 border-none rounded-[1.5rem] md:rounded-[2rem] px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-extrabold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[150px] hover:bg-slate-100 transition-colors"
                >
                  <optgroup label="Search Engines">
                    <option value={Platform.GOOGLE}>Google Search</option>
                    <option value={Platform.BING}>Bing</option>
                    <option value={Platform.YAHOO}>Yahoo</option>
                    <option value={Platform.DUCKDUCKGO}>DuckDuckGo</option>
                  </optgroup>
                  <optgroup label="Video & Social">
                    <option value={Platform.YOUTUBE}>YouTube</option>
                    <option value={Platform.TIKTOK}>TikTok</option>
                    <option value={Platform.INSTAGRAM}>Instagram</option>
                    <option value={Platform.X}>X (Twitter)</option>
                    <option value={Platform.PINTEREST}>Pinterest</option>
                  </optgroup>
                  <optgroup label="E-commerce & Apps">
                    <option value={Platform.AMAZON}>Amazon</option>
                    <option value={Platform.EBAY}>eBay</option>
                    <option value={Platform.ETSY}>Etsy</option>
                    <option value={Platform.APP_STORE}>App Store</option>
                    <option value={Platform.PLAY_STORE}>Play Store</option>
                  </optgroup>
                </select>

                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-slate-50 border-none rounded-[1.5rem] md:rounded-[2rem] px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-extrabold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[150px] hover:bg-slate-100 transition-colors"
                >
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Search Data"
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 flex justify-center items-center gap-4 text-slate-400">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Trending Now:</span>
            <button 
              type="button"
              onClick={() => handleTrendingClick(TRENDING_KEYWORDS[tickerIndex])}
              className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all border-b border-dotted border-slate-300 animate-pulse"
            >
              {TRENDING_KEYWORDS[tickerIndex]}
            </button>
          </div>

          <div className="mt-20">
            <p className="text-[10px] md:text-[12px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12">Select Your Target Platform:</p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-x-4 md:gap-x-6 gap-y-10 px-4">
              {BRAND_LOGOS.map((brand, idx) => (
                <button 
                key={idx} 
                type="button"
                onClick={() => handlePlatformClick(brand.platform)}
                className={`flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2 group outline-none ${platform === brand.platform ? 'scale-110 opacity-100' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center border-2 transition-all ${platform === brand.platform ? 'border-indigo-500 shadow-indigo-100' : 'border-transparent group-hover:border-slate-200'}`}>
                    <i 
                      className={`${brand.icon.startsWith('fa-') && !brand.icon.includes('magnifying') ? 'fab' : 'fas'} ${brand.icon} text-2xl md:text-3xl transition-colors duration-300`} 
                      style={{ color: brand.color }}
                    ></i>
                  </div>
                  <span className={`text-[8px] md:text-[9px] font-black transition-colors uppercase tracking-widest leading-none text-center ${platform === brand.platform ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'}`}>{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchHero;