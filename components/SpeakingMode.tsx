import React, { useState, useRef, useEffect } from 'react';
import { checkSpeaking } from '../services/geminiService';
import { Mic, Square, Loader2, Volume2, Info, Download, Trash2, Sparkles, Save, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA_PIE } from '../constants';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface Recording {
  id: string;
  url: string;
  blob: Blob;
  timestamp: number;
  label: string;
  feedback: string | null;
  mimeType: string;
}

const SpeakingMode: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [duration, setDuration] = useState(0);

  // Cleanup on unmount to prevent "stuck" recordings
  useEffect(() => {
    return () => {
      stopRecordingCleanup();
    };
  }, []);

  const stopRecordingCleanup = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Stop recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.error("Error stopping recorder:", e);
      }
    }

    // Stop all tracks on the stream explicitly
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    try {
      // Ensure previous session is clean
      stopRecordingCleanup();
      chunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        // Fallback for Safari which often doesn't report mimeType on the recorder instance immediately
        const mimeType = recorder.mimeType || 'audio/mp4'; 
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const newRecording: Recording = {
          id: Date.now().toString(),
          url,
          blob,
          timestamp: Date.now(),
          label: `Take ${recordings.length + 1}`,
          feedback: null,
          mimeType
        };
        
        setRecordings(prev => [newRecording, ...prev]);
        chunksRef.current = [];
        setDuration(0);
      };

      recorder.start();
      setIsRecording(true);
      
      const startTime = Date.now();
      timerRef.current = window.setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is needed for this feature. Please check your browser settings.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    
    // UI update first for responsiveness
    setIsRecording(false);
    stopRecordingCleanup();
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
  };

  const downloadRecording = (recording: Recording) => {
    // Guess extension based on mimeType
    let ext = 'webm';
    if (recording.mimeType.includes('mp4')) ext = 'mp4';
    else if (recording.mimeType.includes('ogg')) ext = 'ogg';
    else if (recording.mimeType.includes('wav')) ext = 'wav';

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = recording.url;
    a.download = `introvert-ielts-${recording.label.toLowerCase().replace(' ', '-')}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getFeedback = async (recording: Recording) => {
    setAnalyzingId(recording.id);
    const reader = new FileReader();
    reader.readAsDataURL(recording.blob);
    reader.onloadend = async () => {
      // The result looks like "data:audio/webm;base64,..."
      // We need just the base64 part.
      const resultString = reader.result as string;
      const base64Audio = resultString.split(',')[1];
      
      const result = await checkSpeaking(base64Audio, recording.mimeType, "Household Expenditure Pie Chart");
      
      setRecordings(prev => prev.map(r => 
        r.id === recording.id ? { ...r, feedback: result } : r
      ));
      setAnalyzingId(null);
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 h-full flex flex-col">
      <div className="text-center mb-8 flex-shrink-0">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">Private Speaking Corner</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Record as many takes as you need. Listen back, save the good ones, and only ask for AI feedback when you feel ready. No pressure.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Left: The Prompt (Sticky) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100 flex-1 flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-700">Topic: Describe this chart</h3>
                <span className="bg-zen-100 text-zen-700 px-3 py-1 rounded-full text-xs font-bold">Part 1 Task</span>
             </div>
             
             {/* Fixed height container to prevent Recharts warning */}
             <div className="h-64 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHART_DATA_PIE}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CHART_DATA_PIE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-slate-400 font-bold text-xs">Expenditure</span>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-2 w-full mt-6 text-sm text-slate-500">
                {CHART_DATA_PIE.map((d, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: COLORS[i]}}></span>
                    {d.name}: {d.value}
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-2xl flex items-start text-blue-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <p>Introvert Tip: It's okay to pause. The best speakers take their time to think. Try recording a version where you speak slower than usual.</p>
           </div>
        </div>

        {/* Right: Recording Interface */}
        <div className="lg:col-span-7 flex flex-col space-y-6 min-h-0">
           
           {/* Recorder Control */}
           <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center flex-shrink-0 transition-all duration-300 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-slate-100`}>
                 <div className="h-full bg-red-500 transition-all duration-1000" style={{width: isRecording ? '100%' : '0%'}}></div>
              </div>

              <div className="text-center mb-6">
                 <div className={`text-4xl font-mono font-bold transition-colors ${isRecording ? 'text-red-500' : 'text-slate-300'}`}>
                    {formatTime(duration)}
                 </div>
              </div>

              <div className={`relative mb-2 transition-all duration-300 ${isRecording ? 'scale-110' : 'scale-100'}`}>
                <div className={`absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-20 animate-pulse ${isRecording ? 'block' : 'hidden'}`}></div>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gradient-to-br from-zen-500 to-zen-600 text-white hover:shadow-zen-300/50 hover:scale-105'
                  }`}
                >
                  {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>
              <p className="text-slate-400 font-bold text-sm mt-4 uppercase tracking-widest">
                {isRecording ? "Recording..." : "Tap to Record"}
              </p>
           </div>

           {/* Takes List */}
           <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
              {recordings.length === 0 && !isRecording && (
                <div className="text-center py-10 opacity-40">
                   <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Save className="w-6 h-6 text-slate-400" />
                   </div>
                   <p className="text-slate-500 font-medium">Your saved takes will appear here</p>
                </div>
              )}

              {recordings.map((recording) => (
                <div key={recording.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow animate-slide-up">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                         <div className="bg-zen-100 text-zen-700 font-bold px-3 py-1 rounded-lg text-sm mr-3">
                            {recording.label}
                         </div>
                         <span className="text-xs text-slate-400 font-medium">
                           {new Date(recording.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </span>
                      </div>
                      <div className="flex items-center space-x-2">
                         <button 
                           onClick={() => downloadRecording(recording)}
                           title="Download Audio"
                           className="p-2 text-slate-400 hover:text-zen-600 hover:bg-zen-50 rounded-full transition-colors"
                         >
                            <Download className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={() => deleteRecording(recording.id)}
                           title="Delete Take"
                           className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                         >
                            <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                   </div>

                   {/* Audio Player */}
                   <div className="bg-slate-50 rounded-xl p-2 mb-4">
                      <audio src={recording.url} controls className="w-full h-8 opacity-80" />
                   </div>

                   {/* AI Action Area */}
                   {recording.feedback ? (
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                         <h4 className="text-green-800 font-bold text-sm mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" /> Feedback Received
                         </h4>
                         <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                            {recording.feedback}
                         </p>
                      </div>
                   ) : (
                      <button 
                        onClick={() => getFeedback(recording)}
                        disabled={analyzingId === recording.id}
                        className="w-full py-3 rounded-xl border-2 border-dashed border-zen-200 text-zen-500 font-bold hover:bg-zen-50 hover:border-zen-300 transition-all flex items-center justify-center text-sm disabled:opacity-50"
                      >
                         {analyzingId === recording.id ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                         ) : (
                            <><Sparkles className="w-4 h-4 mr-2" /> Analyze this take</>
                         )}
                      </button>
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingMode;