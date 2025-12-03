import React from 'react';
import { BookOpen, Gamepad2, PenTool, Mic, X, GraduationCap, User, MessageCircle } from 'lucide-react';
import { AppMode, UserRole } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentMode, setMode, role, setRole }) => {
  const menuItems = [
    { mode: AppMode.LEARN, label: 'Study Room', icon: BookOpen, desc: 'Learn at your own pace' },
    { mode: AppMode.KAHOOT, label: 'Quiz Zone', icon: Gamepad2, desc: 'Test yourself (No pressure)' },
    { mode: AppMode.SIMULATION, label: 'Simulation', icon: PenTool, desc: 'Practice writing tasks' },
    { mode: AppMode.SPEAKING, label: 'Speaking Corner', icon: Mic, desc: 'Private voice practice' },
    { mode: AppMode.CHAT, label: 'Zen Chat', icon: MessageCircle, desc: 'Talk to your AI tutor', isNew: true },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white/90 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-zen-900 font-sans tracking-tight">Introvert<span className="text-zen-500">IELTS</span></h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          <nav className="flex-1 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.mode}
                onClick={() => {
                  setMode(item.mode);
                  onClose();
                }}
                className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 group text-left relative ${currentMode === item.mode ? 'bg-zen-100 text-zen-800 shadow-sm' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <div className={`p-3 rounded-lg mr-4 ${currentMode === item.mode ? 'bg-white text-zen-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-zen-500'} transition-colors`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold flex items-center">
                    {item.label}
                    {item.isNew && (
                      <span className="ml-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-xs opacity-70 font-normal">{item.desc}</div>
                </div>
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t pt-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Role Switcher</div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setRole(UserRole.STUDENT)}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${role === UserRole.STUDENT ? 'bg-white shadow text-zen-700' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <User className="w-4 h-4 mr-2" /> Student
              </button>
              <button 
                onClick={() => setRole(UserRole.TEACHER)}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${role === UserRole.TEACHER ? 'bg-white shadow text-lavender-900' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <GraduationCap className="w-4 h-4 mr-2" /> Teacher
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;