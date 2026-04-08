"use client";

import { useEffect, useState } from "react";
import { MonthTheme } from "../utils/themes";

type Props = {
  monthLabel: string;
  theme: MonthTheme;
};

export default function NotesPanel({ monthLabel, theme }: Props) {
  const storageKey = `wall-calendar-notes-${monthLabel}`;

  const [notes, setNotes] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(storageKey) ?? "";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setNotes(localStorage.getItem(storageKey) ?? "");
  }, [storageKey]);

  function handleChange(value: string) {
    setNotes(value);
    localStorage.setItem(storageKey, value);
  }

  function handleDownload() {
    if (!notes.trim()) return;
    const blob = new Blob([notes], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${monthLabel}-notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3
          id="notes-label"
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: theme.noteLabel }}
        >
          Notes
        </h3>
        <button
          onClick={handleDownload}
          disabled={!notes.trim()}
          aria-label={`Download notes for ${monthLabel} as a text file`}
          className="text-xs px-3 py-1 rounded-full border transition-all duration-200"
          style={notes.trim() ? {
            borderColor: theme.saveBtnBorder,
            color:       theme.saveBtnText,
            cursor:      "pointer",
          } : {
            borderColor: theme.noteBorder,
            color:       theme.notePlaceholder,
            cursor:      "not-allowed",
          }}
          onMouseEnter={e => {
            if (notes.trim())
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.saveBtnHoverBg;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
          }}
        >
          ↓ Save
        </button>
      </div>

      <textarea
        value={notes}
        onChange={e => handleChange(e.target.value)}
        placeholder={`Notes for ${monthLabel}…`}
        rows={7}
        aria-labelledby="notes-label"
        className="w-full resize-none rounded-xl p-3 text-sm outline-none transition-all duration-200"
        style={{
          backgroundColor: theme.noteBg,
          border:          `1px solid ${theme.noteBorder}`,
          color:           theme.noteText,
        }}
        onFocus={e => {
          e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.noteFocusRing}`;
        }}
        onBlur={e => {
          e.currentTarget.style.boxShadow = "";
        }}
      />

      {notes.length > 0 && (
        <p
          aria-live="polite"
          aria-label={`${notes.length} characters`}
          className="text-right text-xs"
          style={{ color: theme.charCount }}
        >
          {notes.length} chars
        </p>
      )}
    </div>
  );
}