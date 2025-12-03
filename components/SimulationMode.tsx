import React, { useState } from 'react';
import { checkWriting } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA_BAR } from '../constants';
import { Sparkles, Send, Clock, AlertCircle } from 'lucide-react';

const SimulationMode: React.FC = () => {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setFeedback(null);
    const result = await checkWriting(text, "Sales of Fairtrade coffee and bananas in 5 European countries");
    setFeedback(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 h-[calc(100vh-100px)]">
      
      {/* Left Column: The Task */}
      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Writing Task 1</h3>
            <div className="flex items-center text-orange-400 text-sm font-bold bg-orange-50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1" /> 20 min suggested
            </div>
          </div>
          
          <p className="text-slate-600 mb-6">
            The chart below gives information about sales of Fairtrade-labelled coffee and bananas in 1999 and 2004 in five European countries.
            <br/><br/>
            Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
          </p>

          <div className="h-64 w-full bg-slate-50 rounded-xl p-4 mb-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={CHART_DATA_BAR}>
                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="coffee" fill="#8884d8" radius={[4, 4, 0, 0]} name="Coffee" />
                 <Bar dataKey="bananas" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Bananas" />
               </BarChart>
             </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400">*Simplified Data for Demo</p>
        </div>
      </div>

      {/* Right Column: Writing Area */}
      <div className="flex flex-col h-full">
        <div className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden border border-slate-200">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
             <span className="text-sm font-bold text-slate-500">Your Workspace</span>
             <span className="text-xs text-slate-400">{text.split(' ').filter(w => w).length} words</span>
          </div>
          <textarea
            className="flex-1 w-full p-6 outline-none resize-none text-slate-700 leading-relaxed text-lg"
            placeholder="Start typing your answer here... Don't worry about mistakes, just let it flow."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !text}
              className="bg-zen-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-zen-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-zen-200"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Get Feedback
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Area */}
        {feedback && (
           <div className="mt-6 bg-white rounded-3xl p-6 shadow-xl border-l-8 border-zen-400 animate-slide-up">
             <h4 className="font-bold text-zen-800 mb-3 flex items-center">
               <Sparkles className="w-5 h-5 mr-2 text-zen-500" /> AI Feedback
             </h4>
             <div className="prose prose-sm prose-slate max-w-none">
               <pre className="whitespace-pre-wrap font-sans text-slate-600">{feedback}</pre>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default SimulationMode;
