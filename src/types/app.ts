
export interface User {
  id: string;
  name: string;
  role: "student" | "teacher";
  progress: number;
  badges: Badge[];
  points: number;
  savingsGoal: SavingsGoal;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  completed: boolean;
  quiz: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
  completed: boolean;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  weeklyContribution: number;
  history: SavingEntry[];
}

export interface SavingEntry {
  id: string;
  amount: number;
  date: string;
}
