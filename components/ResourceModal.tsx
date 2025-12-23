
import React from 'react';

export type ResourceDocType = 'academy' | 'guide' | 'cases' | 'help' | null;

interface ResourceModalProps {
  type: ResourceDocType;
  onClose: () => void;
}

const RESOURCE_CONTENT = {
  academy: {
    title: 'RankKV Academy',
    content: `Welcome to the RankKV Academy. Our mission is to take you from SEO zero to hero with actionable, data-driven lessons using RankKV.com.
    
    1. SEO Fundamentals: Understanding how modern search engines crawl, index, and rank content.
    2. On-Page Mastery: Optimizing titles, meta descriptions, and header tags for maximum impact.
    3. Technical SEO: Site speed, mobile-friendliness, and Core Web Vitals.
    4. Backlink Strategy: Building authority without the spam.
    5. Content Marketing: Writing for humans while satisfying AI-driven search algorithms.`
  },
  guide: {
    title: 'Keyword Research Guide',
    content: `Master the art of finding high-value, low-competition keywords using RankKV.
    
    1. Identifying Seed Keywords: Starting with broad topics related to your niche.
    2. Analyzing Intent: Using RankKV to distinguish "Transactional" keywords from "Informational" ones.
    3. Evaluating Competition: Using our 0-100 difficulty score to find "low-hanging fruit."
    4. Long-Tail Discovery: How to use semantic variations to capture niche traffic.
    5. Platform Selection: Why your keyword strategy must differ between YouTube, TikTok, and Google.`
  },
  cases: {
    title: 'Case Studies',
    content: `See how real businesses and creators used RankKV.com to dominate their niches.
    
    1. The E-commerce Pivot: How a small Etsy shop increased sales by 400% by identifying high-intent Amazon search terms.
    2. The YouTuber's Growth: A tech reviewer who doubled their views in 3 months by targeting trending TikTok hashtags first.
    3. Local Service SEO: A plumbing business that captured 80% of local search volume using our geo-data filters.
    4. SaaS Scaling: How a B2B startup reduced their CPC by 60% by shifting to long-tail variations.`
  },
  help: {
    title: 'Help Center',
    content: `Need assistance with RankKV? We're here to help you get the most out of our keyword data.
    
    1. Common Issues: What to do if a search returns "No Data" or an error message.
    2. Data Accuracy: Understanding how RankKV aggregates volumes and CPC estimates.
    3. Bulk Exports: Troubleshooting CSV download issues in specific browsers.
    4. Feedback & Requests: How to suggest new features or report bugs to our dev team.
    5. API Access: Information on our upcoming developer tools for high-volume users.`
  }
};

const ResourceModal: React.FC<ResourceModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const doc = RESOURCE_CONTENT[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 border border-indigo-50">
        <div className="p-8 sm:p-12">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <i className={`fas ${type === 'academy' ? 'fa-graduation-cap' : type === 'guide' ? 'fa-book' : type === 'cases' ? 'fa-lightbulb' : 'fa-question-circle'} text-xl`}></i>
               </div>
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">{doc.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="prose prose-slate max-w-none">
            {doc.content.split('\n').map((paragraph, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4 font-medium whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end gap-4">
            <button 
               onClick={() => window.print()}
               className="px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
               <i className="fas fa-print"></i> Print
            </button>
            <button 
              onClick={onClose}
              className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
