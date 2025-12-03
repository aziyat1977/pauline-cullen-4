import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Chat } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatMode: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: "Hello there! I'm ZenBot, your calm study companion. How can I help you with your IELTS preparation today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session
    const initChat = async () => {
      try {
        if (!chatRef.current) {
          chatRef.current = createChatSession();
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages(prev => [...prev, { 
          id: 'error-init', 
          role: 'model', 
          text: "I'm having trouble connecting to my brain (the API). Please check your internet connection." 
        }]);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      if (!chatRef.current) {
        // Retry initialization if it failed or hasn't happened
        chatRef.current = createChatSession();
      }
      
      const response = await chatRef.current.sendMessage({ message: userMsg.text });
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: response.text || "I'm thinking..." 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: "I'm having a little trouble connecting right now. Can we try again?" 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col py-4">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm flex items-center z-10 sticky top-0">
           <div className="w-12 h-12 bg-gradient-to-br from-lavender-100 to-zen-100 rounded-full flex items-center justify-center mr-4 shadow-sm border border-white">
             <Bot className="w-7 h-7 text-zen-600" />
           </div>
           <div>
             <h3 className="font-bold text-slate-700 text-lg">Zen Chat</h3>
             <div className="flex items-center text-xs text-green-500 font-medium">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
               Online
             </div>
           </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-slate-50/30">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar */}
              {msg.role === 'model' && (
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm mb-1 overflow-hidden">
                   <Bot className="w-6 h-6 text-zen-500" />
                </div>
              )}

              <div 
                className={`max-w-[75%] rounded-2xl p-5 shadow-sm leading-relaxed text-[15px] ${
                  msg.role === 'user' 
                    ? 'bg-zen-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                }`}
              >
                 <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

               {/* User Avatar */}
               {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm mb-1">
                   <User className="w-6 h-6 text-slate-500" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
             <div className="flex items-end gap-3 justify-start animate-fade-in">
               <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm mb-1">
                   <Bot className="w-6 h-6 text-zen-500" />
                </div>
               <div className="bg-white border border-slate-100 rounded-2xl p-4 rounded-bl-none shadow-sm flex items-center space-x-2">
                 <div className="w-2 h-2 bg-zen-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                 <div className="w-2 h-2 bg-zen-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                 <div className="w-2 h-2 bg-zen-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
           <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-3xl border border-slate-200 focus-within:border-zen-300 focus-within:ring-4 focus-within:ring-zen-100 transition-all shadow-inner">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none focus:ring-0 p-3 max-h-32 resize-none text-slate-700 placeholder:text-slate-400 text-base"
                rows={1}
                style={{minHeight: '48px'}}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-zen-600 text-white rounded-full hover:bg-zen-700 disabled:opacity-50 disabled:hover:bg-zen-600 transition-colors shadow-lg shadow-zen-200 mb-1 mr-1"
              >
                <Send className="w-5 h-5" />
              </button>
           </div>
           <div className="text-center mt-2">
             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">AI Assistant • Zen Mode</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMode;