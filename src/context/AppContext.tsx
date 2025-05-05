
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Module, Badge, SavingsGoal, SavingEntry } from "@/types/app";
import { toast } from "sonner";

interface AppContextType {
  user: User | null;
  modules: Module[];
  isAuthenticated: boolean;
  login: (username: string, role: "student" | "teacher") => void;
  logout: () => void;
  completeModule: (moduleId: string) => void;
  saveQuizAnswer: (moduleId: string, questionId: string, answerIndex: number) => void;
  completeQuiz: (moduleId: string) => void;
  addSaving: (amount: number) => void;
  updateSavingsGoal: (goal: Partial<SavingsGoal>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultBadges: Badge[] = [
  {
    id: "badge1",
    name: "Mulai Belajar",
    icon: "🎯",
    description: "Memulai perjalanan literasi keuangan",
    unlocked: true,
  },
  {
    id: "badge2",
    name: "Penabung Pemula",
    icon: "💰",
    description: "Membuat target tabungan pertama",
    unlocked: false,
  },
  {
    id: "badge3",
    name: "Kuis Master",
    icon: "🎓",
    description: "Mendapatkan nilai sempurna dalam kuis",
    unlocked: false,
  },
  {
    id: "badge4",
    name: "Ahli Anggaran",
    icon: "📊",
    description: "Menyelesaikan modul anggaran",
    unlocked: false,
  },
  {
    id: "badge5",
    name: "Penabung Konsisten",
    icon: "⏱️",
    description: "Menabung 5 kali berturut-turut",
    unlocked: false,
  },
];

const defaultModules: Module[] = [
  {
    id: "module1",
    title: "Kebutuhan vs Keinginan",
    description: "Belajar membedakan antara kebutuhan dan keinginan",
    videoUrl: "https://www.youtube.com/embed/dummyurl1",
    completed: false,
    quiz: {
      id: "quiz1",
      questions: [
        {
          id: "q1_1",
          text: "Manakah dari berikut ini yang merupakan kebutuhan?",
          options: ["Mainan baru", "Makanan", "Gadget terbaru", "Sepatu mahal"],
          correctAnswer: 1,
        },
        {
          id: "q1_2",
          text: "Apa yang terjadi jika kamu menghabiskan semua uangmu untuk keinginan?",
          options: [
            "Kamu akan bahagia selamanya",
            "Tidak ada masalah",
            "Kamu mungkin tidak punya uang untuk kebutuhan penting",
            "Kamu akan mendapat lebih banyak uang",
          ],
          correctAnswer: 2,
        },
        {
          id: "q1_3",
          text: "Contoh kebutuhan adalah...",
          options: ["Ponsel terbaru", "Air bersih", "Mainan", "Game baru"],
          correctAnswer: 1,
        },
      ],
      completed: false,
      score: 0,
    },
  },
  {
    id: "module2",
    title: "Menabung dan Anggaran",
    description: "Belajar cara menabung dan membuat anggaran sederhana",
    videoUrl: "https://www.youtube.com/embed/dummyurl2",
    completed: false,
    quiz: {
      id: "quiz2",
      questions: [
        {
          id: "q2_1",
          text: "Mengapa penting untuk menabung?",
          options: [
            "Agar bisa membeli semua yang diinginkan",
            "Untuk mempersiapkan kebutuhan masa depan",
            "Karena orang tua menyuruh",
            "Tidak penting sama sekali",
          ],
          correctAnswer: 1,
        },
        {
          id: "q2_2",
          text: "Apa itu anggaran?",
          options: [
            "Daftar uang yang akan dihabiskan",
            "Rencana bagaimana uang akan digunakan",
            "Buku tabungan",
            "Celengan",
          ],
          correctAnswer: 1,
        },
        {
          id: "q2_3",
          text: "Berapa persen dari uang saku sebaiknya ditabung?",
          options: ["0%", "5%", "20%", "100%"],
          correctAnswer: 2,
        },
      ],
      completed: false,
      score: 0,
    },
  },
  {
    id: "module3",
    title: "Risiko Finansial",
    description: "Belajar tentang risiko dalam keuangan dan cara mengelolanya",
    videoUrl: "https://www.youtube.com/embed/dummyurl3",
    completed: false,
    quiz: {
      id: "quiz3",
      questions: [
        {
          id: "q3_1",
          text: "Apa itu risiko finansial?",
          options: [
            "Uang yang kamu dapatkan",
            "Kemungkinan kehilangan uang",
            "Tabungan di bank",
            "Hadiah dari orang tua",
          ],
          correctAnswer: 1,
        },
        {
          id: "q3_2",
          text: "Apa yang bisa kamu lakukan untuk mengurangi risiko finansial?",
          options: [
            "Menghabiskan semua uang",
            "Tidak melakukan apa-apa",
            "Menabung untuk keadaan darurat",
            "Meminjam uang",
          ],
          correctAnswer: 2,
        },
        {
          id: "q3_3",
          text: "Contoh risiko finansial adalah...",
          options: [
            "Mendapatkan hadiah",
            "Mendapat uang jajan",
            "Kehilangan dompet",
            "Menabung di bank",
          ],
          correctAnswer: 2,
        },
      ],
      completed: false,
      score: 0,
    },
  },
];

const defaultSavingsGoal: SavingsGoal = {
  id: "goal1",
  title: "Buku Komik",
  targetAmount: 100000,
  currentAmount: 25000,
  weeklyContribution: 5000,
  history: [
    {
      id: "entry1",
      amount: 10000,
      date: "2025-04-28",
    },
    {
      id: "entry2",
      amount: 15000,
      date: "2025-05-05",
    },
  ],
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<Module[]>(defaultModules);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, role: "student" | "teacher") => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: username,
      role,
      progress: 0,
      badges: [...defaultBadges],
      points: 0,
      savingsGoal: { ...defaultSavingsGoal },
    };
    setUser(newUser);
    setIsAuthenticated(true);
    toast.success(`Selamat datang, ${username}!`);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setModules(defaultModules);
    toast.info("Berhasil keluar");
  };

  const completeModule = (moduleId: string) => {
    if (!user) return;

    const updatedModules = modules.map((module) =>
      module.id === moduleId ? { ...module, completed: true } : module
    );

    setModules(updatedModules);

    // Calculate progress
    const completedModules = updatedModules.filter((m) => m.completed).length;
    const progress = Math.round((completedModules / updatedModules.length) * 100);

    // Update badges if needed
    let updatedBadges = [...user.badges];
    if (moduleId === "module2") {
      updatedBadges = updatedBadges.map((b) => 
        b.id === "badge4" ? { ...b, unlocked: true } : b
      );
    }

    setUser({
      ...user,
      progress,
      badges: updatedBadges,
      points: user.points + 50
    });

    toast.success("Modul selesai! +50 poin");
  };

  const saveQuizAnswer = (moduleId: string, questionId: string, answerIndex: number) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        const updatedQuestions = module.quiz.questions.map((q) =>
          q.id === questionId ? { ...q, userAnswer: answerIndex } : q
        );
        return {
          ...module,
          quiz: {
            ...module.quiz,
            questions: updatedQuestions,
          },
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const completeQuiz = (moduleId: string) => {
    if (!user) return;

    const moduleIndex = modules.findIndex((m) => m.id === moduleId);
    if (moduleIndex === -1) return;

    const module = modules[moduleIndex];
    const questions = module.quiz.questions;
    
    const correctAnswers = questions.filter(
      (q) => q.userAnswer !== undefined && q.userAnswer === q.correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    const pointsGained = score >= 80 ? 100 : score >= 50 ? 50 : 20;

    // Check if got perfect score
    let updatedBadges = [...user.badges];
    if (score === 100) {
      updatedBadges = updatedBadges.map((b) => 
        b.id === "badge3" ? { ...b, unlocked: true } : b
      );
    }

    const updatedModules = [...modules];
    updatedModules[moduleIndex] = {
      ...module,
      quiz: {
        ...module.quiz,
        completed: true,
        score,
      },
      completed: true,
    };

    setModules(updatedModules);

    // Calculate progress
    const completedModules = updatedModules.filter((m) => m.completed).length;
    const progress = Math.round((completedModules / updatedModules.length) * 100);

    setUser({
      ...user,
      progress,
      badges: updatedBadges,
      points: user.points + pointsGained,
    });

    toast.success(`Kuis selesai! +${pointsGained} poin`);
  };

  const addSaving = (amount: number) => {
    if (!user) return;

    const newEntry: SavingEntry = {
      id: `entry_${Date.now()}`,
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedGoal = {
      ...user.savingsGoal,
      currentAmount: user.savingsGoal.currentAmount + amount,
      history: [...user.savingsGoal.history, newEntry],
    };

    // Check if need to unlock badge
    let updatedBadges = [...user.badges];
    if (!updatedBadges.find(b => b.id === "badge2")?.unlocked) {
      updatedBadges = updatedBadges.map((b) => 
        b.id === "badge2" ? { ...b, unlocked: true } : b
      );
    }

    if (updatedGoal.history.length >= 5) {
      updatedBadges = updatedBadges.map((b) => 
        b.id === "badge5" ? { ...b, unlocked: true } : b
      );
    }

    setUser({
      ...user,
      savingsGoal: updatedGoal,
      badges: updatedBadges,
      points: user.points + 10,
    });

    toast.success(`Tabungan ditambahkan! +10 poin`);
  };

  const updateSavingsGoal = (goal: Partial<SavingsGoal>) => {
    if (!user) return;

    setUser({
      ...user,
      savingsGoal: {
        ...user.savingsGoal,
        ...goal,
      },
    });

    toast.success("Target tabungan diperbarui!");
  };

  const value = {
    user,
    modules,
    isAuthenticated,
    login,
    logout,
    completeModule,
    saveQuizAnswer,
    completeQuiz,
    addSaving,
    updateSavingsGoal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
