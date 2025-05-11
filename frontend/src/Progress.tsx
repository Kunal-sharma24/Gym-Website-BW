import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const STORAGE_KEY = "monochrome-gym-progress";
const WEEKLY_KEY = "monochrome-gym-weekly-progress";

const fakeStartData = [
  { date: "2025-04-13", value: 60 },
  { date: "2025-04-14", value: 62 },
  { date: "2025-04-15", value: 61 },
  { date: "2025-04-16", value: 63 },
  { date: "2025-04-17", value: 64 },
  { date: "2025-04-18", value: 63.5 },
];

const defaultProgress = [
  { week: "Week 1", weight: 70, muscle: 40, fat: 20 },
  { week: "Week 2", weight: 69.5, muscle: 41, fat: 19.5 },
  { week: "Week 3", weight: 69, muscle: 41.5, fat: 19 },
  { week: "Week 4", weight: 68.5, muscle: 42, fat: 18.5 },
];

type ProgressEntry = { date: string; value: number };
type WeeklyEntry = { week: string; weight: number; muscle: number; fat: number };

type ProgressMode = "daily" | "weekly";

const Progress = () => {
  const [mode, setMode] = useState<ProgressMode>("daily");

  // Daily state
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVal, setNewVal] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);

  // Weekly state
  const [weekly, setWeekly] = useState<WeeklyEntry[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setEntries(JSON.parse(stored));
    else setEntries(fakeStartData);
    // Weekly
    const w = localStorage.getItem(WEEKLY_KEY);
    if (w) setWeekly(JSON.parse(w));
    else setWeekly(defaultProgress);
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);
  useEffect(() => {
    localStorage.setItem(WEEKLY_KEY, JSON.stringify(weekly));
  }, [weekly]);

  // Data entry/add/edit
  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || Number.isNaN(Number(newVal))) return;
    const exists = entries.find((en) => en.date === newDate);
    let next: ProgressEntry[];
    if (exists) {
      next = entries.map((en) =>
        en.date === newDate ? { date: newDate, value: Number(newVal) } : en
      );
    } else {
      next = [...entries, { date: newDate, value: Number(newVal) }];
    }
    setEntries(next.sort((a, b) => a.date.localeCompare(b.date)));
    setNewDate("");
    setNewVal("");
    dateRef.current?.focus();
  };

  const handleWeeklyChange = (index: number, field: keyof WeeklyEntry, value: string) => {
    const updated = [...weekly];
    updated[index][field] = Number.parseFloat(value) || 0;
    setWeekly(updated);
  };

  // Chart.js data for current mode
  let chartData, chartOptions;
  if (mode === "daily") {
    chartData = {
      labels: entries.map((e) => e.date),
      datasets: [
        {
          label: "Weight (kg)",
          data: entries.map((e) => e.value),
          borderColor: "#000",
          backgroundColor: "#fff",
          tension: 0.2,
          pointRadius: 6,
          pointBackgroundColor: "#000",
          pointBorderColor: "#fff",
        },
      ],
    };
    chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#fff" : "#111",
            font: { weight: "bold", size: 18 },
          },
          display: false,
        },
        title: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#1a1a1a" : "#000",
          titleColor: "#fff",
          bodyColor: "#fff",
        },
      },
      scales: {
        x: {
          ticks: {
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#eaeaea" : "#444",
            font: { size: 14 },
          },
          grid: { color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#444" : "#eee", display: true },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#eaeaea" : "#444",
            font: { size: 14 },
          },
          grid: { color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#444" : "#bbb2", borderDash: [2, 8] },
        },
      },
    };
  } else {
    chartData = {
      labels: weekly.map((w) => w.week),
      datasets: [
        {
          label: "Weight (kg)",
          data: weekly.map((w) => w.weight),
          borderColor: "#000",
          backgroundColor: "#fff",
          tension: 0.2,
          pointRadius: 6,
          pointBackgroundColor: "#222",
          pointBorderColor: "#fff",
        },
        {
          label: "Muscle (%)",
          data: weekly.map((w) => w.muscle),
          borderColor: "#555",
          backgroundColor: "#e5e5e5",
          tension: 0.2,
          pointRadius: 6,
          pointBackgroundColor: "#555",
          pointBorderColor: "#fff",
        },
        {
          label: "Body Fat (%)",
          data: weekly.map((w) => w.fat),
          borderColor: "#aaa",
          backgroundColor: "#fff",
          tension: 0.2,
          pointRadius: 6,
          pointBackgroundColor: "#bbb",
          pointBorderColor: "#fff",
        },
      ],
    };
    chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#fff" : "#111",
            font: { weight: "bold", size: 15 },
          },
          display: true,
        },
        title: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#1a1a1a" : "#111",
          titleColor: "#fff",
          bodyColor: "#fff",
        },
      },
      scales: {
        x: {
          ticks: {
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#eaeaea" : "#444",
            font: { size: 14 },
          },
          grid: { color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#444" : "#eee", display: true },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#eaeaea" : "#444",
            font: { size: 14 },
          },
          grid: { color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#444" : "#bbb2", borderDash: [2, 8] },
        },
      },
    };
  }

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Progress</h2>
      {/* Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode("daily")}
          className={`px-4 py-2 rounded font-bold border transition-colors duration-200 ${mode === "daily" ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "bg-white dark:bg-black text-black dark:text-white border-neutral-400 dark:border-neutral-700"}`}
        >
          Daily
        </button>
        <button
          onClick={() => setMode("weekly")}
          className={`px-4 py-2 rounded font-bold border transition-colors duration-200 ${mode === "weekly" ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "bg-white dark:bg-black text-black dark:text-white border-neutral-400 dark:border-neutral-700"}`}
        >
          Weekly
        </button>
      </div>
      {/* Input Panels */}
      <div className="bg-white dark:bg-black dark:text-white text-black rounded-xl shadow-lg border border-neutral-700/40 p-6 mb-12">
        {mode === "daily" ? (
          <form className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8" onSubmit={addEntry}>
            <input
              ref={dateRef}
              required
              type="date"
              value={newDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={e => setNewDate(e.target.value)}
              className="rounded px-3 py-2 border border-neutral-700 dark:bg-black bg-white focus:border-black dark:focus:border-white min-w-[120px] transition-colors"
            />
            <input
              required
              type="number"
              step="0.1"
              placeholder="Weight (kg)"
              value={newVal}
              onChange={e => setNewVal(e.target.value)}
              className="rounded px-3 py-2 border border-neutral-700 dark:bg-black bg-white focus:border-black dark:focus:border-white min-w-[120px] transition-colors"
            />
            <button
              className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded font-bold border-2 border-black dark:border-white transition-colors hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
              type="submit"
            >
              {entries.some(e => e.date === newDate) ? "Edit" : "Add"}
            </button>
          </form>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold tracking-tight">Weekly Analytics</h3>
              <button
                onClick={() => setEditMode(!editMode)}
                className="border border-black dark:border-white text-black dark:text-white font-semibold px-4 py-1 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {editMode ? "Save" : "Edit"}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-base">
                <thead className="bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white">
                  <tr>
                    <th className="p-2">Week</th>
                    <th className="p-2">Weight (kg)</th>
                    <th className="p-2">Muscle (%)</th>
                    <th className="p-2">Body Fat (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {weekly.map((entry, idx) => (
                    <tr key={entry.week} className="border-t border-neutral-400 dark:border-neutral-700">
                      <td className="p-2 font-bold">{entry.week}</td>
                      {editMode ? (
                        <>
                          <td className="p-2">
                            <input
                              type="number"
                              value={entry.weight}
                              onChange={(e) => handleWeeklyChange(idx, "weight", e.target.value)}
                              className="bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-neutral-500 rounded px-2 py-1 w-full"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={entry.muscle}
                              onChange={(e) => handleWeeklyChange(idx, "muscle", e.target.value)}
                              className="bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-neutral-500 rounded px-2 py-1 w-full"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={entry.fat}
                              onChange={(e) => handleWeeklyChange(idx, "fat", e.target.value)}
                              className="bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-neutral-500 rounded px-2 py-1 w-full"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-2">{entry.weight}</td>
                          <td className="p-2">{entry.muscle}</td>
                          <td className="p-2">{entry.fat}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {/* CHART (same look/style for both modes) */}
      <div className="w-full overflow-x-auto py-2 mb-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg flex justify-center">
        <div className="min-w-[320px] md:min-w-[500px] h-[260px]">
          <Line data={chartData} options={chartOptions as any} />
        </div>
      </div>
    </section>
  );
};

export default Progress;
