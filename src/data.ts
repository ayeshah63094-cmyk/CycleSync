/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenstrualPhase } from "./types";

export interface PhaseDetail {
  title: string;
  subtitle: string;
  description: string;
  symptoms: string[];
  foods: string[];
  exercises: string[];
  selfCare: string[];
  wellnessTip: string;
  color: string; // Tailwind color class
  accentColor: string; // hex representation
}

export const phaseDetails: Record<MenstrualPhase, PhaseDetail> = {
  [MenstrualPhase.Menstrual]: {
    title: "Menstrual Phase",
    subtitle: "Winter Phase • Days 1-5",
    description: "Your estrogen and progesterone levels are at their lowest. The uterus sheds its lining, which can cause cramping and fatigue. Your body is working hard, making this a natural time for rest, introspection, and structural recovery.",
    symptoms: ["Cramps", "Fatigue", "Lower Back Pain", "Bloating", "Mood Swings"],
    foods: ["Iron-rich foods (spinach, red meat, lentils)", "Warm herbal tea", "Dark chocolate", "Vitamin C (oranges, berries)"],
    exercises: ["Gentle stretching", "Light walking", "Restorative Yoga", "Breathing exercises"],
    selfCare: ["Use a heating pad for cramps", "Prioritize 8-9 hours of sleep", "Write down thoughts or journal", "Take warm baths"],
    wellnessTip: "Focus on deep resting and warm, nourishing foods. Do not force high-intensity workouts; your body needs energy to renew itself.",
    color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800",
    accentColor: "#fecdd3"
  },
  [MenstrualPhase.Follicular]: {
    title: "Follicular Phase",
    subtitle: "Spring Phase • Days 6-13",
    description: "Estrogen starts to rise, helping your uterine lining grow back and promoting follicular development. Your physical energy, optimism, and mental clarity start returning. This is the optimal window to plan new projects, socialize, and build new routines.",
    symptoms: ["Increasing Energy", "Clearer Skin", "Enhanced Digestion", "Higher Focus"],
    foods: ["Fermented foods (kimchi, yogurt)", "Cruciferous veggies (broccoli, cabbage)", "Healthy fats (avocado, nuts)", "Sprouted grains"],
    exercises: ["Jogging or running", "Moderate weight lifting", "Vinyasa flow yoga", "Social sports (tennis, hiking)"],
    selfCare: ["Initialize new goals or projects", "Schedule social meetups", "Exfoliate skin", "Try a new hobby or creative outlet"],
    wellnessTip: "As your energy rebounds, lean into creativity and planning. Your body metabolizes carbs well in this phase, so fuel up with diverse vitamins and fiber.",
    color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800",
    accentColor: "#fbcfe8"
  },
  [MenstrualPhase.Ovulation]: {
    title: "Ovulation Phase",
    subtitle: "Summer Phase • Days 14-15",
    description: "A surge of luteinizing hormone (LH) triggers the release of the egg. Estrogen and testosterone peak. You are likely experiencing your highest levels of confidence, communication skill, physical stamina, and libido.",
    symptoms: ["Mild Pelvic Pain (Mittelschmerz)", "Increased Libido", "Fluid Retention", "Peak Physical Energy"],
    foods: ["Antioxidant-rich berries", "Light, fresh salads", "Quinoa and whole grains", "Omega-3 rich seeds (chia, flaxseeding)"],
    exercises: ["High-Intensity Interval Training (HIIT)", "Vigorous aerobic dance", "Heavy weight training", "Circuit training"],
    selfCare: ["Deliver presentations or conduct negotiations", "Go out with friends", "Capture high-energy workouts", "Engage in community work"],
    wellnessTip: "This is your energetic summer! It is the perfect opportunity to hit personal workout records, hold key conversations, and shine socially.",
    color: "from-purple-100 to-purple-200 border-purple-300 text-purple-800",
    accentColor: "#e9d5ff"
  },
  [MenstrualPhase.Luteal]: {
    title: "Luteal Phase",
    subtitle: "Autumn Phase • Days 16-28",
    description: "Progesterone dominates to prepare the womb for potential pregnancy. If fertilization does not occur, hormone levels drop rapidly near the end of this phase, triggering PMS. Your body is turning inward; edit and organize your life.",
    symptoms: ["Water Retention", "Food Cravings", "Anxiety or Irritability", "Breast tenderness", "Sleep disturbances"],
    foods: ["Complex carbohydrates (sweet potatoes, brown rice)", "Magnesium-rich foods (bananas, spinach)", "Fiber to aid digestion", "Water to counter retention"],
    exercises: ["Pilates", "Steady-state cardio walking", "Strength maintenance", "Bodyweight flows"],
    selfCare: ["Declutter and organize your space", "Review budget and plan schedules", "Ssh... say 'no' to social overload", "Prioritize relaxing rituals"],
    wellnessTip: "PMS symptoms can surge as progesterone drops. Support your stable moods with complex carbohydrates, and switch your high-intensity training to comfortable pilates or steady walking.",
    color: "from-lavender-100 to-lavender-200 border-lavender-300 text-purple-900",
    accentColor: "#ddd6fe"
  }
};

export const sampleSqlSchema = `
-- =======================================================
-- CycleSync: Database Initialization and Table Designs
-- Database Engine: MySQL 8.x
-- =======================================================

CREATE DATABASE IF NOT EXISTS cyclesync_db;
USE cyclesync_db;

-- 1. Period Records Table: Tracks start dates and cycle lengths
CREATE TABLE IF NOT EXISTS period_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    cycle_length INT NOT NULL DEFAULT 28,
    calculated_phase VARCHAR(50) NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Moods Table: Log mood indicators per day
CREATE TABLE IF NOT EXISTS moods (
    mood_id INT AUTO_INCREMENT PRIMARY KEY,
    log_date DATE NOT NULL,
    user_mood VARCHAR(30) NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_daily_mood UNIQUE (log_date)
) ENGINE=InnoDB;

-- 3. Symptoms Table: Logs bodily symptoms noticed by the user
CREATE TABLE IF NOT EXISTS symptoms (
    symptom_id INT AUTO_INCREMENT PRIMARY KEY,
    log_date DATE NOT NULL,
    symptom_name VARCHAR(50) NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Supports recording multiple symptoms per day (compound index rather than unique)
    INDEX idx_symptom_date (log_date)
) ENGINE=InnoDB;

-- 4. Daily Wellness Checklist Table: Tracks self-care ticks
CREATE TABLE IF NOT EXISTS wellness_checklist (
    checklist_id INT AUTO_INCREMENT PRIMARY KEY,
    log_date DATE NOT NULL,
    drank_water BOOLEAN DEFAULT FALSE,
    slept_well BOOLEAN DEFAULT FALSE,
    exercised_today BOOLEAN DEFAULT FALSE,
    ate_healthy_food BOOLEAN DEFAULT FALSE,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_daily_wellness UNIQUE (log_date)
) ENGINE=InnoDB;

-- =======================================================
-- Insert Default Sample Data for Testing and Demonstration
-- =======================================================

-- Populate Period Records (Simulates previous cycle and current start)
INSERT INTO period_records (start_date, cycle_length, calculated_phase) VALUES 
('2026-05-18', 28, 'Luteal Phase'),
('2026-06-15', 28, 'Menstrual Phase');

-- Populate Mood logs (A few days backwards)
INSERT INTO moods (log_date, user_mood) VALUES 
('2026-06-14', 'Tired'),
('2026-06-15', 'Sad'),
('2026-06-16', 'Energetic');

-- Populate Symptom records
INSERT INTO symptoms (log_date, symptom_name) VALUES 
('2026-06-15', 'Cramps'),
('2026-06-15', 'Headache'),
('2026-06-16', 'Bloating');

-- Populate Wellness checklists
INSERT INTO wellness_checklist (log_date, drank_water, slept_well, exercised_today, ate_healthy_food) VALUES 
('2026-06-14', TRUE, FALSE, TRUE, FALSE),
('2026-06-15', TRUE, TRUE, FALSE, TRUE),
('2026-06-16', TRUE, TRUE, TRUE, TRUE);
`;

export const pythonMockCode = `'''
CycleSync - Smart Period Phase & Wellness Companion
Built for Python 3 with CustomTkinter & MySQL CRM Integration

To run this application, make sure you have installed:
    pip install customtkinter mysql-connector-python pillow

Make sure your MySQL database is active with the schema provided.
'''

import datetime
import tkinter as tk
from tkinter import messagebox
import customtkinter as ctk
import mysql.connector
from PIL import Image

# Set CustomTkinter design aesthetics
ctk.set_appearance_mode("light")  # Pastel aesthetics align perfectly in light mode
ctk.set_default_color_theme("pink")  # Built-in feminine pink theme

class DatabaseHelper:
    """Handles communication with local MySQL active schema"""
    def __init__(self):
        self.host = "localhost"
        self.user = "root"
        self.password = "yourpassword" # Replace with your local root password
        self.database = "cyclesync_db"
        self.connection = None

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                auth_plugin='mysql_native_password'
            )
            return True
        except mysql.connector.Error as err:
            print(f"DBMS connection error: {err}")
            return False

    def disconnect(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()

    def execute_query(self, query, params=None):
        """Standard transactional execution for write operations"""
        if not self.connect():
            return False
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, params or ())
            self.connection.commit()
            cursor.close()
            return True
        except mysql.connector.Error as err:
            print(f"Query write error: {err}")
            return False
        finally:
            self.disconnect()

    def fetch_all(self, query, params=None):
        """Helper for select operations"""
        if not self.connect():
            return []
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            results = cursor.fetchall()
            cursor.close()
            return results
        except mysql.connector.Error as err:
            print(f"Query select error: {err}")
            return []
        finally:
            self.disconnect()

class CycleSyncApp(ctk.CTk):
    """Core Python UI Controller utilizing OOP structure"""
    def __init__(self):
        super().__init__()
        
        self.db = DatabaseHelper()
        self.title("CycleSync - Smart Period Phase & Wellness Companion")
        self.geometry("1100x720")
        self.resizable(False, False)

        # Primary Colors
        self.theme_colors = {
            "pink": "#f472b6",
            "lavender": "#c084fc",
            "lavender_bg": "#f3e8ff",
            "soft_pink_bg": "#fce7f3",
            "dark_text": "#1e1b4b",
            "white": "#ffffff"
        }

        # Initialize core variables
        self.last_period_date = datetime.date.today().strftime("%Y-%m-%d")
        self.cycle_length = 28
        self.current_phase = "Menstrual Phase"

        # Build UI layout
        self.setup_ui()
        self.load_latest_cycle()

    def setup_ui(self):
        # Configure Grid Layout
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=1)

        # ----------------- SIDEBAR RAIL -----------------
        self.sidebar_frame = ctk.CTkFrame(self, corner_radius=0, fg_color="#fdf2f8", width=240)
        self.sidebar_frame.grid(row=0, column=0, sticky="nsew")
        self.sidebar_frame.grid_propagate(False)

        # App Title Logo
        logo_label = ctk.CTkLabel(
            self.sidebar_frame, 
            text="🌸 CycleSync", 
            font=ctk.CTkFont(family="Helvetica", size=24, weight="bold"),
            text_color="#db2777"
        )
        logo_label.pack(pady=(40, 5), padx=20)
        
        tagline_label = ctk.CTkLabel(
            self.sidebar_frame, 
            text="Smart Phase Companion", 
            font=ctk.CTkFont(family="Helvetica", size=12, slant="italic"),
            text_color="#86198f"
        )
        tagline_label.pack(pady=(0, 30))

        # Menu Buttons
        self.tab_dashboard_btn = ctk.CTkButton(
            self.sidebar_frame, text="📊 Dashboard", font=ctk.CTkFont(size=14, weight="bold"),
            fg_color="#f472b6", text_color="#ffffff", height=42, corner_radius=10,
            command=self.show_dashboard_tab
        )
        self.tab_dashboard_btn.pack(pady=10, padx=20, fill="x")

        self.tab_log_btn = ctk.CTkButton(
            self.sidebar_frame, text="✏️ Health Logs", font=ctk.CTkFont(size=14, weight="bold"),
            fg_color="transparent", text_color="#581c87", height=42, corner_radius=10,
            hover_color="#fbcfe8", command=self.show_log_tab
        )
        self.tab_log_btn.pack(pady=10, padx=20, fill="x")

        self.tab_history_btn = ctk.CTkButton(
            self.sidebar_frame, text="📜 History & DBMS Logs", font=ctk.CTkFont(size=14, weight="bold"),
            fg_color="transparent", text_color="#581c87", height=42, corner_radius=10,
            hover_color="#fbcfe8", command=self.show_history_tab
        )
        self.tab_history_btn.pack(pady=10, padx=20, fill="x")

        # Technical Project Footer
        footer_label = ctk.CTkLabel(
            self.sidebar_frame,
            text="Python & MySQL Project\nCycleSync Engine v1.0",
            font=ctk.CTkFont(size=10, family="Courier"),
            text_color="#db2777"
        )
        footer_label.pack(side="bottom", pady=25)

        # ----------------- MAIN VIEW REGION -----------------
        self.content_frame = ctk.CTkFrame(self, corner_radius=0, fg_color="#faf5ff")
        self.content_frame.grid(row=0, column=1, sticky="nsew")
        self.content_frame.grid_columnconfigure(0, weight=1)
        self.content_frame.grid_rowconfigure(0, weight=1)

        # Store sub-tabs
        self.dashboard_tab = self.create_dashboard_tab()
        self.log_tab = self.create_log_tab()
        self.history_tab = self.create_history_tab()

        self.show_dashboard_tab()

    # ----------------- CALCULATIONS -----------------
    def calculate_phase(self, start_date_str, cycle_len):
        try:
            start_date = datetime.datetime.strptime(start_date_str, "%Y-%m-%d").date()
            today = datetime.date.today()
            days_elapsed = (today - start_date).days
            
            # Use cycling modulo operator matching realistic DBMS engine behaviour
            cycle_day = (days_elapsed % cycle_len) + 1
            if cycle_day < 0:
                cycle_day += cycle_len

            if 1 <= cycle_day <= 5:
                return "Menstrual Phase"
            elif 6 <= cycle_day <= (cycle_len // 2) - 1:
                return "Follicular Phase"
            elif (cycle_len // 2) <= cycle_day <= (cycle_len // 2) + 1:
                return "Ovulation Phase"
            else:
                return "Luteal Phase"
        except Exception as e:
            print("Calculation error:", e)
            return "Menstrual Phase"

    # ----------------- VIEW SWITCHERS -----------------
    def reset_buttons(self):
        self.tab_dashboard_btn.configure(fg_color="transparent", text_color="#581c87")
        self.tab_log_btn.configure(fg_color="transparent", text_color="#581c87")
        self.tab_history_btn.configure(fg_color="transparent", text_color="#581c87")

    def show_dashboard_tab(self):
        self.reset_buttons()
        self.tab_dashboard_btn.configure(fg_color="#f472b6", text_color="#ffffff")
        self.log_tab.grid_forget()
        self.history_tab.grid_forget()
        self.dashboard_tab.grid(row=0, column=0, sticky="nsew")
        self.refresh_dashboard()

    def show_log_tab(self):
        self.reset_buttons()
        self.tab_log_btn.configure(fg_color="#f472b6", text_color="#ffffff")
        self.dashboard_tab.grid_forget()
        self.history_tab.grid_forget()
        self.log_tab.grid(row=0, column=0, sticky="nsew")

    def show_history_tab(self):
        self.reset_buttons()
        self.tab_history_btn.configure(fg_color="#f472b6", text_color="#ffffff")
        self.dashboard_tab.grid_forget()
        self.log_tab.grid_forget()
        self.history_tab.grid(row=0, column=0, sticky="nsew")
        self.refresh_history()

    # ----------------- CREATE SUB-PANELS -----------------
    def create_dashboard_tab(self):
        # Master dashboard container
        dash = ctk.CTkScrollableFrame(self.content_frame, fg_color="transparent")
        
        # Heading Card
        head_card = ctk.CTkFrame(dash, fg_color="#fff1f2", corner_radius=15, border_width=1, border_color="#fecdd3")
        head_card.pack(pady=15, padx=20, fill="x")
        
        self.dash_title = ctk.CTkLabel(
            head_card, text="Current Phase: Initializing...", 
            font=ctk.CTkFont(size=22, weight="bold"), text_color="#be185d"
        )
        self.dash_title.pack(pady=(12, 5), padx=20, anchor="w")

        self.dash_subtitle = ctk.CTkLabel(
            head_card, text="Winter Phase • Days 1-5", 
            font=ctk.CTkFont(size=14, slant="italic"), text_color="#9d174d"
        )
        self.dash_subtitle.pack(pady=(0, 10), padx=20, anchor="w")

        # Two-Column Layout (Left: Period Input, Right: Recommends Card)
        columns_frame = ctk.CTkFrame(dash, fg_color="transparent")
        columns_frame.pack(pady=10, padx=10, fill="both", expand=True)

        # Left Column Frame
        left_col = ctk.CTkFrame(columns_frame, fg_color="#ffffff", corner_radius=12, width=320)
        left_col.pack(side="left", fill="both", expand=True, padx=10, pady=5)

        ctk.CTkLabel(left_col, text="Cycle Sync Inputs", font=ctk.CTkFont(size=16, weight="bold"), text_color="#491060").pack(pady=12)

        ctk.CTkLabel(left_col, text="Last Period Start Date (YYYY-MM-DD):", font=ctk.CTkFont(size=12)).pack(pady=2)
        self.date_entry = ctk.CTkEntry(left_col, placeholder_text="e.g. 2026-06-15", width=180)
        self.date_entry.insert(0, self.last_period_date)
        self.date_entry.pack(pady=8)

        ctk.CTkLabel(left_col, text="Average Cycle Length (Days):", font=ctk.CTkFont(size=12)).pack(pady=2)
        self.length_entry = ctk.CTkEntry(left_col, placeholder_text="e.g. 28", width=180)
        self.length_entry.insert(0, str(self.cycle_length))
        self.length_entry.pack(pady=8)

        calc_btn = ctk.CTkButton(
            left_col, text="🔄 Calculate & Sync", fg_color="#a855f7", text_color="#ffffff",
            hover_color="#9333ea", command=self.save_cycle_record
        )
        calc_btn.pack(pady=15)

        # Right Column Frame (Personalised recommendations)
        right_col = ctk.CTkFrame(columns_frame, fg_color="#ffffff", corner_radius=12)
        right_col.pack(side="right", fill="both", expand=True, padx=10, pady=5)

        ctk.CTkLabel(right_col, text="✨ Wellness Recommendations", font=ctk.CTkFont(size=16, weight="bold"), text_color="#491060").pack(pady=12)
        
        self.rec_text = tk.Text(
            right_col, wrap="word", bg="#ffffff", fg="#1e1b4b", font=("Helvetica", 11),
            bd=0, highlightthickness=0, height=14, padx=15
        )
        self.rec_text.pack(pady=5, padx=10, fill="both", expand=True)

        # Bottom Tip Frame
        self.tip_frame = ctk.CTkFrame(dash, fg_color="#faf5ff", corner_radius=12, border_width=1, border_color="#e9d5ff")
        self.tip_frame.pack(pady=15, padx=20, fill="x")

        self.tip_label = ctk.CTkLabel(
            self.tip_frame, text="💡 Loading wellness insight...",
            font=ctk.CTkFont(size=13), text_color="#581c87", wraplength=700, justify="left"
        )
        self.tip_label.pack(pady=12, padx=15)

        return dash

    def create_log_tab(self):
        log_frame = ctk.CTkScrollableFrame(self.content_frame, fg_color="transparent")
        
        title_lbl = ctk.CTkLabel(
            log_frame, text="✏️ Submit Daily Symptoms & Activities", 
            font=ctk.CTkFont(size=20, weight="bold"), text_color="#581c87"
        )
        title_lbl.pack(pady=15, padx=20)

        # Logging Grid
        grid_container = ctk.CTkFrame(log_frame, fg_color="transparent")
        grid_container.pack(pady=10, fill="both", expand=True, padx=20)

        # Card 1: Mood Slider Selection
        mood_card = ctk.CTkFrame(grid_container, fg_color="#ffffff", corner_radius=12, width=380)
        mood_card.pack(side="left", fill="both", expand=True, padx=10, pady=10)

        ctk.CTkLabel(mood_card, text="🎭 Choose Daily Mood", font=ctk.CTkFont(size=15, weight="bold"), text_color="#491060").pack(pady=12)
        
        # Option Menu
        self.mood_var = ctk.StringVar(value="Happy")
        mood_dropdown = ctk.CTkOptionMenu(
            mood_card, variable=self.mood_var,
            values=["Happy", "Sad", "Stressed", "Tired", "Energetic"],
            fg_color="#db2777", button_color="#be185d", dropdown_fg_color="#fce7f3", dropdown_text_color="#1e1b4b"
        )
        mood_dropdown.pack(pady=15)

        save_mood_btn = ctk.CTkButton(
            mood_card, text="💾 Save Mood to DB", fg_color="#a855f7",
            command=self.save_mood_record
        )
        save_mood_btn.pack(pady=15)

        # Card 2: Symptoms Selection checkboxes
        symptom_card = ctk.CTkFrame(grid_container, fg_color="#ffffff", corner_radius=12)
        symptom_card.pack(side="left", fill="both", expand=True, padx=10, pady=10)

        ctk.CTkLabel(symptom_card, text="💥 Log Symptom Checked", font=ctk.CTkFont(size=15, weight="bold"), text_color="#491060").pack(pady=12)

        self.symptom_vars = {}
        symptom_list = ["Cramps", "Headache", "Bloating", "Fatigue", "Acne", "Mood Swings"]
        for sym in symptom_list:
            var = ctk.BooleanVar(value=False)
            self.symptom_vars[sym] = var
            cb = ctk.CTkCheckBox(symptom_card, text=sym, variable=var, text_color="#1e1b4b", checkbox_color="#f472b6")
            cb.pack(pady=4, anchor="w", padx=40)

        save_symptom_btn = ctk.CTkButton(
            symptom_card, text="💾 Save Symptoms", fg_color="#a855f7",
            command=self.save_symptoms_record
        )
        save_symptom_btn.pack(pady=15)

        # Card 3: Wellness Checklist Checkboxes
        well_card = ctk.CTkFrame(grid_container, fg_color="#ffffff", corner_radius=12)
        well_card.pack(side="left", fill="both", expand=True, padx=10, pady=10)

        ctk.CTkLabel(well_card, text="🥤 Everyday Wellness", font=ctk.CTkFont(size=15, weight="bold"), text_color="#491060").pack(pady=12)

        self.check_water = ctk.BooleanVar(value=False)
        self.check_sleep = ctk.BooleanVar(value=False)
        self.check_exercise = ctk.BooleanVar(value=False)
        self.check_diet = ctk.BooleanVar(value=False)

        cb1 = ctk.CTkCheckBox(well_card, text="Drank Water (8+ cups)", variable=self.check_water, checkbox_color="#a855f7")
        cb2 = ctk.CTkCheckBox(well_card, text="Slept Well (7-8h)", variable=self.check_sleep, checkbox_color="#a855f7")
        cb3 = ctk.CTkCheckBox(well_card, text="Exercised Today", variable=self.check_exercise, checkbox_color="#a855f7")
        cb4 = ctk.CTkCheckBox(well_card, text="Ate Healthy Meal", variable=self.check_diet, checkbox_color="#a855f7")

        cb1.pack(pady=6, anchor="w", padx=30)
        cb2.pack(pady=6, anchor="w", padx=30)
        cb3.pack(pady=6, anchor="w", padx=30)
        cb4.pack(pady=6, anchor="w", padx=30)

        save_well_btn = ctk.CTkButton(
            well_card, text="💾 Save Checklist", fg_color="#a855f7",
            command=self.save_wellness_checklist
        )
        save_well_btn.pack(pady=15)

        return log_frame

    def create_history_tab(self):
        history = ctk.CTkFrame(self.content_frame, fg_color="transparent")
        history.grid_columnconfigure(0, weight=1)
        history.grid_rowconfigure(0, weight=1)

        # Let's provide a split pane for previous records and executed query console
        split_frame = ctk.CTkFrame(history, fg_color="transparent")
        split_frame.pack(pady=10, padx=20, fill="both", expand=True)

        left_side = ctk.CTkFrame(split_frame, fg_color="#ffffff", corner_radius=12)
        left_side.pack(side="left", fill="both", expand=True, padx=5, pady=5)

        ctk.CTkLabel(left_side, text="📊 History Database Records", font=ctk.CTkFont(size=16, weight="bold"), text_color="#db2777").pack(pady=10)

        self.history_console = tk.Text(
            left_side, wrap="none", bg="#1e1b4b", fg="#a7f3d0", font=("Consolas", 10),
            padx=10, pady=10, bd=0
        )
        self.history_console.pack(fill="both", expand=True, padx=10, pady=10)

        # Clear DB option
        empty_db_btn = ctk.CTkButton(
            left_side, text="🗑️ Flush Sample Records", fg_color="#ef4444", hover_color="#dc2626",
            command=self.flush_database
        )
        empty_db_btn.pack(pady=10)

        return history

    # ----------------- DATABASE TRIGGERS -----------------
    def load_latest_cycle(self):
        rows = self.db.fetch_all("SELECT * FROM period_records ORDER BY record_id DESC LIMIT 1")
        if rows:
            self.last_period_date = str(rows[0]["start_date"])
            self.cycle_length = rows[0]["cycle_length"]
            self.current_phase = rows[0]["calculated_phase"]
        else:
            self.current_phase = self.calculate_phase(self.last_period_date, self.cycle_length)

    def save_cycle_record(self):
        val_date = self.date_entry.get()
        val_len = self.length_entry.get()

        try:
            # Simple UI validation
            datetime.datetime.strptime(val_date, "%Y-%m-%d")
            cycle_len_int = int(val_len)
            
            calc_phase = self.calculate_phase(val_date, cycle_len_int)
            self.last_period_date = val_date
            self.cycle_length = cycle_len_int
            self.current_phase = calc_phase

            success = self.db.execute_query(
                "INSERT INTO period_records (start_date, cycle_length, calculated_phase) VALUES (%s, %s, %s)",
                (val_date, cycle_len_int, calc_phase)
            )

            if success:
                messagebox.showinfo("Success", f"Cycle tracked and database record established! Phase: {calc_phase}")
                self.show_dashboard_tab()
            else:
                messagebox.showerror("Error", "Could not commit record to MySQL. Verify server connection!")

        except ValueError:
            messagebox.showerror("Input Error", "Invalid Start Date format or Cycle Length number!")

    def save_mood_record(self):
        today = datetime.date.today().strftime("%Y-%m-%d")
        mood_val = self.mood_var.get()

        # Update via upsert logic simulated or standard INSERT
        success = self.db.execute_query(
            "INSERT INTO moods (log_date, user_mood) VALUES (%s, %s) ON DUPLICATE KEY UPDATE user_mood=%s",
            (today, mood_val, mood_val)
        )
        if success:
            messagebox.showinfo("Success", f"Mood '{mood_val}' logged securely to database!")
        else:
            messagebox.showerror("DBMS Error", "Transaction failed.")

    def save_symptoms_record(self):
        today = datetime.date.today().strftime("%Y-%m-%d")
        logged_any = False
        
        # Flush today's previous logs to enable clean update
        self.db.execute_query("DELETE FROM symptoms WHERE log_date = %s", (today,))

        for symptom, var in self.symptom_vars.items():
            if var.get():
                logged_any = True
                self.db.execute_query(
                    "INSERT INTO symptoms (log_date, symptom_name) VALUES (%s, %s)",
                    (today, symptom)
                )
        
        if logged_any:
            messagebox.showinfo("Success", "Daily bodily symptoms recorded successfully!")
        else:
            messagebox.showinfo("Completed", "Reset checklist successfully")

    def save_wellness_checklist(self):
        today = datetime.date.today().strftime("%Y-%m-%d")
        w = self.check_water.get()
        s = self.check_sleep.get()
        e = self.check_exercise.get()
        f = self.check_diet.get()

        success = self.db.execute_query(
            """INSERT INTO wellness_checklist 
               (log_date, drank_water, slept_well, exercised_today, ate_healthy_food) 
               VALUES (%s, %s, %s, %s, %s)
               ON DUPLICATE KEY UPDATE 
               drank_water=%s, slept_well=%s, exercised_today=%s, ate_healthy_food=%s""",
            (today, w, s, e, f, w, s, e, f)
        )
        if success:
            messagebox.showinfo("Checklist Synchronized", "Your wellness checkpoints are now saved in MySQL!")
        else:
            messagebox.showerror("DBMS Error", "Failed to interact with DB.")

    def refresh_dashboard(self):
        # Gather recommendations list customized to self.current_phase
        self.dash_title.configure(text=f"Current: {self.current_phase}")
        
        recommends = {
            "Menstrual Phase": {
                "sub": "Winter Phase • Days 1-5 (Rest & Rehydrate)",
                "details": "■ Recommended Foods:\\n- Warm stew, soups, lentils\\n- Iron-rich spinach and red meats\\n- Dark chocolate & Herbal chamomile tea\\n\\n■ Recommended Physical Workouts:\\n- Gentle restorative Yoga\\n- Leisure walking (keep it under 30 minutes)\\n- Breathing exercises\\n\\n■ Practical Self-Care Tips:\\n- Apply electric hot bag on stomach\\n- Avoid caffeine and excessively salty food\\n- Guard boundaries and sleep early."
            },
            "Follicular Phase": {
                "sub": "Spring Phase • Days 6-13 (Nourish & Organize)",
                "details": "■ Recommended Foods:\\n- Sprouted seeds, yogurt, kimchi\\n- Fresh local vegetables, broccoli\\n- Avocados and olive oil fat fuels\\n\\n■ Recommended Physical Workouts:\\n- Jogging and steady power hikes\\n- Creative Vinyasa yoga flows\\n\\n■ Practical Self-Care Tips:\\n- Set active monthly resolutions\\n- Book business and social schedules\\n- Explore new hobbies."
            },
            "Ovulation Phase": {
                "sub": "Summer Phase • Days 14-15 (Peak Performance)",
                "details": "■ Recommended Foods:\\n- Strawberries, berries, high fiber salads\\n- Lean meat & cold-pressed juices\\n- Omega-3 fats (flax and sunflower seeds)\\n\\n■ Recommended Physical Workouts:\\n- High-intensity Interval routines (HIIT)\\n- Athletic power lifting & dance classes\\n\\n■ Practical Self-Care Tips:\\n- Present key items or negotiate contracts\\n- Network actively and meet friends\\n- Document ideas at peak cognitive power."
            },
            "Luteal Phase": {
                "sub": "Autumn Phase • Days 16-28 (Reflect & Wind Down)",
                "details": "■ Recommended Foods:\\n- Sweet potatoes, pumpkins, brown rice\\n- Bananas rich in Vitamin B6\\n- Magnesium-dense walnuts\\n\\n■ Recommended Physical Workouts:\\n- Structured Pilates and floor core workouts\\n- Calm endurance walking\\n\\n■ Practical Self-Care Tips:\\n- Declutter wardrobe and office tables\\n- Write down reflections in sleep diary\\n- Rest actively in evening hours."
            }
        }

        phase_data = recommends.get(self.current_phase, recommends["Menstrual Phase"])
        self.dash_subtitle.configure(text=phase_data["sub"])
        
        self.rec_text.delete("1.0", tk.END)
        self.rec_text.insert(tk.END, phase_data["details"])
        self.tip_label.configure(text=f"💡 Phase Wisdom: The {self.current_phase} is here. Stay tuned to your natural cycles.")

    def refresh_history(self):
        self.history_console.delete("1.0", tk.END)
        self.history_console.insert(tk.END, "=== Active DB History Pull ===\\n\\n")
        
        # 1. Pull period records
        periods = self.db.fetch_all("SELECT * FROM period_records")
        self.history_console.insert(tk.END, "--- LAST PERIOD LOGS ---\\n")
        if periods:
            for p in periods:
                self.history_console.insert(
                    tk.END, f"ID: {p['record_id']} | Date: {p['start_date']} | Len: {p['cycle_length']} -> {p['calculated_phase']}\\n"
                )
        else:
            self.history_console.insert(tk.END, "No period logs stored.\\n")
            
        # 2. Pull mood records
        moods = self.db.fetch_all("SELECT * FROM moods")
        self.history_console.insert(tk.END, "\\n--- DAILY MOOD HISTORY ---\\n")
        if moods:
            for m in moods:
                self.history_console.insert(tk.END, f"Date: {m['log_date']} | Mood State: {m['user_mood']}\\n")
        else:
            self.history_console.insert(tk.END, "No mood logs.\\n")

        # 3. Pull physical symptoms
        symptoms = self.db.fetch_all("SELECT * FROM symptoms")
        self.history_console.insert(tk.END, "\\n--- PHYSICAL SYMPTOMS ---\\n")
        if symptoms:
            for s in symptoms:
                self.history_console.insert(tk.END, f"Date: {s['log_date']} -> Symptoms: {s['symptom_name']}\\n")
        else:
            self.history_console.insert(tk.END, "No symptoms logged today.\\n")

        # 4. Pull wellness habits
        wellness = self.db.fetch_all("SELECT * FROM wellness_checklist")
        self.history_console.insert(tk.END, "\\n--- WELLNESS TRACKER LOGS ---\\n")
        if wellness:
            for w in wellness:
                self.history_console.insert(
                    tk.END, f"Date: {w['log_date']} | Water: {'Yes' if w['drank_water'] else 'No'} | "
                    f"Sleep: {'Yes' if w['slept_well'] else 'No'} | Gym: {'Yes' if w['exercised_today'] else 'No'} | "
                    f"Diet: {'Yes' if w['ate_healthy_food'] else 'No'}\\n"
                )
        else:
            self.history_console.insert(tk.END, "No wellness stats logged today.\\n")

    def flush_database(self):
        if messagebox.askyesno("Confirm Reset", "This executes MySQL TRUNCATE commands to flush table records. Proceed?"):
            self.db.execute_query("TRUNCATE TABLE period_records")
            self.db.execute_query("TRUNCATE TABLE moods")
            self.db.execute_query("TRUNCATE TABLE symptoms")
            self.db.execute_query("TRUNCATE TABLE wellness_checklist")
            messagebox.showinfo("Success", "Tables truncated. Live demo database starts fresh!")
            self.refresh_history()

if __name__ == "__main__":
    app = CycleSyncApp()
    app.mainloop()
`;

export const designBlueprintText = `
### 1. Project Overview
**CycleSync** is a smart personal health companion application designed specifically for menstrual cycle phase analysis, diagnostic symptom logging, everyday wellness habit-building, and personalized wellness recommendations. 

The application integrates an Object-Oriented **Python 3** GUI built with **CustomTkinter** for modern, eye-safe aesthetics (featuring gentle rounded corners, responsive input sliders, and soft pastel/lavender accents) connected dynamically to a **MySQL** relational database schema. This dual structure ensures critical historical data persistence, secure table tracking, and live DBMS querying.

### 2. Functional Requirements
- **Cycle Phase Calculator:** Users can input the starting date of their last period and average cycle length. The engine calculates the current cycle day and maps it to one of four key medical phases:
  - *Menstrual Phase (Days 1–5)*
  - *Follicular Phase (Days 6–13)*
  - *Ovulation Phase (Days 14–15)*
  - *Luteal Phase (Days 16–28)*
- **Personalized Recommendations Canvas:** Dynamic rendering of customizable self-care lists, food recommendations, physical workouts, and daily guidelines tailored to the calculated phase.
- **Micro-logging Mood Tracker:** Capture subjective psychological moods (Happy, Sad, Stressed, Tired, Energetic) and store records index-grouped by date.
- **Physical Symptom Directory Log:** Multiple-choice checkbox grids logging structural symptoms (Cramps, Headache, Bloating, Fatigue, Acne, Mood Swings) to MySQL history.
- **Daily Wellness Checklist:** Interactive checks for drinking enough water, getting 7-8 hours of sleep, exercising, and maintaining clean nutritional intake.
- **History Viewer and Database Inspector Console:** Provides real-time history summaries directly queried from the database records with options for wiping/truncating records to clean trials.

### 3. Database Design
The relational database system acts as the reliable persistent storage layer for cycle, checklist, mood, and physical state variables.
- **DBMS Brand:** MySQL Server 8.x / 5.7+
- **Connectivity:** TCP connection via \`mysql-connector-python\` or \`PyMySQL\`.
- **Relational Constraints:** 
  - Unique composite indices on logs prevents double logging on the same calendar day.
  - Cascade or separate clean-up logic ensures tables remain light.

### 4. Table Structure
- **Table 1: \`period_records\`**
  - \`record_id\` (INT, AUTO_INCREMENT, Primary Key)
  - \`start_date\` (DATE, NOT NULL): The start calendar day of logging.
  - \`cycle_length\` (INT, NOT NULL, DEFAULT 28): Days count.
  - \`calculated_phase\` (VARCHAR(50), NOT NULL): Computed cycle stage.
  - \`logged_at\` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

- **Table 2: \`moods\`**
  - \`mood_id\` (INT, AUTO_INCREMENT, Primary Key)
  - \`log_date\` (DATE, NOT NULL, UNIQUE): Serves as constraint to guarantee one record per calendar date.
  - \`user_mood\` (VARCHAR(30), NOT NULL): e.g. "Tired", "Energetic".
  - \`logged_at\` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

- **Table 3: \`symptoms\`**
  - \`symptom_id\` (INT, AUTO_INCREMENT, Primary Key)
  - \`log_date\` (DATE, NOT NULL): Correlates logs on specific calendar days.
  - \`symptom_name\` (VARCHAR(50), NOT NULL): e.g. "Cramps", "Headache". Includes non-unique index to permit multiple symptom rows on a single date.
  - \`logged_at\` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

- **Table 4: \`wellness_checklist\`**
  - \`checklist_id\` (INT, AUTO_INCREMENT, Primary Key)
  - \`log_date\` (DATE, NOT NULL, UNIQUE): Only one record per day.
  - \`drank_water\` (BOOLEAN, DEFAULT FALSE)
  - \`slept_well\` (BOOLEAN, DEFAULT FALSE)
  - \`exercised_today\` (BOOLEAN, DEFAULT FALSE)
  - \`ate_healthy_food\` (BOOLEAN, DEFAULT FALSE)
  - \`logged_at\` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 5. ER Diagram Explanation
The Entity-Relationship architecture establishes modular, cohesive tables mapped around dates:
- **Core Entity:** \`period_records\` works as a chronological tracker of global period starting boundaries.
- **Relational Cardinality & Cohesion:**
  - Standard user logins are simulated around daily dates.
  - \`moods\` and \`wellness_checklist\` tables enforce a 1-to-1 relationship relative to date because a user enters at most one aggregate feedback card for each specific day (\`log_date\` is set as a UNIQUE constraint).
  - \`symptoms\` represents a 1-to-Many relationship on any specific date since a user can select multiple simultaneous items (e.g. they might check both 'Cramps' and 'Fatigue' on 2026-06-15). Therefore, multiple rows exist with identical \`log_date\` fields.
  - Relationships are joined in reports using a standard \`LEFT JOIN\` query on \`log_date\`.

### 6. Application Workflow
1. **Application Launch / Handshake:** Python OOP runtime initializes CustomTkinter frames, establishes communication parameters, and executes diagnostic tests with MySQL.
2. **Cycle Loading:** The application pulls the latest record from \`period_records\` inside the database to compute current phase days elapsed since the start date.
3. **Calculating Engine:** Establishes modulo offset loops based on cycle length, generating follicular, ovulatory, luteal, or menstrual phases.
4. **Interactive Recommendation Updates:** Triggers UI component redraws, listing specific recipes, pilates/workouts, and self-care directions based on calculated results.
5. **Dynamic Health Logging:** User selects checkboxes or option menus. Triggers standard MySQL INSERT actions using an *ON DUPLICATE KEY UPDATE* (Upsert) wrapper, ensuring log robustness.
6. **Live History Rendering:** Period logs, symptoms arrays, and checks are queried together, rendering inside scrollable text feeds or terminal simulators.

### 7. UI Screen Layout Description
The CustomTkinter visual dashboard is arranged within a high-contrast widescreen layout:
- **Left Navigation Rail (Sidebar):** Flat light cream-white panel containing a pastel pink greeting label, CycleSync logo branding, styled toggle buttons for switching views (Dashboard, Health Logs, History Viewer), and a technical project subtitle footer.
- **Dynamic Content Panel (Right Viewport):**
  - **Dashboard Tab:** Features a header hero card styled with soft pink-to-lavender gradient fill, displaying primary calculations. Split into an active form inputs column (Last start date entry, length inputs, calculating command trigger buttons) and a gorgeous wellness advice log.
  - **Health Logs Tab:** Arranges three grid panels side-by-side with rounded borders. Card 1 holds the Mood OptionMenu selector. Card 2 has the detailed list of symptom checkmarks. Card 3 has the daily self-care tasks.
  - **History & DB Explorer Tab:** Dark terminal-style reader console loaded with real-time rows pulled from the SQL tables, complete with SQL operations logger and database flush controls.
`;
