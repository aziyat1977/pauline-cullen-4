import React from 'react';
import { QuizQuestion, LessonSection, IELTSTask } from './types';

// --- AUTHENTIC IELTS TASKS DATA ---

export const IELTS_TASKS: IELTSTask[] = [
  {
    id: 'task-1-line-spreads',
    type: 'line',
    title: 'Consumption of Spreads',
    prompt: 'The graph shows the consumption of three types of spreads (Margarine, Low Fat, Butter) between 1981 and 2007.',
    config: { unit: 'Grams' },
    data: [
      { name: '1981', Butter: 140, Margarine: 90, 'Low Fat': 10 },
      { name: '1986', Butter: 110, Margarine: 95, 'Low Fat': 25 },
      { name: '1991', Butter: 75, Margarine: 100, 'Low Fat': 40 },
      { name: '1996', Butter: 50, Margarine: 60, 'Low Fat': 75 },
      { name: '2001', Butter: 45, Margarine: 40, 'Low Fat': 80 },
      { name: '2007', Butter: 40, Margarine: 35, 'Low Fat': 70 },
    ]
  },
  {
    id: 'task-2-bar-transport',
    type: 'bar',
    title: 'Modes of Transport to Work',
    prompt: 'The chart shows the percentage of people using different modes of transport in a European city in 1960, 1980, and 2000.',
    data: [
      { name: 'Car', '1960': 5, '1980': 25, '2000': 50 },
      { name: 'Bus', '1960': 40, '1980': 20, '2000': 15 },
      { name: 'Bike', '1960': 35, '1980': 30, '2000': 10 },
      { name: 'Walk', '1960': 20, '1980': 25, '2000': 25 },
    ]
  },
  {
    id: 'task-3-pie-energy',
    type: 'pie',
    title: 'Energy Production by Fuel',
    prompt: 'The pie chart illustrates the breakdown of electricity generation by fuel source in France in 2020.',
    data: [
      { name: 'Nuclear', value: 67 },
      { name: 'Renewables', value: 24 },
      { name: 'Fossil Fuels', value: 9 },
    ]
  },
  {
    id: 'task-4-mixed-climate',
    type: 'mixed',
    title: 'Climate Data',
    prompt: 'The graph shows average rainfall and temperature for a tropical city over a year.',
    data: [
      { name: 'Jan', rain: 300, temp: 28 },
      { name: 'Feb', rain: 280, temp: 28 },
      { name: 'Mar', rain: 200, temp: 29 },
      { name: 'Apr', rain: 150, temp: 30 },
      { name: 'May', rain: 100, temp: 31 },
      { name: 'Jun', rain: 50, temp: 30 },
      { name: 'Jul', rain: 20, temp: 29 },
      { name: 'Aug', rain: 20, temp: 29 },
      { name: 'Sep', rain: 60, temp: 29 },
      { name: 'Oct', rain: 150, temp: 28 },
      { name: 'Nov', rain: 250, temp: 27 },
      { name: 'Dec', rain: 320, temp: 27 },
    ]
  },
  {
    id: 'task-5-table-subway',
    type: 'table',
    title: 'Underground Railways',
    prompt: 'The table below gives information about the underground railway systems in six cities.',
    data: [
      { name: 'London', Opened: 1863, KM: 394, Passengers: 775 },
      { name: 'Paris', Opened: 1900, KM: 199, Passengers: 1191 },
      { name: 'Tokyo', Opened: 1927, KM: 155, Passengers: 1927 },
      { name: 'Washington', Opened: 1976, KM: 126, Passengers: 144 },
      { name: 'Kyoto', Opened: 1981, KM: 11, Passengers: 45 },
      { name: 'Los Angeles', Opened: 2001, KM: 28, Passengers: 50 },
    ]
  },
  {
    id: 'task-6-map-island',
    type: 'map',
    title: 'Island Development',
    prompt: 'The maps show an island before and after the construction of tourist facilities.',
    data: [
      {
        year: 'Before',
        features: [
          { id: '1', x: 20, y: 30, type: 'nature', label: 'Palm Trees' },
          { id: '2', x: 80, y: 30, type: 'nature', label: 'Palm Trees' },
          { id: '3', x: 50, y: 50, type: 'nature', label: 'Beach' },
        ]
      },
      {
        year: 'After',
        features: [
          { id: '1', x: 20, y: 20, type: 'building', label: 'Hotel Complex' },
          { id: '2', x: 80, y: 30, type: 'building', label: 'Huts' },
          { id: '3', x: 50, y: 60, type: 'road', label: 'Pier' },
          { id: '4', x: 50, y: 40, type: 'building', label: 'Restaurant' },
        ]
      }
    ]
  },
  {
    id: 'task-7-process-salmon',
    type: 'process',
    title: 'Life Cycle of a Salmon',
    prompt: 'The diagram shows the life cycle of the salmon species.',
    data: [
      { step: 1, label: 'Eggs', description: 'Laid in upper river (slow moving)' },
      { step: 2, label: 'Fry', description: 'Small fish (3-8 cm) live in lower river' },
      { step: 3, label: 'Smolt', description: 'Migrate to open sea (12-15 cm)' },
      { step: 4, label: 'Adult', description: 'Grow to full size (70-76 cm) in ocean' },
      { step: 5, label: 'Spawning', description: 'Return to river to lay eggs' },
    ]
  },
  {
    id: 'task-8-process-brick',
    type: 'process',
    title: 'Brick Manufacturing',
    prompt: 'The process by which bricks are manufactured for the building industry.',
    data: [
      { step: 1, label: 'Excavation', description: 'Clay dug by digger' },
      { step: 2, label: 'Sifting', description: 'Metal grid separates rocks' },
      { step: 3, label: 'Moulding', description: 'Clay mixed with sand + water' },
      { step: 4, label: 'Drying', description: 'Oven for 24-48 hours' },
      { step: 5, label: 'Firing', description: 'Kiln (200C - 1300C)' },
      { step: 6, label: 'Packaging', description: 'Delivery to site' },
    ]
  },
  {
    id: 'task-9-map-village',
    type: 'map',
    title: 'Village Change',
    prompt: 'The village of Chorleywood in 1995 and 2010.',
    data: [
      {
        year: '1995',
        features: [
          { id: '1', x: 30, y: 30, type: 'nature', label: 'Farmland' },
          { id: '2', x: 70, y: 30, type: 'nature', label: 'Forest' },
          { id: '3', x: 50, y: 50, type: 'building', label: 'Small Shops' },
        ]
      },
      {
        year: '2010',
        features: [
          { id: '1', x: 30, y: 30, type: 'building', label: 'Golf Course' },
          { id: '2', x: 70, y: 30, type: 'nature', label: 'Park' },
          { id: '3', x: 50, y: 50, type: 'building', label: 'Supermarket' },
          { id: '4', x: 50, y: 70, type: 'road', label: 'Car Park' },
        ]
      }
    ]
  },
  {
    id: 'task-10-process-hydro',
    type: 'process',
    title: 'Hydroelectric Power',
    prompt: 'How electricity is generated in a hydroelectric power station.',
    data: [
      { step: 1, label: 'Reservoir', description: 'Water stored behind dam' },
      { step: 2, label: 'Intake', description: 'Valve opens during day' },
      { step: 3, label: 'Flow', description: 'Water flows down penstock' },
      { step: 4, label: 'Turbine', description: 'Water spins the turbine' },
      { step: 5, label: 'Generator', description: 'Creates electricity' },
      { step: 6, label: 'Grid', description: 'Power lines to city' },
    ]
  }
];

// --- LESSON DATA ---

const textSlide = (...lines: string[]) => ({
  type: 'text' as const,
  content: lines.filter(l => l !== "")
});

export const LESSON_DATA: LessonSection[] = [
  {
    title: "Intro: Line Graphs",
    slides: [
      textSlide("Let's look at a classic IELTS Task 1: The 'Consumption of Spreads'.", "Notice the time period (1981-2007) and the units (grams).", "What is the most striking feature?"),
      {
        type: 'exercise',
        visualTask: IELTS_TASKS[0], // Spreads line graph
        exercise: {
          id: 'ex-line-overview',
          type: 'multiple-choice',
          question: 'What is the main trend for Butter?',
          options: ['It fluctuated wildly', 'It declined significantly', 'It remained stable'],
          answer: 'It declined significantly',
          explanation: "Looking at the purple line, it drops from 140g to roughly 40g."
        }
      },
      textSlide("Writing the Overview", "For this graph, the overview should mention:", "1. The decline of Butter and Margarine.", "2. The rise of Low Fat spreads."),
      {
        type: 'exercise',
        visualTask: IELTS_TASKS[0],
        exercise: {
          id: 'ex-line-gap',
          type: 'gap-fill',
          question: 'Overall, the consumption of butter and margarine ____, while low fat spreads became more popular.',
          options: ['increased', 'decreased', 'stabilized'],
          answer: 'decreased',
          explanation: "Both major traditional spreads went down."
        }
      }
    ]
  },
  {
    title: "Process: Life Cycles",
    slides: [
      textSlide("Process diagrams require 'Sequencers'.", "First, Next, Then, Finally.", "Let's look at the Salmon Life Cycle."),
      {
        type: 'exercise',
        visualTask: IELTS_TASKS[6], // Salmon
        exercise: {
          id: 'ex-proc-salmon-1',
          type: 'gap-fill',
          question: 'First, the salmon eggs are ____ in the upper river.',
          options: ['layed', 'laid', 'lied'],
          answer: 'laid',
          explanation: "Passive voice of 'lay' is 'laid'."
        }
      },
      {
        type: 'exercise',
        visualTask: IELTS_TASKS[6],
        exercise: {
          id: 'ex-proc-salmon-2',
          type: 'multiple-choice',
          question: 'What happens after the "Fry" stage?',
          options: ['They become Smolts', 'They spawn immediately', 'They die'],
          answer: 'They become Smolts',
          explanation: "Step 3 in the diagram is the Smolt stage."
        }
      }
    ]
  },
  {
    title: "Maps: Before & After",
    slides: [
      textSlide("Map tasks often show development.", "You need specific vocabulary:", "Constructed, Replaced, Extended, Removed."),
      {
        type: 'exercise',
        visualTask: IELTS_TASKS[5], // Island
        exercise: {
          id: 'ex-map-island',
          type: 'matching',
          question: 'What happened to the Palm Trees in the center?',
          options: ['They were chopped down', 'They were planted', 'They remained'],
          answer: 'They were chopped down',
          explanation: "In the 'After' map, the central trees are replaced by buildings."
        }
      }
    ]
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "In a line graph, if a line goes up and down many times, it...",
    options: ["Fluctuates", "Plummets", "Plateaus", "Soars"],
    correctIndex: 0
  },
  {
    id: 2,
    question: "For a process diagram, which tense is essential?",
    options: ["Passive Voice", "Past Continuous", "Future Perfect", "Conditionals"],
    correctIndex: 0
  }
];

export const CHART_DATA_PIE = [
  { name: 'Housing', value: 40 },
  { name: 'Food', value: 30 },
  { name: 'Transport', value: 20 },
  { name: 'Entertainment', value: 10 },
];
