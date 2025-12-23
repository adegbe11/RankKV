import React from 'react';

const articles = [
  {
    title: 'How to Outrank Competitors Using Long-Tail Keywords',
    subtitle: 'Discover why specific, low-volume keywords often drive 3x the conversion rate of head terms.',
    readTime: '8 min',
    icon: 'fa-chess-king',
    color: 'from-blue-500 to-indigo-600',
    link: 'article-long-tail.html'
  },
  {
    title: 'Dominating Amazon Search: A Guide for Sellers',
    subtitle: 'Identify high-intent product keywords that convert visitors into buyers.',
    readTime: '12 min',
    icon: 'fa-shopping-cart',
    color: 'from-orange-400 to-rose-500',
    link: 'article-amazon-seo.html'
  },
  {
    title: 'YouTube Keyword Research: Beyond the Basics',
    subtitle: 'Find trending video topics before they go viral on the global stage.',
    readTime: '10 min',
    icon: 'fa-play-circle',
    color: 'from-red-500 to-pink-600',
    link: 'article-youtube-vseo.html'
  },
  {
    title: 'TikTok Trend Hacking: Data-Driven Content',
    subtitle: 'Leverage RankKV data to predict the next viral sound and hashtag trends.',
    readTime: '6 min',
    icon: 'fa-bolt',
    color: 'from-emerald-400 to-teal-600',
    link: 'article-tiktok-trends.html'
  }
];

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-32 relative overflow-hidden bg-slate-50/50 scroll-mt-24">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-100/50 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Learn & Master <span className="text-indigo-600">Keyword Research</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            Actionable guides, tutorials, and case studies to help you discover high-value keywords and boost search performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {articles.map((article, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${article.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className={`w-12 h-12 bg-gradient-to-br ${article.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <i className={`fas ${article.icon} text-xl`}></i>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest bg-slate-100/50 px-3 py-1 rounded-full">
                  <i className="far fa-clock"></i>
                  {article.readTime}
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                {article.title}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                {article.subtitle}
              </p>

              <div className="mt-auto">
                <a href={article.link} className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300 flex items-center justify-center gap-2">
                  Read Guide <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="guides.html" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 group">
            Browse All Guides
            <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;