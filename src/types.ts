/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum MenstrualPhase {
  Menstrual = "Menstrual Phase",
  Follicular = "Follicular Phase",
  Ovulation = "Ovulation Phase",
  Luteal = "Luteal Phase"
}

export type MoodType = "Happy" | "Sad" | "Stressed" | "Tired" | "Energetic";

export type SymptomType = "Cramps" | "Headache" | "Bloating" | "Fatigue" | "Acne" | "Mood Swings";

export interface WellnessChecklist {
  water: boolean;
  sleep: boolean;
  exercise: boolean;
  healthy_food: boolean;
}

export interface PeriodRecord {
  id: number;
  last_start_date: string; // YYYY-MM-DD
  cycle_length: number;
  calculated_phase: MenstrualPhase;
  created_at: string;
}

export interface MoodRecord {
  id: number;
  date: string;
  mood: MoodType;
}

export interface SymptomRecord {
  id: number;
  date: string;
  symptom: SymptomType;
}

export interface WellnessRecord {
  id: number;
  date: string;
  water: boolean;
  sleep: boolean;
  exercise: boolean;
  healthy_food: boolean;
}

export interface SqlQueryLog {
  id: string;
  timestamp: string;
  query: string;
  affectedRows: number;
}
