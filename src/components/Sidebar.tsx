"use client";

import { useState } from "react";

type Playlist = {
  id: number;
  name: string;
  trackCount: number;
  icon: string;
  color: string;
};

const PLAYLISTS: Playlist[] = [
  { id: 1, name: "Top Hits 2026", trackCount: 24, icon: "🔥", color: "from-rose-500 to-pink-600" },
  { id: 2, name: "Chill Vibes",   trackCount: 18, icon: "🌙", color: "from-purple-500 to-indigo-600" },
  { id: 3, name: "EDM Pulse",     trackCount: 31, icon: "⚡", color: "from-pink-500 to-rose-700" },
];

type SidebarProps = {
  activePlaylist: number;
  onSelectPlaylist: (id: number) => void;
};

export default function Sidebar({ activePlaylist, onSelectPlaylist }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white transition-all hover:bg-zinc-700 active:scale-95"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed md:relative top-0 left-0 h-full z-40",
          "w-64 flex-shrink-0",
          "bg-zinc-900/95 border-r border-zinc-800",
          "flex flex-col py-6 px-4 gap-2",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 px-2">
          {/* Equalizer bars */}
          <div className="flex items-end gap-[3px] h-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="eq-bar w-[3px] rounded-full bg-rose-500"
                style={{ height: `${[14, 20, 10, 18][i - 1]}px`, animationDelay: `${(i - 1) * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            8<span className="text-rose-500">Beats</span>
          </span>
        </div>

        {/* Section label */}
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-1">
          Your Playlists
        </p>

        {/* Playlist items */}
        <nav className="flex flex-col gap-2">
          {PLAYLISTS.map((pl) => (
            <button
              key={pl.id}
              onClick={() => { onSelectPlaylist(pl.id); setIsOpen(false); }}
              className={[
                "group flex items-center gap-3 px-3 py-3 rounded-xl text-left",
                "transition-all duration-200 ease-in-out",
                "hover:bg-zinc-800 active:scale-[0.98]",
                activePlaylist === pl.id
                  ? "bg-zinc-800 ring-1 ring-rose-500/40"
                  : "bg-transparent",
              ].join(" ")}
            >
              {/* Color dot / gradient icon */}
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${pl.color} text-base shrink-0 shadow-md`}
              >
                {pl.icon}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium truncate transition-colors ${
                    activePlaylist === pl.id ? "text-white" : "text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {pl.name}
                </p>
                <p className="text-xs text-zinc-500">{pl.trackCount} tracks</p>
              </div>
              {/* Active indicator */}
              {activePlaylist === pl.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-2 pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-600 text-center">8Beats v1.0 · 2026</p>
        </div>
      </aside>
    </>
  );
}
