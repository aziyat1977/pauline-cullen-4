import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import LessonContent from './components/LessonContent';
import QuizMode from './components/QuizMode';
import SimulationMode from './components/SimulationMode';
import SpeakingMode from './components/SpeakingMode';
import ChatMode from './components/ChatMode';
import { AppMode, UserRole } from './types';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.LEARN);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.LEARN:
        return <LessonContent role={role} setMode={setCurrentMode} />;
      case AppMode.KAHOOT:
        return <QuizMode />;
      case AppMode.SIMULATION:
        return <SimulationMode />;
      case AppMode.SPEAKING:
        return <SpeakingMode />;
      case AppMode.CHAT:
        return <ChatMode />;
      default:
        return <LessonContent role={role} setMode={setCurrentMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-zen-200 selection:text-zen-900">
      
      {/* Top Navbar (Minimalist) */}
      <header className="fixed top-0 left-0 w-full p-4 z-30 pointer-events-none">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="pointer-events-auto bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-sm border border-white/50 hover:bg-white hover:shadow-md transition-all group"
        >
          <Menu className="w-6 h-6 text-slate-600 group-hover:text-zen-600 transition-colors" />
        </button>
      </header>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentMode={currentMode}
        setMode={setCurrentMode}
        role={role}
        setRole={setRole}
      />

      {/* Main Content Area */}
      <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto h-screen overflow-y-auto pb-20 scroll-smooth">
        {renderContent()}
      </main>

      {/* Ambient Background Elements for 'Zen' feel */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-zen-100/40 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-gradient-to-tl from-lavender-100/40 to-transparent rounded-full blur-[80px]" />
      </div>

    </div>
  );
}

export default App;