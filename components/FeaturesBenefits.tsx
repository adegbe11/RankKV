import React from 'react';

const FeatureItem: React.FC<{ title: string; desc: string; benefit: string; icon: string }> = ({ title, desc, benefit, icon }) => (
  <div className="flex flex-col p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 mb-6 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
    <div className="mt-auto pt-6 border-t border-slate-50">
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Key Benefit</p>
      <p className="text-indigo-600 font-bold">{benefit}</p>
    </div>
  </div>
);

const FeaturesBenefits: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Powerful Features That Make RankKV the <br className="hidden md:block" />
            <span className="text-indigo-600">Best Free Keyword Research Tool</span>
          </h2>
          <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
            Experience the full potential of high-performance search intelligence. RankKV is engineered to give you a competitive edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem 
            icon="fa-layer-group"
            title="Multi-Platform Keyword Research"
            desc="Track keywords and search trends across <strong>Google, YouTube, TikTok, Instagram, Pinterest, Amazon, eBay, App Store, Play Store</strong>, and more."
            benefit="No other free tool gives you this much coverage in one place."
          />
          <FeatureItem 
            icon="fa-chart-line"
            title="Real-Time Search Volume & Trends"
            desc="Get accurate, up-to-the-minute <strong>keyword search volume</strong> metrics and <strong>trending keywords</strong>."
            benefit="Make decisions based on actual behavior, not outdated data."
          />
          <FeatureItem 
            icon="fa-magic"
            title="Long-Tail Keyword Suggestions"
            desc="Automatically generate thousands of <strong>long-tail keywords</strong> related to any topic with our semantic engine."
            benefit="Unlock hidden traffic opportunities that other tools often miss."
          />
          <FeatureItem 
            icon="fa-bolt"
            title="Free & Instant Access"
            desc="RankKV is a <strong>free keyword research tool</strong> with no account required, no limits, and 100% free forever."
            benefit="Start researching keywords instantly without friction."
          />
          <FeatureItem 
            icon="fa-map-marked-alt"
            title="Global & Local Insights"
            desc="Filter by country, language, and <strong>multi-platform</strong> parameters to target specific audiences worldwide."
            benefit="Optimize content and campaigns for any market globally."
          />
          <FeatureItem 
            icon="fa-crown"
            title="Advanced Data for Power Users"
            desc="High-performance data sets, large-scale keyword exports, and deeper <strong>trending keywords</strong> analytics."
            benefit="Professional-grade insights available to everyone for free."
          />
          <FeatureItem 
            icon="fa-smile-beam"
            title="Beginner-Friendly Interface"
            desc="Clean, intuitive dashboard designed specifically for marketers, content creators, and business owners."
            benefit="You don’t need to be an SEO expert to discover keywords."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesBenefits;