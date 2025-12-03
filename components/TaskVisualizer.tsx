import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { IELTSTask, MapData, ProcessStep } from '../types';
import { 
  ArrowRight, ArrowDown, Droplets, Factory, Zap, Fish, Truck, Home, 
  Trees, Ship, ShoppingCart, MapPin, Settings, Briefcase, Anchor
} from 'lucide-react';

interface TaskVisualizerProps {
  task: IELTSTask;
}

// Zen Palette matches index.html theme
const COLORS = ['#0ea5e9', '#a855f7', '#f59e0b', '#ef4444', '#10b981', '#ec4899'];

// --- Helpers ---

const getIconForLabel = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('water') || l.includes('river') || l.includes('sea') || l.includes('ocean')) return <Droplets className="w-6 h-6 text-sky-500" />;
  if (l.includes('fish') || l.includes('salmon') || l.includes('fry') || l.includes('smolt')) return <Fish className="w-6 h-6 text-orange-500" />;
  if (l.includes('elect') || l.includes('power') || l.includes('grid') || l.includes('turbine') || l.includes('generator')) return <Zap className="w-6 h-6 text-yellow-500" />;
  if (l.includes('factory') || l.includes('indust') || l.includes('manufact') || l.includes('plant')) return <Factory className="w-6 h-6 text-slate-500" />;
  if (l.includes('trans') || l.includes('car') || l.includes('deliv') || l.includes('road') || l.includes('excavation')) return <Truck className="w-6 h-6 text-red-500" />;
  if (l.includes('shop') || l.includes('market') || l.includes('supermarket')) return <ShoppingCart className="w-6 h-6 text-purple-500" />;
  if (l.includes('tree') || l.includes('forest') || l.includes('park') || l.includes('farm') || l.includes('palm') || l.includes('wood')) return <Trees className="w-6 h-6 text-green-600" />;
  if (l.includes('pier') || l.includes('port') || l.includes('dock')) return <Anchor className="w-6 h-6 text-blue-700" />;
  if (l.includes('hotel') || l.includes('house') || l.includes('village') || l.includes('hut') || l.includes('restaurant')) return <Home className="w-6 h-6 text-orange-600" />;
  if (l.includes('office') || l.includes('building') || l.includes('facility')) return <Briefcase className="w-6 h-6 text-slate-600" />;
  if (l.includes('equipment') || l.includes('mould') || l.includes('oven') || l.includes('kiln') || l.includes('intake')) return <Settings className="w-6 h-6 text-slate-400" />;
  return <MapPin className="w-6 h-6 text-slate-400" />;
};

// --- Renderers ---

const RenderMap: React.FC<{ data: MapData[] }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full pb-4">
      {data.map((mapState, idx) => (
        <div key={idx} className="flex flex-col h-full">
          <div className="flex items-center justify-center mb-4">
             <span className="bg-slate-100 border border-slate-200 px-6 py-2 rounded-full text-sm font-bold text-slate-700 shadow-sm uppercase tracking-wide">
               {mapState.year}
             </span>
          </div>
          <div className="relative w-full aspect-square md:aspect-[4/3] bg-emerald-50/30 rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Decorative Map Background */}
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />
            
            {/* Abstract Coastline/Terrain decoration */}
            <div className="absolute bottom-0 right-0 w-2/3 h-1/3 bg-blue-100/40 rounded-tl-[100%] blur-3xl"></div>
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-green-100/40 rounded-br-[100%] blur-3xl"></div>

            {/* Features */}
            {mapState.features.map((feat) => (
              <div
                key={feat.id}
                className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20 transition-transform duration-300 hover:scale-110 cursor-help"
                style={{ left: `${feat.x}%`, top: `${feat.y}%` }}
              >
                <div 
                  className={`
                    p-3 rounded-2xl shadow-lg border-2
                    ${feat.type === 'building' ? 'bg-white border-orange-100' : 
                      feat.type === 'nature' ? 'bg-white border-green-100' : 
                      'bg-white border-slate-100'}
                  `}
                >
                  {getIconForLabel(feat.label)}
                </div>
                {feat.label && (
                  <div className="mt-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold text-slate-600 border border-slate-200 shadow-md whitespace-nowrap text-center max-w-[120px] truncate">
                    {feat.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const RenderProcess: React.FC<{ steps: ProcessStep[] }> = ({ steps }) => {
  return (
    <div className="w-full py-8 px-2">
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-4">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            {/* Step Card */}
            <div className="flex-1 min-w-[140px] max-w-full md:max-w-[180px] bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-zen-200 transition-all flex flex-col items-center text-center relative group">
              <div className="absolute -top-3 bg-zen-50 text-zen-600 border-2 border-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm group-hover:bg-zen-500 group-hover:text-white transition-colors">
                {step.step}
              </div>
              
              <div className="mt-4 mb-3 p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {getIconForLabel(step.label)}
              </div>
              
              <h4 className="font-bold text-slate-700 text-sm mb-2 leading-tight">{step.label}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{step.description}</p>
            </div>

            {/* Arrow Connector */}
            {idx < steps.length - 1 && (
              <div className="flex items-center justify-center text-slate-300 py-1 md:py-0">
                <ArrowDown className="md:hidden w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
                <ArrowRight className="hidden md:block w-6 h-6" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const RenderTable: React.FC<{ data: any[] }> = ({ data }) => {
  const headers = Object.keys(data[0]).filter(k => k !== 'name');
  
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-4 ring-slate-50">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 font-bold tracking-wider">Category</th>
              {headers.map(key => (
                <th key={key} className="px-6 py-5 font-bold tracking-wider text-right">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, i) => (
              <tr key={i} className="bg-white hover:bg-zen-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">{row.name}</td>
                {headers.map(key => (
                  <td key={key} className="px-6 py-4 text-slate-600 font-medium tabular-nums text-right">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Component ---

interface WrapperProps {
  children: React.ReactNode;
  heightClass?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, heightClass }) => (
  <div className={`w-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative ${heightClass || ''}`}>
    {children}
  </div>
);

const TaskVisualizer: React.FC<TaskVisualizerProps> = ({ task }) => {
  
  // 1. Process Diagram
  if (task.type === 'process') {
    return (
      <Wrapper>
        <RenderProcess steps={task.data} />
      </Wrapper>
    );
  }

  // 2. Maps
  if (task.type === 'map') {
    return (
      <Wrapper>
        <RenderMap data={task.data} />
      </Wrapper>
    );
  }

  // 3. Tables
  if (task.type === 'table') {
    return (
      <Wrapper>
        <RenderTable data={task.data} />
      </Wrapper>
    );
  }

  // 4. Charts (Line, Bar, Pie, Mixed)
  const chartKeys = task.data && task.data.length > 0 ? Object.keys(task.data[0]).filter(k => k !== 'name' && k !== 'rain' && k !== 'temp') : [];
  
  // Custom height for different charts to ensure visibility
  const chartHeight = "h-[400px] sm:h-[450px]";

  return (
    <Wrapper heightClass={chartHeight}>
      <ResponsiveContainer width="100%" height="100%">
        {task.type === 'line' ? (
          <LineChart data={task.data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={{fontSize: 12, fill: '#64748b', fontWeight: 500}} 
              tickLine={false} 
              axisLine={false} 
              dy={15} 
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{fontSize: 12, fill: '#64748b'}} 
              tickLine={false} 
              axisLine={false} 
              label={{ value: task.config?.unit || '', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 12, textAnchor: 'middle' }, offset: 0 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
              itemStyle={{ fontSize: '13px', fontWeight: 600, padding: '2px 0' }}
              cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            />
            <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            {chartKeys.map((key, i) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={COLORS[i % COLORS.length]} 
                strokeWidth={4} 
                dot={{r: 5, strokeWidth: 3, fill: '#fff'}} 
                activeDot={{r: 7, strokeWidth: 0, fill: COLORS[i % COLORS.length]}} 
              />
            ))}
          </LineChart>

        ) : task.type === 'bar' ? (
          <BarChart data={task.data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={{fontSize: 12, fill: '#64748b', fontWeight: 500}} 
              tickLine={false} 
              axisLine={false} 
              dy={15} 
            />
            <YAxis stroke="#94a3b8" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            {chartKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[6, 6, 0, 0]} maxBarSize={50} />
            ))}
          </BarChart>

        ) : task.type === 'mixed' ? (
          <ComposedChart data={task.data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={{fontSize: 12, fill: '#64748b', fontWeight: 500}} 
              tickLine={false} 
              axisLine={false} 
              dy={15} 
            />
            {/* Left Axis for Rain */}
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="#8b5cf6" 
              tick={{fontSize: 12, fill: '#8b5cf6'}} 
              tickLine={false} 
              axisLine={false}
              label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', style: { fill: '#8b5cf6', fontSize: 11 }, offset: 10 }}
            />
            {/* Right Axis for Temp */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#f97316" 
              tick={{fontSize: 12, fill: '#f97316'}} 
              tickLine={false} 
              axisLine={false}
              label={{ value: 'Temp (°C)', angle: 90, position: 'insideRight', style: { fill: '#f97316', fontSize: 11 }, offset: 10 }}
            />
            <Tooltip 
               contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            
            <Bar yAxisId="left" dataKey="rain" name="Rainfall" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} fillOpacity={0.8} />
            <Line yAxisId="right" type="monotone" dataKey="temp" name="Temperature" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill:'#fff', strokeWidth:2, stroke:'#f97316'}} />
          </ComposedChart>

        ) : (
          <PieChart>
            <Pie
              data={task.data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {task.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
               itemStyle={{ color: '#334155', fontWeight: 600 }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        )}
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default TaskVisualizer;