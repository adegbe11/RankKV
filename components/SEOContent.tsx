
import React from 'react';

const SEOContent: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Comparison Section (The Competitive Advantage) */}
      <section className="py-24 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Market Comparison</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
              RankKV vs. The Expensive Competitors
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Why pay $99/mo for search volume data? RankKV provides the same enterprise-grade metrics with zero signup required.
            </p>
          </div>

          <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-8 md:p-10 font-black text-slate-400 uppercase tracking-widest text-xs">Features</th>
                  <th className="p-8 md:p-10 font-black text-indigo-600 uppercase tracking-widest text-xs text-center bg-indigo-50/50">RankKV (Free)</th>
                  <th className="p-8 md:p-10 font-black text-slate-400 uppercase tracking-widest text-xs text-center">Others ($99+/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { f: 'Keyword Search Volume', rank: 'Real-Time & Accurate', other: 'Estimated / Often Blurred' },
                  { f: 'Signup Required', rank: 'No (Instant Access)', other: 'Yes (Credit Card Required)' },
                  { f: 'Platforms Supported', rank: '24+ Global Platforms', other: 'Google Only' },
                  { f: 'Bulk Export (CSV)', rank: 'Unlimited Free', other: 'Paid Tier Only' },
                  { f: 'Trend Analysis', rank: 'Full 24-Month History', other: 'Limited 12-Month' },
                  { f: 'AI Strategy Lab', rank: 'Included Free', other: 'Expensive Add-on' }
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="p-8 md:p-10 font-bold text-slate-700">{row.f}</td>
                    <td className="p-8 md:p-10 text-center bg-indigo-50/30">
                      <div className="flex flex-col items-center gap-1">
                        <i className="fas fa-check-circle text-indigo-600 text-xl"></i>
                        <span className="text-xs font-black text-indigo-900 uppercase tracking-tighter">{row.rank}</span>
                      </div>
                    </td>
                    <td className="p-8 md:p-10 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <i className="fas fa-times-circle text-slate-300 text-xl"></i>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{row.other}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* H2 #1 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                Free Keyword Research Tool for Search Volume, Trends & Rankings
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-6">
                RankKV is the definitive high-performance utility for creators who need <strong>accurate keyword search volume free</strong>. We bridge the gap between expensive enterprise tools and the open web by providing real-time data for search volume, historical trends, and global rankings.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                With <strong>no signup required</strong>, you can instantly analyze monthly search counts and competition metrics. Our platform uses advanced semantic aggregation to ensure you never miss a <strong>high-traffic opportunity</strong> in your niche.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-2xl text-sm font-bold border border-emerald-100">
                  <i className="fas fa-check-circle"></i> 100% Free Tool
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-3 rounded-2xl text-sm font-bold border border-indigo-100">
                  <i className="fas fa-check-circle"></i> Real-time KV Data
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200 shadow-inner">
               <div className="space-y-6">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Search Volume Accuracy</p>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                       <div className="bg-indigo-600 h-full w-[98%]"></div>
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-700">RankKV Verified Data</p>
                 </div>
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">SEO Ranking Potential</p>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full w-[88%]"></div>
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-700">High Visibility Forecast</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* H2 #2 */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 max-w-4xl mx-auto leading-tight">
            How RankKV Finds Keywords People Are Actually Searching For
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-16 font-medium">
            At RankKV (which stands for <strong>Rank Keyword Volume</strong>), our algorithm crawls live search feeds to identify <strong>long-tail keywords</strong> that drive actual revenue and views.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 text-left shadow-sm hover:shadow-xl transition-all">
              <div className="text-3xl text-indigo-600 mb-6 font-black italic">01.</div>
              <h3 className="text-2xl font-bold mb-4">Intent Discovery</h3>
              <p className="text-slate-600 font-medium">We analyze query patterns to determine if users want to <strong>buy, learn, or navigate</strong>, helping you target the right intent.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 text-left shadow-sm hover:shadow-xl transition-all">
              <div className="text-3xl text-indigo-600 mb-6 font-black italic">02.</div>
              <h3 className="text-2xl font-bold mb-4">Live Volume Feeds</h3>
              <p className="text-slate-600 font-medium">Unlike databases that update quarterly, we fetch <strong>real-time keyword search volume</strong> to capture viral trends instantly.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 text-left shadow-sm hover:shadow-xl transition-all">
              <div className="text-3xl text-indigo-600 mb-6 font-black italic">03.</div>
              <h3 className="text-2xl font-bold mb-4">Semantic Clusters</h3>
              <p className="text-slate-600 font-medium">Our AI groups related keywords into <strong>topical hubs</strong>, giving you a roadmap to build absolute authority in your niche.</p>
            </div>
          </div>
        </div>
      </section>

      {/* H2 #3 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                Keyword Search Data Across Google, YouTube, TikTok, Amazon & More
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-6">
                Dominate every corner of the web. RankKV provides <strong>multi-platform keyword intelligence</strong>, allowing you to optimize for more than just traditional search engines. Discover <strong>search volume</strong> for e-commerce and social video in one place.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { p: 'Google Search', d: 'The industry standard for organic growth.' },
                  { p: 'YouTube Video', d: 'Keywords that drive views and watch time.' },
                  { p: 'TikTok Trends', d: 'Hashtags and audio search volume.' },
                  { p: 'Amazon Store', d: 'Buyer-intent terms for product sellers.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                      <i className="fas fa-check"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.p}</h4>
                      <p className="text-slate-500 text-sm font-medium">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 scale-105 opacity-5"></div>
                <div className="relative bg-white rounded-[3rem] p-5 shadow-2xl border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                    className="rounded-[2.5rem] w-full" 
                    alt="Multi-platform SEO Intelligence" 
                  />
                  <div className="absolute top-10 right-10 bg-white/90 backdrop-blur shadow-xl p-4 rounded-2xl border border-slate-100 animate-bounce">
                     <p className="text-xs font-bold text-indigo-600">NEW: TikTok KV Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H2 #4 */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center tracking-tight">
            Why RankKV Is Better Than Other Keyword Research Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: '100% Free Forever', d: 'No credit card, no "pro" traps. Get full data from day one.', i: 'fa-lock-open' },
              { t: 'Instant Export', d: 'Download your keyword research in CSV format for PPC or SEO.', i: 'fa-file-export' },
              { t: 'AI Insight Lab', d: 'Our tool generates content strategy, not just rows of numbers.', i: 'fa-microchip' },
              { t: 'Zero Signup', d: 'Your research is private. We never store your queries or emails.', i: 'fa-shield-heart' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all border-b-4 border-b-indigo-500">
                <i className={`fas ${item.i} text-4xl text-indigo-400 mb-6`}></i>
                <h3 className="text-xl font-bold mb-4">{item.t}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H2 #5 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Who Should Use RankKV?</h2>
            <p className="text-xl text-slate-600 font-medium">Designed for professionals who need fast, reliable <strong>search volume data</strong>.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { t: 'Content Creators', i: 'fa-microphone', c: 'text-rose-500', desc: 'Find viral topics' },
              { t: 'SEO Professionals', i: 'fa-search-dollar', c: 'text-indigo-500', desc: 'Audit competitors' },
              { t: 'Business Owners', i: 'fa-briefcase', c: 'text-emerald-500', desc: 'Local search growth' },
              { t: 'App Developers', i: 'fa-code', c: 'text-blue-500', desc: 'Store optimization' },
              { t: 'E-commerce Sellers', i: 'fa-shopping-bag', c: 'text-amber-500', desc: 'Convert buyers' }
            ].map((user, i) => (
              <div key={i} className="flex flex-col items-center p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-indigo-200 transition-all group">
                <div className={`w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${user.c}`}>
                  <i className={`fas ${user.i} text-3xl`}></i>
                </div>
                <h4 className="font-bold text-slate-900 text-center mb-2">{user.t}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H2 #6 */}
      <section className="py-28 premium-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
            Start Using the Best Free Keyword Research Tool
          </h2>
          <p className="text-2xl text-indigo-50 font-medium mb-12 opacity-95 leading-relaxed">
            Unlock the <strong>search volume checker free</strong> utility that helps you rank higher. <br/> Join 50,000+ daily experts on <strong>RankKV.com</strong>.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-indigo-600 px-16 py-6 rounded-full font-black text-2xl hover:bg-slate-50 transition-all shadow-2xl active:scale-95 flex items-center gap-4 mx-auto"
          >
            Check Volume Now <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SEOContent;
