/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Heart,
  Droplets,
  Flower,
  Activity,
  Smile,
  CheckCircle,
  Clock,
  Sparkles,
  ClipboardList,
  Flame,
  Check,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Info,
  ChevronLeft,
  Moon,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Coffee,
  Sun,
  Dumbbell
} from "lucide-react";

// Definitions of Menstrual Phases
export enum MenstrualPhase {
  Menstrual = "Menstrual Phase",
  Follicular = "Follicular Phase",
  Ovulation = "Ovulation Phase",
  Luteal = "Luteal Phase"
}

// Custom Moods and Symptoms
export type MoodType = "Happy" | "Sad" | "Stressed" | "Tired" | "Energetic";
export type SymptomType = "Cramps" | "Headache" | "Bloating" | "Fatigue" | "Acne" | "Mood Swings";

export interface WellnessChecklist {
  water: boolean;
  sleep: boolean;
  exercise: boolean;
  healthy_food: boolean;
}

export interface PeriodRecord {
  id: string;
  startDate: string;
  cycleLength: number;
}

export interface DailyLog {
  date: string;
  mood?: MoodType;
  symptoms: SymptomType[];
  wellness: WellnessChecklist;
}

// Affirmations & Phase Details Data
interface PhaseInformation {
  title: string;
  rangeText: string;
  emoji: string;
  description: string;
  affirmation: string;
  wellnessTip: string;
  bgGradient: string;
  textColor: string;
  tagColor: string;
  foods: string[];
  exercises: string[];
  selfCareTips: string[];
}

const phaseDataMap: Record<MenstrualPhase, PhaseInformation> = {
  [MenstrualPhase.Menstrual]: {
    title: "Menstrual Phase",
    rangeText: "Days 1 - 5 • Cycle Winter",
    emoji: "❄️",
    description: "Your hormones (estrogen & progesterone) are at their baseline. The body sheds the uterine lining, prompting active recovery. Energy is naturally lower, making this the perfect time for deep rest, inner reflection, and restorative space.",
    affirmation: "I surrender to the quiet rhythm of rest. My body knows exactly how to heal, renew, and start fresh.",
    wellnessTip: "Focus on warm, high-iron nourishment, chamomile tea, and sweet gentle stretching. Keep boundaries soft and guard your quiet hours.",
    bgGradient: "from-rose-400/10 via-pink-300/10 to-rose-200/10 border-rose-200/40 text-rose-950",
    textColor: "text-rose-700",
    tagColor: "bg-rose-100/75 text-rose-800 border-rose-200",
    foods: ["Warm iron-rich stews & lentil soup", "Fresh forest berries", "Steaming ginger & chamomile tea", "Dark luxury cocoa chocolate (75%+)"],
    exercises: ["Deep restorative Yin Yoga", "Calm breathwork practices", "Slow slow garden strolls"],
    selfCareTips: ["Use a soothing warm compress", "Journal down intuitive morning pages", "Unwind in quiet silence with a warm bath"]
  },
  [MenstrualPhase.Follicular]: {
    title: "Follicular Phase",
    rangeText: "Days 6 - 13 • Cycle Spring",
    emoji: "🌱",
    description: "Estrogen begins its beautiful ascent, thickening the uterine lining. Physical energy, mental brightness, and optimism surge. Your mind is fresh, open, and brilliant — perfect for crafting new habits, scheduling projects, and initializing goals.",
    affirmation: "I step into the warmth of new beginnings. My focus returns, my vision is bright, and I welcome growth with joy.",
    wellnessTip: "Indulge your rising stamina with active social connections, fresh fermented food assets, and moderate cardio to fuel your brain.",
    bgGradient: "from-emerald-400/10 via-teal-300/10 to-pink-200/5 target-emerald-50 text-[#1e1b4b]",
    textColor: "text-teal-700",
    tagColor: "bg-teal-100/70 text-teal-800 border-teal-200",
    foods: ["Avocados, almonds & pumpkin seeds", "Fresh crunchy broccoli & crisp microgreens", "Fermented kimchi, kefir & yogurt"],
    exercises: ["Uplifting Vinyasa flows", "Light jogging & outdoor cycling", "Steady weight lifting"],
    selfCareTips: ["Set creative targets for the season", "Say yes to delightful coffee catchups", "Pamper your skin with facial routines"]
  },
  [MenstrualPhase.Ovulation]: {
    title: "Ovulation Phase",
    emoji: "☀️",
    rangeText: "Days 14 - 15 • Cycle Summer",
    description: "The peak of estrogen and a surge of luteinizing hormone trigger the safe release of the egg. This represents your ultimate energetic phase: confidence, charm, verbal eloquence, and motor coordination peaks perfectly.",
    affirmation: "I radiate warm golden vital energy. I speak my truth with confidence and share deep connections with others.",
    wellnessTip: "This is your energetic summer! Capitalize on high performance workout sessions, handle major pitch presentations, and shine socially.",
    bgGradient: "from-amber-300/15 via-pink-400/10 to-fuchsia-300/10 border-pink-200/50 text-fuchsia-950",
    textColor: "text-pink-700",
    tagColor: "bg-pink-100/80 text-pink-800 border-pink-200/60",
    foods: ["Fresh colorful berries & juicy oranges", "Fresh leafy summer salads with salmon", "Omega-3 rich flax & sunflower seeds"],
    exercises: ["High-Intensity Interval Training (HIIT)", "Vigorous aerobic dance classes", "Heavier strength resistance sessions"],
    selfCareTips: ["Schedule public speaking or negotiations", "Enjoy lively evenings out with your tribe", "Capture this peak phase state to tackle fears"]
  },
  [MenstrualPhase.Luteal]: {
    title: "Luteal Phase",
    emoji: "🍁",
    rangeText: "Days 16 - 28 • Cycle Autumn",
    description: "Progesterone assumes dominance, preparing your body for a potential nest. If fertilization does not happen, estrogen and progesterone levels taper in the final days, occasionally introducing symptoms like bloating or sensitivity. Your attention turns naturally inward.",
    affirmation: "I celebrate the quiet wisdom of my center. I shield my boundaries and listen to my body's shifting guidance.",
    wellnessTip: "Support metabolic changes with complex starches (sweet potatoes) and magnesium. Switch from intensive sports to mindful pilates.",
    bgGradient: "from-purple-300/10 via-indigo-300/10 to-rose-200/10 border-purple-200/30 text-purple-950",
    textColor: "text-purple-700",
    tagColor: "bg-purple-100/75 text-purple-800 border-purple-200",
    foods: ["Roasted sweet potatoes, quinoa & wild rice", "Bananas & walnuts rich in vitamin B6", "Mineral spinach with raw dark chocolate"],
    exercises: ["Calm steady Pilates workouts", "Slow resistance bodyweight routines", "Grounded slow walks in nature"],
    selfCareTips: ["Declutter files & clean your private chamber", "Write down thoughts in an evening quiet log", "Enjoy warm herbal tea infusions inside cozy pajamas"]
  }
};

const MOTIVATIONAL_WISDOM = [
  "You are not meant to operate the same way every single day. Your cycle is a beautifully designed compass.",
  "Honor the winter of your rest just as proudly as you celebrate the high summer of your peak vitality.",
  "Each phase is an invitation to master a different power: resting, planning, expressing, and editing.",
  "A woman in sync with her biological phases is a force of clean, natural, sustainable energy.",
  "Slowing down in the Menstrual Phase is the secret spark that fuels your future Follicular spring."
];

export default function App() {
  // Navigation tabs
  // Tabs: "home" | "mood" | "symptoms" | "wellness" | "history"
  const [activeTab, setActiveTab] = useState<"home" | "mood" | "symptoms" | "wellness" | "history">("home");

  // Core local states backed by localStorage
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    return localStorage.getItem("cs_last_period") || "2026-06-15";
  });
  const [cycleLength, setCycleLength] = useState<number>(() => {
    const saved = localStorage.getItem("cs_cycle_length");
    return saved ? parseInt(saved, 10) : 28;
  });

  // Daily logged trends stored in an object map indexed by date format: "YYYY-MM-DD"
  const [logs, setLogs] = useState<Record<string, DailyLog>>(() => {
    const saved = localStorage.getItem("cs_daily_logs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback standard logs
      }
    }
    // Default mock logs for 2026-06-14, 15, 16
    return {
      "2026-06-14": {
        date: "2026-06-14",
        mood: "Tired",
        symptoms: ["Fatigue"],
        wellness: { water: true, sleep: false, exercise: true, healthy_food: false }
      },
      "2026-06-15": {
        date: "2026-06-15",
        mood: "Sad",
        symptoms: ["Cramps", "Headache"],
        wellness: { water: true, sleep: true, exercise: false, healthy_food: true }
      },
      "2026-06-16": {
        date: "2026-06-16",
        mood: "Energetic",
        symptoms: ["Bloating"],
        wellness: { water: true, sleep: true, exercise: true, healthy_food: true }
      }
    };
  });

  // Simulated active date
  const [simDate, setSimDate] = useState<string>("2026-06-16");

  // Past cycle archives log
  const [priorPeriodRecords, setPriorPeriodRecords] = useState<PeriodRecord[]>(() => {
    const saved = localStorage.getItem("cs_period_records");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      { id: "p1", startDate: "2026-05-18", cycleLength: 28 },
      { id: "p2", startDate: "2026-06-15", cycleLength: 28 }
    ];
  });

  // Current inputs for editing cycle configuration
  const [inputDate, setInputDate] = useState(lastPeriodDate);
  const [inputLength, setInputLength] = useState(cycleLength);

  // Status flags
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // Auto save inputs to localStorage
  useEffect(() => {
    localStorage.setItem("cs_last_period", lastPeriodDate);
    localStorage.setItem("cs_cycle_length", cycleLength.toString());
  }, [lastPeriodDate, cycleLength]);

  useEffect(() => {
    localStorage.setItem("cs_daily_logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("cs_period_records", JSON.stringify(priorPeriodRecords));
  }, [priorPeriodRecords]);

  // Derived current metrics
  const getCycleCalculation = (startStr: string, lengthVal: number, targetStr: string) => {
    try {
      const startDateObj = new Date(startStr);
      const targetDateObj = new Date(targetStr);
      
      const differenceMs = targetDateObj.getTime() - startDateObj.getTime();
      const diffDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
      
      let day = (diffDays % lengthVal) + 1;
      if (day < 1) {
        day += lengthVal;
      }

      let phase = MenstrualPhase.Menstrual;
      if (day >= 1 && day <= 5) {
        phase = MenstrualPhase.Menstrual;
      } else if (day >= 6 && day <= Math.floor(lengthVal / 2) - 1) {
        phase = MenstrualPhase.Follicular;
      } else if (day >= Math.floor(lengthVal / 2) && day <= Math.floor(lengthVal / 2) + 1) {
        phase = MenstrualPhase.Ovulation;
      } else {
        phase = MenstrualPhase.Luteal;
      }

      return {
        phase,
        day,
        daysElapsed: diffDays
      };
    } catch {
      return {
        phase: MenstrualPhase.Menstrual,
        day: 1,
        daysElapsed: 0
      };
    }
  };

  const { phase: currentPhase, day: currentCycleDay, daysElapsed } = getCycleCalculation(lastPeriodDate, cycleLength, simDate);

  // Active Phase Details
  const phaseDetailsObj = phaseDataMap[currentPhase];

  // Quick notifier
  const triggerToast = (text: string) => {
    setSuccessNotification(text);
    setTimeout(() => {
      setSuccessNotification(null);
    }, 3500);
  };

  // Safe handlers for updates
  const handleUpdateCycleSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDate) {
      triggerToast("Please pick a valid start date");
      return;
    }
    const len = Number(inputLength);
    if (isNaN(len) || len < 15 || len > 45) {
      triggerToast("Cycle length is typically between 15 and 45 days");
      return;
    }

    setLastPeriodDate(inputDate);
    setCycleLength(len);

    // Save configuration inside our archives list too if not matching last
    const match = priorPeriodRecords.find(r => r.startDate === inputDate);
    if (!match) {
      const newArchive: PeriodRecord = {
        id: "p_" + Date.now(),
        startDate: inputDate,
        cycleLength: len
      };
      setPriorPeriodRecords(prev => [...prev, newArchive]);
    }

    triggerToast("✨ Cycle synced successfully! Phase calculated.");
  };

  // Get log for current sim date
  const activeLog = logs[simDate] || {
    date: simDate,
    symptoms: [],
    wellness: { water: false, sleep: false, exercise: false, healthy_food: false }
  };

  // Set Mood handler
  const handleSaveMood = (newMood: MoodType) => {
    setLogs(prev => {
      const currentObj = prev[simDate] || {
        date: simDate,
        symptoms: [],
        wellness: { water: false, sleep: false, exercise: false, healthy_food: false }
      };
      return {
        ...prev,
        [simDate]: {
          ...currentObj,
          mood: newMood
        }
      };
    });
    triggerToast(`Mood logged: ${newMood} 😊`);
  };

  // Symptom Checkbox handler
  const handleToggleSymptom = (symptom: SymptomType) => {
    setLogs(prev => {
      const currentObj = prev[simDate] || {
        date: simDate,
        symptoms: [],
        wellness: { water: false, sleep: false, exercise: false, healthy_food: false }
      };
      const contains = currentObj.symptoms.includes(symptom);
      const updatedList = contains
        ? currentObj.symptoms.filter(x => x !== symptom)
        : [...currentObj.symptoms, symptom];

      return {
        ...prev,
        [simDate]: {
          ...currentObj,
          symptoms: updatedList
        }
      };
    });
  };

  // Toggle wellness checker
  const handleToggleWellness = (key: keyof WellnessChecklist) => {
    setLogs(prev => {
      const currentObj = prev[simDate] || {
        date: simDate,
        symptoms: [],
        wellness: { water: false, sleep: false, exercise: false, healthy_food: false }
      };
      return {
        ...prev,
        [simDate]: {
          ...currentObj,
          wellness: {
            ...currentObj.wellness,
            [key]: !currentObj.wellness[key]
          }
        }
      };
    });
    triggerToast("Wellness checkpoint updated ✨");
  };

  // Delete historic log entry
  const handleDeletePeriodRecord = (id: string) => {
    setPriorPeriodRecords(prev => prev.filter(r => r.id !== id));
    triggerToast("Log entry removed from memory");
  };

  // Clear everything & restore default values
  const handleClearMemory = () => {
    if (window.confirm("Do you want to reset all tracking history?")) {
      localStorage.clear();
      setLastPeriodDate("2026-06-15");
      setCycleLength(28);
      setInputDate("2026-06-15");
      setInputLength(28);
      setLogs({
        "2026-06-16": {
          date: "2026-06-16",
          mood: "Energetic",
          symptoms: ["Bloating"],
          wellness: { water: true, sleep: true, exercise: true, healthy_food: true }
        }
      });
      setPriorPeriodRecords([
        { id: "p1", startDate: "2026-06-15", cycleLength: 28 }
      ]);
      triggerToast("System cleared and reset");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] bg-gradient-to-br from-[#fdf2f8] via-[#f5f3ff] to-[#f3e8ff] p-4 md:p-8 flex flex-col justify-between font-sans text-purple-950 selection:bg-pink-100">
      
      {/* Dynamic Visual Toast Banner */}
      <AnimatePresence>
        {successNotification && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-md border border-pink-200/50 px-5 py-4 rounded-2xl shadow-xl shadow-purple-200/40 text-[#4c1d95]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">{successNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        {/* APP GLASS HEADER */}
        <header className="flex justify-between items-center bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-md shadow-pink-100">
              <Flower className="h-6 w-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-purple-900">CycleSync</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-pink-100/60 text-pink-700 rounded-full border border-pink-200/30">
                  Smart Companion
                </span>
              </div>
              <p className="text-[10px] text-purple-950/60 uppercase tracking-widest font-bold">
                Your private health & mood tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* DATE CONTROLLER FOR ENTIRE SYSTEM */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Simulated Today</span>
              <span className="text-sm font-bold text-purple-950 font-mono">{simDate}</span>
            </div>
            <div className="bg-white/60 hover:bg-white/80 border border-pink-200/30 p-1.5 rounded-xl transition flex items-center gap-1.5 shadow-xs">
              <Calendar className="w-4 h-4 text-pink-500" />
              <input
                type="date"
                value={simDate}
                onChange={(e) => {
                  setSimDate(e.target.value);
                  triggerToast(`Virtual day updated to ${e.target.value}`);
                }}
                className="bg-transparent border-0 text-xs font-bold text-purple-950 focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </header>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 items-stretch">
          
          {/* LEFT SIDE NAVIGATION PANEL (col-span-3) */}
          <section className="md:col-span-4 lg:col-span-3 flex flex-col gap-3">
            
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-3xl shadow-sm flex flex-col gap-2">
              <p className="text-[10px] font-extrabold uppercase text-purple-900/40 tracking-widest px-3 mb-2">
                Features & Wellness Logs
              </p>

              {/* NAVIGATION BUTTONS */}
              {[
                { id: "home", label: "Dashboard Hub", icon: Flower, color: "text-pink-500", desc: "Core computations & advice" },
                { id: "mood", label: "Mood Tracker", icon: Smile, color: "text-amber-500", desc: "Daily emotional waves" },
                { id: "symptoms", label: "Symptom Log", icon: Activity, color: "text-rose-500", desc: "Physical discomfort checks" },
                { id: "wellness", label: "Self-Care Plan", icon: ClipboardList, color: "text-teal-500", desc: "Habits Checklist" },
                { id: "history", label: "My Cycle Archives", icon: BookOpen, color: "text-indigo-500", desc: "Logs & cycle timelines" }
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? "bg-gradient-to-r from-[#ffe4e6] to-[#fae8ff] border-pink-300 text-purple-950 font-bold shadow-md shadow-pink-100"
                        : "bg-white/35 border-transparent hover:bg-white/60 hover:translate-x-1"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${isActive ? "bg-white" : "bg-white/20"} shadow-xs`}>
                      <IconComp className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-none">{item.label}</p>
                      <p className="text-[9px] text-neutral-400 mt-1 truncate">{item.desc}</p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 text-neutral-300 transform transition-transform ${isActive ? "translate-x-0.5 text-pink-400" : ""}`} />
                  </button>
                );
              })}
            </div>

            {/* QUICK CORNER STATUS GAUGE */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-[2rem] shadow-sm flex flex-col gap-4 text-center mt-auto">
              <div className="flex justify-between items-center bg-white/50 py-2 px-3 border border-pink-200/30 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-purple-900/60 font-mono">Today's Date:</span>
                <span className="text-[11px] font-bold text-pink-600 font-mono">{simDate}</span>
              </div>
              
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                {/* SVG circular track reflecting computed state */}
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#fee2e2"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#ec4899"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * currentCycleDay) / cycleLength}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-purple-950/40 font-bold">Day</span>
                  <span className="text-3xl font-extrabold text-purple-950">{currentCycleDay}</span>
                  <span className="text-[10px] font-semibold text-neutral-400">of {cycleLength}</span>
                </div>
              </div>

              <div className="text-center font-bold text-xs uppercase bg-pink-100/50 py-1.5 px-3 rounded-xl border border-pink-200/30 leading-none">
                {currentPhase}
              </div>
            </div>

          </section>

          {/* RIGHT SIDE MAIN VIEWPORT (col-span-9) */}
          <section className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">

            <AnimatePresence mode="wait">
              
              {/* ========================================= */}
              {/* TAB 1: FRONT PAGE (DASHBOARD HUB)        */}
              {/* ========================================= */}
              {activeTab === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  
                  {/* HERO STATUS PANEL WITH THE CUSTOM GRADIENT */}
                  <div className={`p-8 border rounded-[2.5rem] shadow-md flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${phaseDetailsObj.bgGradient} border-white/50`}>
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white opacity-20 pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${phaseDetailsObj.tagColor}`}>
                          <span className="text-sm">{phaseDetailsObj.emoji}</span> {phaseDetailsObj.rangeText}
                        </span>
                        
                        <h2 className="text-3xl md:text-4xl font-black text-purple-950 tracking-tight mt-3 mb-1.5">
                          {currentPhase}
                        </h2>
                        
                        <p className="text-xs font-bold text-purple-700/80 uppercase tracking-widest">
                          Active Menstrual Cycle Phase Calculator
                        </p>
                      </div>

                      <div className="bg-white/60 border border-pink-200/50 rounded-2xl p-3 md:text-right min-w-44 flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Estimated next Period</span>
                        <span className="text-sm font-black text-pink-600 mt-1 font-mono">
                          In {cycleLength - (currentCycleDay - 1)} Days
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-purple-950/80 max-w-2xl mb-6">
                      {phaseDetailsObj.description}
                    </p>

                    {/* INTERACTIVE PHASE AFFIRMATION COMPONENT */}
                    <div className="p-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-md relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10" />
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-pink-200" /> Phase Affirmation & Daily Wisdom
                      </p>
                      <p className="text-sm md:text-base font-serif italic leading-relaxed text-pink-50">
                        "{phaseDetailsObj.affirmation}"
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM RE-CALCULATOR PORTLET & MOTIVATION PANEL */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* DYNAMIC CALCULATOR FORM inputs */}
                    <div className="lg:col-span-7 bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2.25rem] p-6 shadow-sm">
                      <h3 className="font-bold text-purple-900 flex items-center gap-2 text-sm uppercase tracking-wider mb-4">
                        <Calendar className="w-4 h-4 text-pink-500" />
                        Configure Cycle Boundaries
                      </h3>

                      <form onSubmit={handleUpdateCycleSettings} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-2">
                              Last Period Start Date
                            </label>
                            <input
                              type="date"
                              value={inputDate}
                              onChange={(e) => setInputDate(e.target.value)}
                              className="w-full bg-white/60 hover:bg-white border border-pink-100 hover:border-pink-300 rounded-xl px-4 py-3 text-xs font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-2">
                              Average Cycle Length
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="15"
                                max="45"
                                value={inputLength}
                                onChange={(e) => setInputLength(parseInt(e.target.value) || 28)}
                                className="w-full bg-white/60 hover:bg-white border border-pink-100 hover:border-pink-300 rounded-xl px-4 py-3 text-xs font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                              />
                              <span className="absolute right-3.5 top-3 text-[10px] text-neutral-400 font-bold uppercase">Days</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#7c3aed] text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-[#6d28d9] transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                        >
                          Calculate & Save Wellness State
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>

                    {/* CUTE RANDOM MOTIVATIONAL TIDBITS */}
                    <div className="lg:col-span-5 bg-gradient-to-b from-purple-100/30 to-pink-100/35 border border-white/60 rounded-[2.25rem] p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-purple-800 tracking-widest mb-3.5">
                          <BookOpen className="w-3.5 h-3.5" /> Compass Wisdom
                        </div>
                        <p className="text-xs text-purple-900/80 leading-relaxed font-serif italic">
                          "Each dynamic shift you feel inside has a beautiful wellness purpose. Sleep well during winter, organize your world in spring, connect with community in summer, and reflect on priorities in autumn."
                        </p>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-purple-200/30 flex items-center gap-2 text-[10px] font-bold text-purple-950/60 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        Live in tune with your nature.
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

              {/* ========================================= */}
              {/* TAB 2: MOOD & EMOTIONS DIARY              */}
              {/* ========================================= */}
              {activeTab === "mood" && (
                <motion.div
                  key="mood"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-[2.5rem] shadow-sm">
                    <div className="border-b border-pink-200/30 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-purple-950 flex items-center gap-2">
                        <span>🎭</span> Mood & Emotion Diary
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Select your aggregate emotion logged for simulated date: <strong className="text-pink-600 font-bold">{simDate}</strong>
                      </p>
                    </div>

                    {/* MOOD SELECTION TOKENS */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                      {[
                        { type: "Happy", emoji: "😊", sub: "Joyful • Balanced", color: "from-amber-100 to-amber-200 border-amber-300 ring-amber-400" },
                        { type: "Sad", emoji: "😔", sub: "Sensitive • Slow", color: "from-blue-100 to-blue-200 border-blue-300 ring-blue-400" },
                        { type: "Stressed", emoji: "⚡", sub: "Irritated • Reactive", color: "from-purple-100 to-purple-200 border-purple-300 ring-purple-400" },
                        { type: "Tired", emoji: "🔋", sub: "Resting • Depleted", color: "from-rose-100 to-rose-200 border-rose-300 ring-rose-400" },
                        { type: "Energetic", emoji: "⭐", sub: "Thriving • Expressive", color: "from-teal-100 to-teal-200 border-teal-300 ring-teal-400" }
                      ].map((m) => {
                        const isSelected = activeLog.mood === m.type;
                        return (
                          <button
                            key={m.type}
                            onClick={() => handleSaveMood(m.type as MoodType)}
                            className={`p-4 rounded-3xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-between gap-2 shadow-xs group ${
                              isSelected
                                ? "bg-white border-pink-400 scale-102 ring-2 ring-pink-300"
                                : "bg-white/40 border-transparent hover:bg-white/80"
                            }`}
                          >
                            <span className="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition">{m.emoji}</span>
                            <div>
                              <p className="text-xs font-bold text-purple-950 mt-1">{m.type}</p>
                              <p className="text-[9px] text-neutral-400 font-medium leading-none mt-1">{m.sub}</p>
                            </div>
                            <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-pink-500" : "bg-transparent"}`} />
                          </button>
                        );
                      })}
                    </div>

                    {/* MOOD TRENDS HISTORY VIEW */}
                    <div className="mt-8">
                      <h4 className="text-[10px] font-bold uppercase text-purple-900/40 tracking-widest mb-4">
                        Recent Emotion Logs Archive
                      </h4>
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {Object.values(logs).map((val) => {
                          if (!val.mood) return null;
                          return (
                            <div key={val.date} className="bg-white/60 p-3 rounded-2xl border border-white flex items-center justify-between text-xs hover:bg-white transition">
                              <span className="font-mono text-neutral-400 font-bold">{val.date}</span>
                              <span className="text-pink-600 font-bold uppercase tracking-wider">
                                {val.date === simDate ? "Today's Record" : "Historic Logs"}
                              </span>
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 font-semibold rounded-full flex items-center gap-1.5">
                                {val.mood === "Happy" && "😊"}
                                {val.mood === "Sad" && "😔"}
                                {val.mood === "Stressed" && "⚡"}
                                {val.mood === "Tired" && "🔋"}
                                {val.mood === "Energetic" && "⭐"}
                                {val.mood}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================= */}
              {/* TAB 3: PHYSICAL SYMPTOMS LOGGER          */}
              {/* ========================================= */}
              {activeTab === "symptoms" && (
                <motion.div
                  key="symptoms"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-[2.5rem] shadow-sm">
                    <div className="border-b border-pink-200/30 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-purple-950 flex items-center gap-2">
                        <span>🌿</span> Symptom Log Directory
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Select bodily indicators you notice for: <strong className="text-pink-600 font-bold">{simDate}</strong>. Logs update dynamically in real-time.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { sym: "Cramps", icon: "⚡", description: "Lower abdomen cramps" },
                        { sym: "Headache", icon: "🧠", description: "Dull pressure or migraines" },
                        { sym: "Bloating", icon: "🎈", description: "Water retention signs" },
                        { sym: "Fatigue", icon: "💤", description: "Low persistent engine fuel" },
                        { sym: "Acne", icon: "✨", description: "Blemishes or sensitive skin" },
                        { sym: "Mood Swings", icon: "🎢", description: "Shifting emotional states" }
                      ].map((item) => {
                        const isChecked = activeLog.symptoms.includes(item.sym as SymptomType);
                        return (
                          <div
                            key={item.sym}
                            onClick={() => {
                              handleToggleSymptom(item.sym as SymptomType);
                              triggerToast(`Symptom '${item.sym}' status updated for date!`);
                            }}
                            className={`p-4 border rounded-2.5xl cursor-pointer text-left transition-all duration-300 relative overflow-hidden ${
                              isChecked
                                ? "bg-pink-500 text-white border-pink-400 shadow-sm leading-tight"
                                : "bg-white/40 border-pink-100 hover:bg-white/80"
                            }`}
                          >
                            <div className="absolute right-3.5 top-3.5 text-2xl opacity-80">{item.icon}</div>
                            <h4 className="text-sm font-black uppercase tracking-wider mb-1">{item.sym}</h4>
                            <p className={`text-[10px] leading-tight ${isChecked ? "text-pink-100" : "text-neutral-400"}`}>
                              {item.description}
                            </p>
                            <span className="hidden">Checked: {isChecked ? "Yes" : "No"}</span>
                            
                            <div className="mt-4 flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold">
                              {isChecked ? (
                                <span className="bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5 text-white" /> Checked
                                </span>
                              ) : (
                                <span className="text-purple-600/40">Not Present</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* PREVIEW BOX */}
                    <div className="bg-white/50 p-5 rounded-2xl border border-white mt-6">
                      <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Symptoms logged for target date:</p>
                      {activeLog.symptoms.length === 0 ? (
                        <p className="text-sm text-neutral-400 italic mt-1.5 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> Clear skin & comfort. No signs logged.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {activeLog.symptoms.map((s) => (
                            <span key={s} className="px-3.5 py-1 text-xs font-bold bg-pink-100 text-pink-700 border border-pink-200/40 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================= */}
              {/* TAB 4: SELF-CARE DAILY PLAN              */}
              {/* ========================================= */}
              {activeTab === "wellness" && (
                <motion.div
                  key="wellness"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-[2.5rem] shadow-sm">
                    <div className="border-b border-pink-200/30 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-purple-950 flex items-center gap-2">
                        <span>🥤</span> Daily Self-Care Plan
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Log self-care rituals to keep your body balanced across all phases.
                      </p>
                    </div>

                    {/* CORE WELLNESS TILES */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Water habit */}
                      <div
                        onClick={() => handleToggleWellness("water")}
                        className={`p-5 rounded-2.5xl border cursor-pointer text-left transition-all ${
                          activeLog.wellness?.water
                            ? "bg-teal-50 border-teal-300 text-teal-950 shadow-xs"
                            : "bg-white/40 border-pink-100 hover:bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-3xl">🥛</span>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${
                            activeLog.wellness?.water ? "bg-teal-500" : "border-2 border-pink-200"
                          }`}>
                            {activeLog.wellness?.water && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-purple-950 mt-3">Drank Enough Water</h4>
                        <p className="text-[10px] text-neutral-400 mt-1 leads-normal">
                          Consumed at least 8 cups to combat bloat or hydrate tissues during endocrine shifts.
                        </p>
                      </div>

                      {/* Sleep habit */}
                      <div
                        onClick={() => handleToggleWellness("sleep")}
                        className={`p-5 rounded-2.5xl border cursor-pointer text-left transition-all ${
                          activeLog.wellness?.sleep
                            ? "bg-indigo-50 border-indigo-300 text-indigo-950 shadow-xs"
                            : "bg-white/40 border-pink-100 hover:bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-3xl">🌙</span>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${
                            activeLog.wellness?.sleep ? "bg-indigo-500" : "border-2 border-pink-200"
                          }`}>
                            {activeLog.wellness?.sleep && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-purple-950 mt-3">Restorative Sleep</h4>
                        <p className="text-[10px] text-neutral-400 mt-1 leads-normal">
                          Acquired at least 7-8 hours to promote natural cellular repair cycles.
                        </p>
                      </div>

                      {/* Exercise habit */}
                      <div
                        onClick={() => handleToggleWellness("exercise")}
                        className={`p-5 rounded-2.5xl border cursor-pointer text-left transition-all ${
                          activeLog.wellness?.exercise
                            ? "bg-pink-50 border-pink-300 text-pink-950 shadow-xs"
                            : "bg-white/40 border-pink-100 hover:bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-3xl">🏋️</span>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${
                            activeLog.wellness?.exercise ? "bg-pink-500" : "border-2 border-pink-200"
                          }`}>
                            {activeLog.wellness?.exercise && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-purple-950 mt-3">Physical Activity</h4>
                        <p className="text-[10px] text-neutral-400 mt-1 leads-normal">
                          Dedicated time for light walking, Yoga, HIIT or Pilates relative to active phase.
                        </p>
                      </div>

                      {/* nutrition habit */}
                      <div
                        onClick={() => handleToggleWellness("healthy_food")}
                        className={`p-5 rounded-2.5xl border cursor-pointer text-left transition-all ${
                          activeLog.wellness?.healthy_food
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs"
                            : "bg-white/40 border-pink-100 hover:bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-3xl">🥦</span>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${
                            activeLog.wellness?.healthy_food ? "bg-emerald-500" : "border-2 border-pink-200"
                          }`}>
                            {activeLog.wellness?.healthy_food && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-purple-950 mt-3">Smart Nutrition</h4>
                        <p className="text-[10px] text-neutral-400 mt-1 leads-normal">
                          Nourished with cycle-friendly assets (iron stews, crucifers, healthy dietary fibers).
                        </p>
                      </div>

                    </div>

                    {/* PHASE SPECIFIC RECOMMENDATIONS BRIEF */}
                    <div className="bg-purple-50 border border-purple-100/60 p-5 rounded-2xl mt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-white text-xs">✨</span>
                        <h4 className="text-xs font-bold text-purple-800 uppercase tracking-widest">
                          Active Phase Guidelines ({currentPhase})
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-neutral-500 font-bold mb-1.5 uppercase tracking-wide">Suggested Meals</p>
                          <ul className="space-y-1 text-purple-950/80">
                            {phaseDetailsObj.foods.slice(0, 3).map((f, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <span className="text-pink-500">•</span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-neutral-500 font-bold mb-1.5 uppercase tracking-wide">Workout Advice</p>
                          <ul className="space-y-1 text-purple-950/80">
                            {phaseDetailsObj.exercises.map((e, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <span className="text-purple-500">👟</span> {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================= */}
              {/* TAB 5: ARCHIVES / PAST PERIOD LOGS       */}
              {/* ========================================= */}
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-[2.5rem] shadow-sm">
                    <div className="flex justify-between items-center border-b border-pink-200/30 pb-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-purple-950 flex items-center gap-2">
                          <span>📜</span> Cycle History Log Archives
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">
                          Timeline records of configured cycle durations and registered boundaries.
                        </p>
                      </div>
                      <button
                        onClick={handleClearMemory}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold text-xs rounded-xl border border-rose-200 transition-all cursor-pointer"
                      >
                        Reset Data Memory
                      </button>
                    </div>

                    <div className="space-y-3">
                      {priorPeriodRecords.length === 0 ? (
                        <p className="text-xs text-neutral-400 italic text-center py-8">
                          No cycle boundaries registered yet. Submit stats in the Dashboard Hub.
                        </p>
                      ) : (
                        priorPeriodRecords.map((rec) => {
                          const isCurrentlyConfigured = rec.startDate === lastPeriodDate && rec.cycleLength === cycleLength;
                          return (
                            <div
                              key={rec.id}
                              className={`p-4 rounded-2.5xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                                isCurrentlyConfigured
                                  ? "bg-white border-pink-300 ring-2 ring-pink-150"
                                  : "bg-white/40 border-pink-100/60"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="p-1 px-2.5 bg-purple-100/80 text-[10px] font-bold text-purple-800 rounded-lg">
                                    START DATE
                                  </span>
                                  <span className="text-sm font-bold font-mono text-purple-950">
                                    {rec.startDate}
                                  </span>
                                  {isCurrentlyConfigured && (
                                    <span className="bg-pink-500 text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                                      Active Cycle
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-neutral-400 font-semibold gap-3 flex items-center">
                                  <span>Cycle Length: <strong>{rec.cycleLength} Days</strong></span>
                                  <span>•</span>
                                  <span>Fertility: Normal Range</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                  onClick={() => {
                                    setLastPeriodDate(rec.startDate);
                                    setCycleLength(rec.cycleLength);
                                    setInputDate(rec.startDate);
                                    setInputLength(rec.cycleLength);
                                    triggerToast(`Switched active configuration to ${rec.startDate}`);
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-pink-100/60 hover:bg-pink-100 border border-pink-200/50 text-pink-700 font-bold text-xs transition cursor-pointer select-none"
                                >
                                  Activate
                                </button>
                                <button
                                  onClick={() => handleDeletePeriodRecord(rec.id)}
                                  className="p-1.5 text-neutral-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                                  title="Delete record"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* INTERACTIVE COMPREHENSIVE VIEW OF DAILY TRENDS IN ROW STRUCTURE */}
                    <div className="mt-8 border-t border-purple-200/30 pt-6">
                      <h4 className="text-xs font-bold uppercase text-purple-800 tracking-widest mb-4">
                        Comprehensive Daily Fitness Logs List
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-medium border-collapse">
                          <thead>
                            <tr className="border-b border-purple-200/50 text-purple-950/40 uppercase text-[9px] tracking-widest">
                              <th className="py-2 px-3">Calendar Date</th>
                              <th className="py-2 px-3">Mood Score</th>
                              <th className="py-2 px-3">Physical Discomforts</th>
                              <th className="py-2 px-3">Self-Care Level</th>
                              <th className="py-2 px-3 text-right">State Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.values(logs).map((l) => {
                              const checkedCount = Object.values(l.wellness || {}).filter(Boolean).length;
                              return (
                                <tr key={l.date} className="border-b border-purple-100/30 hover:bg-white/40 transition">
                                  <td className="py-3 px-3 font-bold font-mono text-purple-950">
                                    {l.date}
                                  </td>
                                  <td className="py-3 px-3 font-semibold text-purple-900">
                                    {l.mood ? (
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200/40">
                                        {l.mood === "Happy" && "😊"}
                                        {l.mood === "Sad" && "😔"}
                                        {l.mood === "Stressed" && "⚡"}
                                        {l.mood === "Tired" && "🔋"}
                                        {l.mood === "Energetic" && "⭐"}
                                        {l.mood}
                                      </span>
                                    ) : (
                                      <span className="text-neutral-300 italic">Not logged</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3">
                                    {l.symptoms.length === 0 ? (
                                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Comfort state
                                      </span>
                                    ) : (
                                      <div className="flex flex-wrap gap-1">
                                        {l.symptoms.map((s) => (
                                          <span key={s} className="px-2 py-0.5 bg-pink-100/50 text-pink-700 text-[10px] font-bold rounded-md">
                                            {s}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold">{checkedCount}/4 ticks</span>
                                      <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-teal-500 rounded-full transition-all"
                                          style={{ width: `${(checkedCount / 4) * 100}%` }}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 text-right">
                                    {l.date === simDate ? (
                                      <span className="text-[10px] font-bold uppercase bg-pink-500 text-white px-2.5 py-0.5 rounded-full">
                                        Today
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-neutral-400 font-mono">
                                        Archived
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </section>

        </div>

      </div>

      {/* COMPACT FOOTER */}
      <footer className="mt-8 border-t border-purple-200/30 pt-6 max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-purple-950/40 gap-4">
        <p>© {new Date().getFullYear()} CycleSync Wellness. Elegant, safe, secure.</p>
        <div className="flex gap-6">
          <span className="hover:text-purple-700 transition">Confidentiality</span>
          <span>•</span>
          <span className="hover:text-purple-700 transition">My Wellness Dashboard</span>
          <span>•</span>
          <span className="hover:text-purple-700 transition">Self-care routines</span>
        </div>
      </footer>

    </div>
  );
}
