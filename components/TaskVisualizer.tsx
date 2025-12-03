import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area
} from 'recharts';
import { IELTSTask, MapData, ProcessStep } from '../types';
import { ArrowRight, Settings, Droplets, Factory, Zap, Fish, Truck, Home, Trees, Building2 } from 'lucide-react';

interface TaskVisualizerProps {
  task: IELTSTask;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

// Helper for Maps
const RenderMap: React.FC<{ data: MapData[] }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {data.map((mapState, idx) => (
        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative overflow-hidden h-[300px]">
          <h4 className="font-bold text-center mb-4 text-slate-700 bg-white/80 backdrop-blur inline-block px-3 py-1 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 z-10 shadow-sm">
            {mapState.year}
          </h4>
          {/* Schematic Map Representation */}
          <div className="w-full h-full relative bg-[#e6f0e6] rounded-lg overflow-hidden">
            {/* River/Sea placeholder */}
            <div className="absolute bottom-0 w-full h-12 bg-blue-200 opacity-50 wave-pattern"></div>
            
            {mapState.features.map((feat) => (
              <div
                key={feat.id}
                className={`absolute flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-110 cursor-help group`}
                style={{
                  left: `${feat.x}%`,
                  top: `${feat.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`
                  p-2 rounded-lg shadow-md border-2
                  ${feat.type === 'building' ? 'bg-orange-50 border-orange-200' : ''}
                  ${feat.type === 'nature' ? 'bg-green-100 border-green-300' : ''}
                  ${feat.type === 'road' ? 'bg-slate-300 border-slate-400 h-2 w-20' : ''}
                `}>
                  {feat.type === 'building' && <Home className="w-5 h-5 text-orange-500" />}
                  {feat.type === 'nature' && <Trees className="w-5 h-5 text-green-600" />}
                </div>
                {feat.type !== 'road' && (
                  <span className="text-[10px] font-bold bg-white/90 px-1 rounded mt-1 shadow-sm whitespace-nowrap">
                    {feat.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper for Process
const RenderProcess: React.FC<{ steps: ProcessStep[] }> = ({ steps }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 h-full overflow-y-auto p-4">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm w-40 h-48 text-center relative hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-zen-100 text-zen-700 font-bold flex items-center justify-center mb-2 absolute top-2 right-2 text-xs">
              {step.step}
            </div>
            <div className="flex-1 flex items-center justify-center text-slate-400 mb-2">
               {/* Dynamic Icon Rendering based on simple heuristics or passed props could go here. For now, generic logic */}
               {step.label.toLowerCase().includes('water') ? <Droplets className="w-8 h-8 text-blue-400"/> :
                step.label.toLowerCase().includes('fish') ? <Fish className="w-8 h-8 text-orange-400"/> :
                step.label.toLowerCase().includes('energy') ? <Zap className="w-8 h-8 text-yellow-400"/> :
                step.label.toLowerCase().includes('factory') ? <Factory className="w-8 h-8 text-slate-500"/> :
                step.label.toLowerCase().includes('transport') ? <Truck className="w-8 h-8 text-red-400"/> :
                <Settings className="w-8 h-8 text-slate-300"/>}
            </div>
            <h4 className="font-bold text-sm text-slate-700 mb-1 leading-tight">{step.label}</h4>
            <p className="text-xs text-slate-500 leading-snug">{step.description}</p>
          </div>
          {idx < steps.length - 1 && (
            <ArrowRight className="w-6 h-6 text-slate-300 flex-shrink-0 transform rotate-90 md:rotate-0 my-2 md:my-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Extracted Container to avoid re-definition and TS errors
const VisualizerContainer: React.FC<{ children: React.ReactNode; taskType: string }> = ({ children, taskType }) => (
  <div className="w-full h-[350px] min-h-[350px] bg-white rounded-xl p-4 border border-slate-100 shadow-sm relative">
    <div className="absolute top-2 right-2 text-xs font-bold text-slate-300 uppercase tracking-widest pointer-events-none z-10">
      {taskType}
    </div>
    {children}
  </div>
);

const TaskVisualizer: React.FC<TaskVisualizerProps> = ({ task }) => {

  if (task.type === 'process') {
    return <VisualizerContainer taskType={task.type}><RenderProcess steps={task.data} /></VisualizerContainer>;
  }

  if (task.type === 'map') {
    return <VisualizerContainer taskType={task.type}><RenderMap data={task.data} /></VisualizerContainer>;
  }

  if (task.type === 'table') {
    return (
      <VisualizerContainer taskType={task.type}>
        <div className="w-full h-full overflow-auto custom-scrollbar">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 rounded-tl-lg">Category</th>
                {Object.keys(task.data[0]).filter(k => k !== 'name').map(key => (
                  <th key={key} className="px-6 py-3">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {task.data.map((row: any, i: number) => (
                <tr key={i} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                  {Object.keys(row).filter(k => k !== 'name').map(key => (
                    <td key={key} className="px-6 py-4">{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VisualizerContainer>
    );
  }

  return (
    <VisualizerContainer taskType={task.type}>
      <ResponsiveContainer width="100%" height="100%">
        {task.type === 'line' ? (
          <LineChart data={task.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
            <YAxis fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} label={{ value: task.config?.unit || '', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#94a3b8'} }}/>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            {Object.keys(task.data[0]).filter(k => k !== 'name').map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={3} dot={{r: 4, strokeWidth: 0}} activeDot={{r: 6}} />
            ))}
          </LineChart>
        ) : task.type === 'bar' ? (
          <BarChart data={task.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
            <YAxis fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            {Object.keys(task.data[0]).filter(k => k !== 'name').map((key, i) => (
              <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : task.type === 'mixed' ? (
          <ComposedChart data={task.data}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
             <XAxis dataKey="name" fontSize={12} />
             <YAxis yAxisId="left" fontSize={12} orientation="left" stroke="#8884d8" />
             <YAxis yAxisId="right" fontSize={12} orientation="right" stroke="#ff7300" />
             <Tooltip />
             <Legend />
             <Bar yAxisId="left" dataKey="rain" fill="#8884d8" name="Rainfall (mm)" />
             <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#ff7300" name="Temp (°C)" strokeWidth={3} />
          </ComposedChart>
        ) : (
          <PieChart>
            <Pie
              data={task.data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {task.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </VisualizerContainer>
  );
};

export default TaskVisualizer;
