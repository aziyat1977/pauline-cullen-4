import React from 'react';

export enum AppMode {
  LEARN = 'LEARN',
  KAHOOT = 'KAHOOT',
  SIMULATION = 'SIMULATION',
  SPEAKING = 'SPEAKING',
  CHAT = 'CHAT',
}

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export type TaskType = 'line' | 'bar' | 'pie' | 'table' | 'mixed' | 'map' | 'process';

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface MapFeature {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'building' | 'nature' | 'road';
  size?: number; // scale factor
}

export interface MapData {
  year: number | string;
  features: MapFeature[];
}

export interface ProcessStep {
  step: number;
  label: string;
  description: string;
  icon?: string; // lucide icon name
}

export interface IELTSTask {
  id: string;
  type: TaskType;
  title: string;
  prompt: string;
  data: any; // Flexible to accommodate charts, maps (array of MapData), or process steps
  config?: {
    colors?: string[];
    xLabel?: string;
    yLabel?: string;
    unit?: string;
  };
}

export interface ExerciseItem {
  id: string;
  question: string;
  type: 'gap-fill' | 'matching' | 'drag-drop' | 'multiple-choice';
  options?: string[];
  answer: string | string[];
  explanation?: string;
  media?: React.ReactNode;
}

export interface Slide {
  type: 'text' | 'exercise';
  content?: string[]; // Max 3 lines
  exercise?: ExerciseItem;
  visualTask?: IELTSTask; // If the slide needs to show a graph
}

export interface LessonSection {
  title: string;
  slides: Slide[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}