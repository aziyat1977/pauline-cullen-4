import React, { useState } from 'react';
import { QUIZ_DATA } from '../constants';
import { Trophy, RefreshCcw, ArrowRight } from 'lucide-react';

const QuizMode: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === QUIZ_DATA[currentQuestion].correctIndex;
    
    // Auto advance after a gentle delay
    setTimeout(() => {
      if (isCorrect) setScore(s => s + 100);
      
      if (currentQuestion < QUIZ_DATA.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full border-4 border-zen-100">
          <div className="bg-yellow-100 p-6 rounded-full inline-block mb-6">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
          <p className="text-slate-500 mb-8">You scored {score} points. Amazing effort.</p>
          
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedOption(null);
            }}
            className="bg-zen-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-zen-600 transition-colors flex items-center justify-center w-full"
          >
            <RefreshCcw className="w-5 h-5 mr-2" /> Play Again
          </button>
        </div>
      </div>
    );
  }

  const question = QUIZ_DATA[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8 px-4">
        <div className="text-slate-400 font-bold">Question {currentQuestion + 1}/{QUIZ_DATA.length}</div>
        <div className="bg-zen-50 text-zen-600 px-4 py-1 rounded-full font-bold shadow-sm">
           Score: {score}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-slate-100 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-zen-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <h3 className="text-2xl font-bold text-slate-800 mb-10 text-center relative z-10 leading-snug">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 gap-4 relative z-10">
          {question.options.map((opt, idx) => {
            let btnClass = "bg-white border-2 border-slate-100 hover:border-zen-300 hover:bg-slate-50 text-slate-600";
            
            if (selectedOption !== null) {
              if (idx === question.correctIndex) {
                btnClass = "bg-green-100 border-green-200 text-green-800 font-bold";
              } else if (idx === selectedOption) {
                btnClass = "bg-red-50 border-red-100 text-red-800 opacity-50";
              } else {
                btnClass = "opacity-40 border-slate-100";
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 transform ${selectedOption === null ? 'hover:scale-[1.02] active:scale-95' : ''} ${btnClass} shadow-sm`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 text-sm font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizMode;
