import React, { useState, useCallback, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import SearchHero from './components/SearchHero';
import KeywordResults from './components/KeywordResults';
import BlogSection from './components/BlogSection';
import SEOContent from './components/SEOContent';
import FeaturesBenefits from './components/FeaturesBenefits';
import Footer from './components/Footer';
import LegalModal, { LegalDocType } from './components/LegalModal';
import ResourceModal, { ResourceDocType } from './components/ResourceModal';
import { KeywordAnalysis, SearchConfig, Platform } from './types';
import { getKeywordAnalysis } from './services/keywordService';

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <span className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pr-8 tracking-tight">{question}</span>
        <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 transform transition-transform duration-500 ${isOpen ? 'rotate-180 bg-indigo-600 text-white shadow-lg shadow-indigo-200' : ''}`}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <div className="text-lg text-slate-600 leading-relaxed font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-inner">
          {answer}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);
  const [activeResourceDoc, setActiveResourceDoc] = useState<ResourceDocType>(null);
  const [history, setHistory] = useState<string[]>([]);
  
  const [searchState, setSearchState] = useState<SearchConfig>({
    query: '',
    country: 'US',
    language: 'en',
    platform: Platform.GOOGLE
  });

  useEffect(() => {
    const saved = localStorage.getItem('rankkv-history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (query: string) => {
    const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 8);
    setHistory(newHistory);
    localStorage.setItem('rankkv-history', JSON.stringify(newHistory));
  };

  const handleSearch = useCallback(async (config: SearchConfig) => {
    if (!config.query.trim()) return;
    setIsLoading(true);
    setError(null);
    setSearchState(config);

    try {
      const result = await getKeywordAnalysis(config);
      setAnalysis(result);
      addToHistory(config.query);
      setTimeout(() => {
        const resultsEl = document.getElementById('results-view');
        if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'RankKV analysis engines are temporarily overloaded. Please wait 10 seconds and try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [history]);

  const triggerKeywordSearch = (keyword: string) => {
    handleSearch({ ...searchState, query: keyword });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      <Header />
      
      <main className="flex-grow">
        <SearchHero 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          externalConfig={searchState}
        />

        {history.length > 0 && !analysis && !isLoading && (
          <div className="max-w-4xl mx-auto px-4 mb-20 animate-entry [animation-delay:400ms]">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mr-2">Recent Checks:</span>
              {history.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSearch({ ...searchState, query: q })}
                  className="px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
              <button onClick={() => { setHistory([]); localStorage.removeItem('rankkv-history'); }} className="text-xs font-bold text-slate-400 hover:text-rose-500 ml-4 transition-colors">Clear History</button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="max-w-4xl mx-auto px-4 mb-12">
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-8 py-5 rounded-[2rem] flex flex-col gap-2 shadow-sm">
              <div className="flex items-center gap-4">
                <i className="fas fa-exclamation-triangle text-xl"></i>
                <span className="font-bold text-lg">Search Failed</span>
              </div>
              <p className="text-sm opacity-80 pl-10">{error}</p>
            </div>
          </div>
        )}

        <div id="results-view" className="scroll-mt-24">
          {analysis && (
            <KeywordResults 
              data={analysis} 
              onKeywordClick={triggerKeywordSearch}
            />
          )}
        </div>

        <SEOContent />
        <FeaturesBenefits />
        <BlogSection />

        <section id="faq" className="py-32 bg-white border-t border-slate-100 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">Frequently Asked <br/> <span className="text-indigo-600">RankKV</span> Questions</h2>
              <p className="mt-8 text-xl text-slate-600 font-medium max-w-2xl mx-auto">Get expert answers about our <strong>free keyword research tool</strong> and the landscape of global search volume.</p>
            </div>
            <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
              <FAQItem 
                question="What is RankKV?" 
                answer={<><strong>RankKV</strong> is a free keyword research tool that lets you check <strong>keyword search volume</strong>, trends, and related long-tail keywords across Google, YouTube, TikTok, Amazon, and more — instantly and without an account.</>}
              />
              <FAQItem 
                question="Is RankKV really free?" 
                answer={<><strong>Yes.</strong> RankKV is 100% free forever, with no signup required. You can generate thousands of keyword suggestions and check search volume instantly.</>}
              />
              <FAQItem 
                question="How does RankKV work?" 
                answer={<>RankKV collects <strong>real-time keyword data</strong> from multiple platforms. Enter any topic, and it generates <strong>long-tail keywords</strong>, search volume metrics, and trend insights to help you optimize content, ads, or product listings.</>}
              />
              <FAQItem 
                question="Which platforms does RankKV cover?" 
                answer={<>RankKV supports <strong>Google, YouTube, TikTok, Instagram, Pinterest, Amazon, eBay, App Store, Play Store</strong>, and more — giving you <strong>multi-platform keyword intelligence</strong> in one place.</>}
              />
              <FAQItem 
                question="Who should use RankKV?" 
                answer={<>RankKV is perfect for <strong>marketers, content creators, business owners, e-commerce sellers, app developers</strong>, and anyone who wants to discover what people are searching for online.</>}
              />
              <FAQItem 
                question="Can I export keywords from RankKV?" 
                answer={<><strong>Yes.</strong> Our tool allows exporting large keyword datasets in <strong>CSV</strong> for SEO, PPC, or content strategy purposes. Free users can still view and analyze results instantly.</>}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onLegalClick={setActiveLegalDoc} onResourceClick={setActiveResourceDoc} />
      
      <LegalModal type={activeLegalDoc} onClose={() => setActiveLegalDoc(null)} />
      <ResourceModal type={activeResourceDoc} onClose={() => setActiveResourceDoc(null)} />
      <SpeedInsights />
    </div>
  );
};

export default App;