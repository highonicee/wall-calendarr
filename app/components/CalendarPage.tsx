"use client";

import { useState } from "react";
import { THEMES } from "../utils/themes";
import Calendar from "./Calendar";

export default function CalendarPage() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());

  return (
    <main
      className="min-h-screen flex items-start justify-center py-10 px-4 transition-colors duration-700"
      style={{ background: THEMES[month].pageBg }}
    >
      <Calendar onMonthChange={setMonth} />
    </main>
  );
}