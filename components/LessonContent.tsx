import React, { useState, useEffect } from 'react';
import { LESSON_DATA } from '../constants';
import { UserRole, AppMode } from '../types';
import { Check, ArrowRight, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';
import TaskVisualizer from './TaskVisualizer';

interface LessonContentProps {
  role: UserRole;
  setMode?: (mode: AppMode) => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ role, setMode }) => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveSlide(0);
  }, [activeModule]);

  const currentModule = LESSON_DATA[activeModule];
  const currentSlide = currentModule.slides[activeSlide];
  const isLastSlide = activeSlide === currentModule.slides.length - 1;
  const isFirstSlide = activeSlide === 0;

  const handleNext = () => {
    if (!isLastSlide) {
      setActiveSlide(prev => prev + 1);
    } else if (activeModule < LESSON_DATA.length - 1) {
      setActiveModule(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      setActiveSlide(prev => prev - 1);
    }
  };

  const handleExerciseAnswer = (exId: string, value: string, correct: string | string[]) => {
    setAnswers(prev => ({ ...prev, [exId]: value }));
    const isCorrect = Array.isArray(correct) ? correct.includes(value) : correct === value;
    setFeedback(prev => ({ ...prev, [exId]: isCorrect }));
  };

  return (
    <div className="h-full flex flex-col items-center justify-between pb-10 max-w-6xl mx-auto relative">
      
      {/* Module Navigation */}
      <div className="w-full flex justify-center gap-2 mb-6 overflow-x-auto p-2 no-scrollbar">
        {LESSON_DATA.map((mod, idx) => (
          <button
            key={idx}
            onClick={() => setActiveModule(idx)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              activeModule === idx 
                ? 'bg-zen-800 text-white shadow-lg scale-105' 
                : 'bg-white text-slate-400 hover:bg-slate-100'
            }`}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {/* Main Slide Card */}
      <div className="flex-1 w-full flex items-center justify-center p-2">
        <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border-4 border-white relative overflow-hidden flex flex-col transition-all duration-500">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 z-10">
            <div 
              className="h-full bg-zen-400 transition-all duration-300" 
              style={{ width: `${((activeSlide + 1) / currentModule.slides.length) * 100}%` }}
            />
          </div>

          <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
             
             {/* Content Side */}
             <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto custom-scrollbar">
                {currentSlide.type === 'text' && currentSlide.content && (
                   <div className="space-y-8 animate-fade-in">
                     {currentSlide.content.map((line, i) => (
                       <h2 
                        key={i} 
                        className={`font-sans font-bold text-slate-800 leading-tight ${
                           line.length < 40 ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
                        }`}
                       >
                         {line}
                       </h2>
                     ))}
                   </div>
                )}

                {currentSlide.type === 'exercise' && currentSlide.exercise && (
                  <div className="w-full animate-fade-in">
                    <span className="inline-block bg-zen-100 text-zen-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                      Practice Task
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-700 mb-8 leading-relaxed">
                      {currentSlide.exercise.question.split('____').map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                             <span className="inline-block w-24 border-b-4 border-slate-300 mx-2 text-zen-600 text-center">
                               {answers[currentSlide.exercise!.id] || "?"}
                             </span>
                          )}
                        </span>
                      ))}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {currentSlide.exercise.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleExerciseAnswer(currentSlide.exercise!.id, opt, currentSlide.exercise!.answer)}
                          className={`py-3 px-4 rounded-xl text-sm lg:text-base font-bold transition-all transform hover:scale-105 shadow-sm border ${
                            answers[currentSlide.exercise!.id] === opt
                              ? feedback[currentSlide.exercise!.id]
                                ? 'bg-green-500 text-white border-green-500'
                                : 'bg-red-400 text-white border-red-400'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:shadow-md'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {answers[currentSlide.exercise.id] && (
                      <div className={`p-4 rounded-xl inline-block w-full animate-slide-up ${feedback[currentSlide.exercise.id] ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {feedback[currentSlide.exercise.id] ? (
                          <div className="flex items-center font-bold"><Check className="w-5 h-5 mr-2"/> Correct!</div>
                        ) : (
                          <div className="flex items-center font-bold"><RefreshCw className="w-5 h-5 mr-2"/> Try Again</div>
                        )}
                        {currentSlide.exercise.explanation && feedback[currentSlide.exercise.id] && (
                          <p className="mt-2 text-sm opacity-90">{currentSlide.exercise.explanation}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
             </div>

             {/* Visual Side (if applicable) */}
             {currentSlide.visualTask && (
                <div className="w-full lg:w-1/2 bg-slate-50 p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-100">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 overflow-hidden">
                       <TaskVisualizer task={currentSlide.visualTask} />
                    </div>
                    <div className="text-center mt-4">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentSlide.visualTask.title}</p>
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center gap-8 mt-4">
        <button 
          onClick={handlePrev}
          disabled={isFirstSlide}
          className="p-4 rounded-full bg-white shadow-lg text-slate-400 hover:text-zen-600 disabled:opacity-30 disabled:shadow-none transition-all"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>

        <span className="text-slate-400 font-bold tracking-widest text-sm">
          {activeSlide + 1} / {currentModule.slides.length}
        </span>

        <button 
          onClick={handleNext}
          className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
            isLastSlide && activeModule === LESSON_DATA.length - 1
              ? 'bg-green-500 text-white shadow-green-200' 
              : 'bg-zen-600 text-white shadow-zen-200'
          }`}
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>
      
      {/* Floating Chat Button for Quick Access */}
      {setMode && (
        <button
          onClick={() => setMode(AppMode.CHAT)}
          className="fixed bottom-8 right-8 bg-zen-600 text-white p-4 rounded-full shadow-2xl hover:bg-zen-700 hover:scale-110 transition-all z-40 group"
          title="Talk to ZenBot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

    </div>
  );
};

export default LessonContent;