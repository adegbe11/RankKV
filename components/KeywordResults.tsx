import React, { useState, useMemo } from 'react';
import { KeywordAnalysis, RelatedKeyword } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface KeywordResultsProps {
  data: KeywordAnalysis;
  onKeywordClick: (keyword: string) => void;
}

const IntentBadge: React.FC<{ type: string }> = ({ type }) => {
  const colors: Record<string, string> = {
    'Transactional': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Commercial': 'bg-[#e2b07e]/10 text-[#b3875e] border-[#e2b07e]/20',
    'Informational': 'bg-blue-100 text-blue-700 border-blue-200',
    'Navigational': 'bg-purple-100 text-purple-700 border-purple-200'
  };
  const color = colors[type] || 'bg-slate-100 text-slate-700 border-slate-200';
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${color}`}>
      {type}
    </span>
  );
};

const KeywordResults: React.FC<KeywordResultsProps> = ({ data, onKeywordClick }) => {
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<keyof RelatedKeyword | 'kei'>('volume');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [strategyCopyStatus, setStrategyCopyStatus] = useState(false);

  const toggleSelectAll = () => {
    if (selectedKeywords.size === data.related.length) {
      setSelectedKeywords(new Set());
    } else {
      setSelectedKeywords(new Set(data.related.map(k => k.keyword)));
    }
  };

  const toggleKeyword = (e: React.MouseEvent, keyword: string) => {
    e.stopPropagation();
    const next = new Set(selectedKeywords);
    if (next.has(keyword)) next.delete(keyword);
    else next.add(keyword);
    setSelectedKeywords(next);
  };

  const handleSort = (field: keyof RelatedKeyword | 'kei') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const calculateKEI = (volume: number, competition: number) => {
    const diff = Math.max(0.01, competition);
    return Math.round((volume / (diff * 100)) * 10) / 10;
  };

  const sortedRelated = useMemo(() => {
    return [...data.related].sort((a, b) => {
      let valA: any = a[sortField as keyof RelatedKeyword];
      let valB: any = b[sortField as keyof RelatedKeyword];
      if (sortField === 'kei') {
        valA = calculateKEI(a.volume, a.competition);
        valB = calculateKEI(b.volume, b.competition);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [data.related, sortField, sortOrder]);

  const intentData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.related.forEach(k => { counts[k.intent] = (counts[k.intent] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data.related]);

  const COLORS = ['#6366f1', '#10b981', '#e2b07e', '#8b5cf6'];

  const handleBulkExport = () => {
    if (selectedKeywords.size === 0) return;
    const selectedData = data.related.filter(k => selectedKeywords.has(k.keyword));
    const headers = ['Keyword', 'Volume', 'CPC', 'Difficulty', 'Intent', 'KEI'];
    const rows = selectedData.map(k => [k.keyword, k.volume, k.cpc, k.competition, k.intent, calculateKEI(k.volume, k.competition)]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rankkv-${data.keyword}.csv`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-entry">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{data.keyword}</h2>
            <IntentBadge type={data.intent} />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Global Multi-Platform Data Analysis</span>
             <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
             <span className="text-[#e2b07e] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
               <i className="fas fa-shield-check"></i> Verified Real-Time
             </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center px-8 border-r border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reliability</p>
            <p className="text-2xl font-black text-[#e2b07e]">{data.confidenceScore}%</p>
          </div>
          <button 
            disabled={selectedKeywords.size === 0}
            onClick={handleBulkExport}
            className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-30 shadow-lg active:scale-95 flex items-center gap-2"
          >
            <i className="fas fa-file-export"></i>
            Export Data ({selectedKeywords.size})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Est. Volume</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 tracking-tighter">{data.volume.toLocaleString()}</span>
            <span className="text-xs font-black text-slate-300 uppercase">/mo</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">CPC (USD)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 tracking-tighter">${data.cpc.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Difficulty</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-black tracking-tighter ${data.competition > 0.7 ? 'text-rose-500' : 'text-[#e2b07e]'}`}>{Math.round(data.competition * 100)}<span className="text-sm font-black text-slate-300">/100</span></span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">KEI Score</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-indigo-600 tracking-tighter">{calculateKEI(data.volume, data.competition)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
              Trend Forecast
              <span className="text-[10px] font-black text-[#e2b07e] uppercase bg-[#e2b07e]/10 px-4 py-1.5 rounded-full">KV Prediction</span>
            </h3>
            <div className="h-64 w-full" style={{ minHeight: '256px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontVariant="black" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px' }} 
                    itemStyle={{ fontWeight: '900', color: '#6366f1', textTransform: 'uppercase', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={5} fill="url(#colorVol)" animationDuration={2000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900">Keyword Variations Matrix</h3>
              <button onClick={toggleSelectAll} className="text-[10px] font-black text-[#e2b07e] uppercase tracking-widest border border-[#e2b07e]/20 px-4 py-2 rounded-full hover:bg-[#e2b07e]/5 transition-all">
                {selectedKeywords.size === data.related.length ? 'Clear Selection' : 'Select All'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="pb-6 w-10"></th>
                    <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] cursor-pointer" onClick={() => handleSort('keyword')}>Keyword</th>
                    <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] text-right cursor-pointer" onClick={() => handleSort('volume')}>Volume</th>
                    <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] text-right cursor-pointer" onClick={() => handleSort('kei')}>KEI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sortedRelated.map((k, i) => (
                    <tr 
                      key={i} 
                      onClick={() => onKeywordClick(k.keyword)}
                      className="hover:bg-slate-50/80 transition-all group cursor-pointer"
                    >
                      <td className="py-5" onClick={(e) => toggleKeyword(e, k.keyword)}>
                        <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${selectedKeywords.has(k.keyword) ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200 group-hover:border-[#e2b07e]'}`}>
                          {selectedKeywords.has(k.keyword) && <i className="fas fa-check text-[10px] text-[#e2b07e]"></i>}
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 group-hover:text-[#e2b07e] transition-colors">{k.keyword}</span>
                          <IntentBadge type={k.intent} />
                        </div>
                      </td>
                      <td className="py-5 text-right font-black text-slate-600">{k.volume.toLocaleString()}</td>
                      <td className="py-5 text-right">
                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${calculateKEI(k.volume, k.competition) > 50 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                          {calculateKEI(k.volume, k.competition)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5 min-h-[350px]">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#e2b07e] rounded-full blur-[60px] opacity-20"></div>
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <i className="fas fa-chart-pie text-[#e2b07e]"></i> Search Intent Mix
            </h3>
            <div className="h-48 w-full mb-8" style={{ minHeight: '192px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={intentData}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {intentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '24px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              {intentData.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm group">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <i className="fas fa-sparkles text-[#e2b07e]"></i> AI Strategy Hub
            </h3>
            <p className="text-slate-600 leading-relaxed italic border-l-[6px] border-[#e2b07e] pl-6 mb-10 font-medium text-lg bg-slate-50 py-6 rounded-r-3xl">
              "{data.summary}"
            </p>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(data.summary);
                setStrategyCopyStatus(true);
                setTimeout(() => setStrategyCopyStatus(false), 2000);
              }}
              className="w-full py-5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
            >
              <i className={`fas ${strategyCopyStatus ? 'fa-check' : 'fa-copy'} ${strategyCopyStatus ? 'text-[#e2b07e]' : ''}`}></i>
              {strategyCopyStatus ? 'Intelligence Copied' : 'Copy Strategy'}
            </button>
          </div>

          {data.sources && data.sources.length > 0 && (
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <i className="fas fa-globe"></i> Research Sources
               </h3>
               <div className="space-y-3">
                 {data.sources.slice(0, 5).map((source, i) => (
                   <a 
                     key={i} 
                     href={source.uri} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-50 rounded-2xl hover:border-[#e2b07e]/40 transition-all"
                   >
                     <span className="text-xs font-bold text-slate-600 truncate mr-4">{source.title}</span>
                     <i className="fas fa-external-link-alt text-[10px] text-slate-300 group-hover:text-[#e2b07e] transition-colors"></i>
                   </a>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-10 md:p-20 border-[3px] border-[#e2b07e]/20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none [background-image:radial-gradient(#e2b07e_1px,transparent_1px)] [background-size:20px_20px]"></div>
         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8 relative z-10">
            <div>
              <span className="text-[#e2b07e] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">SEO Architecture</span>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Topical Authority <span className="text-[#e2b07e]">Clusters</span></h3>
              <p className="text-slate-400 font-medium text-lg max-w-xl">Engineer your site hierarchy around these semantic hubs to achieve absolute niche dominance.</p>
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-gradient-to-r from-[#e2b07e] to-[#b3875e] text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">Full Analytics</div>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {data.clusters.map((cluster, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:border-[#e2b07e]/40 transition-all group">
                <div className="w-12 h-12 bg-[#e2b07e]/10 text-[#e2b07e] rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <i className="fas fa-cubes text-xl"></i>
                </div>
                <h4 className="text-2xl font-black text-white mb-8 leading-tight">{cluster.name}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {cluster.keywords.map((kw, j) => (
                    <button 
                      key={j} 
                      onClick={() => onKeywordClick(kw)}
                      className="px-4 py-2 bg-white/5 hover:bg-[#e2b07e] hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default KeywordResults;