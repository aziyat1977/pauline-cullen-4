
import React from 'react';
import { QuizQuestion, LessonSection } from './types';

// Helper to create simple text slides
const textSlide = (...lines: string[]) => ({
  type: 'text' as const,
  content: lines.filter(l => l !== "")
});

export const LESSON_DATA: LessonSection[] = [
  {
    title: "The Intro Sentence",
    slides: [
      textSlide("In Task 1, speed is everything.", "The intro is your first impression.", "Don't let it waste your time."),
      textSlide("What is an intro sentence?", "It explains what we are looking at.", "It answers: What? Who? Where? When?"),
      textSlide("Crucially...", "This is NOT your overview.", "It is just the starting label."),
      textSlide("Example Question:", "The table shows coffee sales...", "...in five European countries."),
      textSlide("We must paraphrase this.", "Identify the 'What': Sales of coffee.", "Identify the 'Where': Europe."),
      {
        type: 'exercise',
        exercise: {
          id: 'ex-warmup-1',
          type: 'multiple-choice',
          question: 'What does the introductory sentence answers?',
          options: ['The main trends', 'What, Who, Where, When', 'The conclusion'],
          answer: 'What, Who, Where, When',
          explanation: "It strictly defines the parameters of the chart."
        }
      }
    ]
  },
  {
    title: "Paraphrasing Zen",
    slides: [
      textSlide("Do not copy the prompt.", "If you copy, you lose points.", "Change the structure naturally."),
      textSlide("The verb 'Show'", "It is okay to use 'show'.", "Don't force fancy synonyms."),
      textSlide("Avoid these words:", "'Display' (visuals only).", "'Present' (giving a gift)."),
      textSlide("Use these instead:", "'Illustrate'", "'Compare'", "'Give data on'"),
      textSlide("Grammar Magic", "Use relative clauses.", "Combine your facts."),
      {
        type: 'exercise',
        exercise: {
          id: 'ex-para-1',
          type: 'gap-fill',
          question: 'The chart ____ the number of cars.',
          options: ['displays', 'illustrates', 'presents'],
          answer: 'illustrates',
          explanation: "'Illustrates' is the most accurate synonym for 'shows' in this context."
        }
      }
    ]
  },
  {
    title: "Preposition Mastery",
    slides: [
      textSlide("Time and Place rules.", "Small words matter.", "Let's master them."),
      textSlide("Specific Years", "Use 'in'.", "Example: 'In 1999'."),
      textSlide("Ranges", "Use 'from... to...'", "Example: 'From 1990 to 2000'."),
      textSlide("Durations", "Use 'during' or 'over'.", "Example: 'Over a ten-year period'."),
      {
        type: 'exercise',
        exercise: {
          id: 'ex-prep-intro',
          type: 'gap-fill',
          question: 'Sales increased ____ 2005.',
          options: ['on', 'in', 'at'],
          answer: 'in',
          explanation: "Use 'in' for specific years."
        }
      }
    ]
  },
  {
    title: "Case Study: Line Graph",
    slides: [
      textSlide("Topic: Fast Food in Australia", "Data: Pizza vs Fish & Chips.", "Period: 1975 to 2000."),
      textSlide("The Trend", "Pizza: 10 times increase.", "Fish & Chips: Gradual decline."),
      {
        type: 'exercise',
        exercise: {
          id: 'cs-line-1',
          type: 'multiple-choice',
          question: 'Pizza consumption ____ from 1975 to 2000.',
          options: ['remained stable', 'skyrocketed', 'dipped'],
          answer: 'skyrocketed',
          explanation: "It went from very low to the highest category."
        }
      },
      textSlide("Sentence Structure", "Use 'while' to compare.", "'Pizza rose, while Fish & Chips fell.'"),
      {
        type: 'exercise',
        exercise: {
          id: 'cs-line-2',
          type: 'gap-fill',
          question: 'Fish and chips consumption ____ declined.',
          options: ['gradually', 'sharply', 'quickly'],
          answer: 'gradually',
          explanation: "The line goes down slowly over 25 years."
        }
      },
      {
        type: 'exercise',
        exercise: {
          id: 'cs-line-3',
          type: 'gap-fill',
          question: 'In 1975, pizza was the ____ popular option.',
          options: ['least', 'most', 'best'],
          answer: 'least',
          explanation: "It started at nearly zero."
        }
      }
    ]
  },
  {
    title: "Case Study: Maps",
    slides: [
      textSlide("Topic: Isola Village Development", "Map 1: 2010 (Nature).", "Map 2: Present (Tourist Resort)."),
      textSlide("Vocabulary of Change", "Trees: 'Chopped down' or 'Cleared'.", "Buildings: 'Constructed' or 'Built'."),
      {
        type: 'exercise',
        exercise: {
          id: 'cs-map-1',
          type: 'matching',
          question: 'Synonym for "Knocked down"',
          answer: 'Demolished',
          options: ['Demolished', 'Created', 'Renovated']
        }
      },
      textSlide("Passive Voice is Key", "We don't know who built it.", "'New houses were constructed.'"),
      {
        type: 'exercise',
        exercise: {
          id: 'cs-map-2',
          type: 'gap-fill',
          question: 'The school ____ extended to add 2 rooms.',
          options: ['was', 'were', 'had'],
          answer: 'was',
          explanation: "Passive voice: singular subject 'school'."
        }
      },
      {
        type: 'exercise',
        exercise: {
          id: 'cs-map-3',
          type: 'multiple-choice',
          question: 'The woodland was ____ into a golf course.',
          options: ['converted', 'replaced', 'swapped'],
          answer: 'converted',
          explanation: "Converted implies a change of function."
        }
      }
    ]
  },
  {
    title: "Case Study: Process",
    slides: [
      textSlide("Topic: Brick Manufacturing", "Input: Raw Clay.", "Output: Finished Bricks."),
      textSlide("The Stages", "1. Digging -> 2. Sifting", "3. Moulding -> 4. Firing."),
      {
        type: 'exercise',
        exercise: {
          id: 'cs-proc-1',
          type: 'gap-fill',
          question: 'First, the clay is ____ using a digger.',
          options: ['excavated', 'found', 'seen'],
          answer: 'excavated',
          explanation: "Excavated is the precise technical term for digging."
        }
      },
      textSlide("Sequencers", "Don't just say 'and then'.", "Use: 'Following this', 'Subsequently'."),
      {
        type: 'exercise',
        exercise: {
          id: 'cs-proc-2',
          type: 'multiple-choice',
          question: '____, the bricks are placed in a kiln.',
          options: ['Next', 'First', 'While'],
          answer: 'Next',
          explanation: "A simple sequencer for the middle of a process."
        }
      },
      {
        type: 'exercise',
        exercise: {
          id: 'cs-proc-3',
          type: 'gap-fill',
          question: 'The bricks ____ cooled for 48 hours.',
          options: ['are', 'is', 'be'],
          answer: 'are',
          explanation: "Plural subject 'bricks' requires 'are'."
        }
      }
    ]
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main purpose of the introductory sentence?",
    options: ["To give an overview of trends", "To explain what the chart shows", "To list all the data points", "To give your opinion"],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Which word is a safe synonym for 'shows'?",
    options: ["Demonstrates", "Illustrates", "Reflects", "Proves"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "How do we paraphrase 'in 1999 and 2004'?",
    options: ["in two separate years", "between 1999 and 2004", "since 1999", "before 2004"],
    correctIndex: 0
  },
  {
    id: 4,
    question: "Which preposition is used for a duration? '___ a ten year period'",
    options: ["In", "At", "Over", "Since"],
    correctIndex: 2
  },
  {
    id: 5,
    question: "In a Map task, if a building is removed, we say it was...",
    options: ["Demolished", "Broken", "Deleted", "Erased"],
    correctIndex: 0
  },
  {
    id: 6,
    question: "For a Process diagram, which tense is most common?",
    options: ["Past Simple", "Present Passive", "Future Perfect", "Present Continuous"],
    correctIndex: 1
  }
];

// Mock data for charts
export const CHART_DATA_BAR = [
  { name: '1980', coffee: 40, bananas: 24 },
  { name: '1990', coffee: 30, bananas: 13 },
  { name: '2000', coffee: 20, bananas: 58 },
];

export const CHART_DATA_PIE = [
  { name: 'Rent', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Travel', value: 300 },
  { name: 'Fun', value: 200 },
];
