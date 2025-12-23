
import React from 'react';

export type LegalDocType = 'privacy' | 'terms' | 'gdpr' | 'guidelines' | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    content: `RankKV is built with a "Privacy First" philosophy. Unlike other SEO tools, we do not require accounts, email addresses, or credit cards to use our core keyword volume checker. 
    
    1. Data Collection: We do not store your search queries or IP addresses in any persistent database. 
    2. Cookies: We use minimal local storage only to remember your preferred search settings (like country or platform) and your recent search history. 
    3. Third Parties: Search data is processed through the Google Gemini API in an anonymized fashion to provide accurate semantic clustering. 
    4. Tracking: We do not use intrusive tracking scripts or sell your research data to advertisers. Your SEO strategy remains yours.`
  },
  terms: {
    title: 'Terms of Use',
    content: `By accessing RankKV.com, you agree to the following terms:
    
    1. Acceptable Use: You may use RankKV for personal or professional SEO research. 
    2. Scraping: Automated scraping or "botting" of our search interface is strictly prohibited to ensure fair access for all human users.
    3. Accuracy: While we strive for 100% accuracy by aggregating from 24+ global databases, keyword data is an estimate. RankKV is not liable for business decisions made based on these estimations.
    4. Availability: We provide this tool "as is" and for free. We reserve the right to modify or temporarily suspend the service for maintenance.`
  },
  gdpr: {
    title: 'GDPR Compliance',
    content: `RankKV is fully compliant with the General Data Protection Regulation (GDPR). 
    
    1. No PII: We do not collect, process, or store any Personally Identifiable Information (PII). 
    2. Right to be Forgotten: Since we don't store your query data on our servers, there is no personal data to delete. 
    3. Data Portability: You can export your search results at any time via our bulk CSV download feature. 
    4. Contact: For any data-related inquiries, please reach out to our community support channel.`
  },
  guidelines: {
    title: 'Community Guidelines',
    content: `RankKV is a community-driven utility. To maintain a healthy environment, we ask users to follow these guidelines:
    
    1. Respect the Tool: Do not attempt to reverse-engineer our API or overwhelm our servers with malicious traffic.
    2. Share Knowledge: We encourage users to share the insights found on RankKV.com to help democratize SEO knowledge.
    3. Feedback: If you find a bug or have a suggestion, please share it through our support channels. 
    4. Fair Play: Do not use RankKV to generate spam or engage in "black hat" SEO practices that violate search engine terms.`
  }
};

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const doc = LEGAL_CONTENT[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
        <div className="p-8 sm:p-12">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{doc.title}</h2>
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

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onClose}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
