import React, { useState } from 'react';
import { checkWriting } from '../services/geminiService';
import { IELTS_TASKS } from '../constants';
import TaskVisualizer from './TaskVisualizer';
import { Sparkles, Send, Clock, Menu, PenTool, LayoutTemplate } from 'lucide-react';

const SimulationMode: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(IELTS_TASKS[0].id);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListOpen, setIsListOpen] = useState(true); // Mobile toggle for task list

  const activeTask = IELTS_TASKS.find(t => t.id === selectedTaskId) || IELTS_TASKS[0];

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setFeedback(null);
    
    // Send the prompt context to the AI so it knows what chart the user is describing
    const promptContext = `Task Type: ${activeTask.type}. Prompt: ${activeTask.prompt}`;
    
    const result = await checkWriting(text, promptContext);
    setFeedback(result);
    setIsLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 max-w-7xl mx-auto py-4">
      
      {/* Sidebar Task List */}
      <div className={`${isListOpen ? 'w-64' : 'w-16'} bg-white rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 flex flex-col overflow-hidden flex-shrink-0`}>
         <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            {isListOpen && <h3 className="font-bold text-slate-700 whitespace-nowrap">Task Library</h3>}
            <button onClick={() => setIsListOpen(!isListOpen)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
               <LayoutTemplate className="w-5 h-5" />
            </button>
         </div>
         <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {IELTS_TASKS.map(task => (
              <button
                key={task.id}
                onClick={() => {
                  setSelectedTaskId(task.id);
                  setText('');
                  setFeedback(null);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center group ${
                  selectedTaskId === task.id 
                    ? 'bg-zen-50 text-zen-700 border-zen-200 border shadow-sm' 
                    : 'hover:bg-slate-50 text-slate-500 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                   selectedTaskId === task.id ? 'bg-white text-zen-600' : 'bg-slate-100 text-slate-400 group-hover:bg-white'
                }`}>
                   <span className="text-xs font-bold uppercase">{task.type.slice(0, 2)}</span>
                </div>
                {isListOpen && (
                  <div className="truncate">
                    <div className="font-bold text-sm truncate">{task.title}</div>
                    <div className="text-[10px] opacity-70 uppercase tracking-wider">{task.type}</div>
                  </div>
                )}
              </button>
            ))}
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Task Viewer (Left/Top) */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar pr-2 min-h-[300px]">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                 {activeTask.type} Task
              </span>
              <div className="flex items-center text-orange-400 text-xs font-bold">
                <Clock className="w-4 h-4 mr-1" /> 20 min
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">{activeTask.title}</h2>
            <p className="text-slate-600 text-sm mb-6 italic border-l-4 border-zen-200 pl-4 py-1">
              "{activeTask.prompt}"
            </p>

            <div className="w-full">
               <TaskVisualizer task={activeTask} />
            </div>
          </div>
        </div>

        {/* Writing Area (Right/Bottom) */}
        <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
             <div className="flex items-center">
                <PenTool className="w-4 h-4 mr-2 text-zen-500" />
                <span className="text-sm font-bold text-slate-600">Your Response</span>
             </div>
             <span className="text-xs text-slate-400 font-mono">{text.split(/\s+/).filter(w => w).length} words</span>
          </div>
          
          <textarea
            className="flex-1 w-full p-6 outline-none resize-none text-slate-700 leading-relaxed text-base bg-transparent font-serif"
            placeholder="Summarise the information by selecting and reporting the main features..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {feedback && (
             <div className="h-64 overflow-y-auto bg-zen-50 p-6 border-t border-zen-100 animate-slide-up custom-scrollbar">
                <h4 className="font-bold text-zen-800 mb-2 flex items-center text-sm uppercase tracking-wide">
                   <Sparkles className="w-4 h-4 mr-2" /> Analysis
                </h4>
                <div className="prose prose-sm prose-slate max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-slate-600 text-sm">{feedback}</pre>
                </div>
             </div>
          )}
          
          <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !text}
              className="bg-zen-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-zen-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-zen-200 transform hover:-translate-y-1 active:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Submit for Feedback
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimulationMode;