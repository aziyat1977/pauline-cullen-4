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