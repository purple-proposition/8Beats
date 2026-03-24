"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Track = {
  id: number;
  title: string;
  artist: string;
  duration: number; // seconds
  cover: string;    // emoji fallback
  playlistId: number;
};

const TRACKS: Track[] = [
  // Top Hits 2026
  { id: 1, title: "Neon Horizon",   artist: "VOXEL",      duration: 213, cover: "🎆", playlistId: 1 },
  { id: 2, title: "Solar Rush",     artist: "PRISM",      duration: 187, cover: "🌅", playlistId: 1 },
  { id: 3, title: "Digital Heart",  artist: "KIRA",       duration: 241, cover: "💜", playlistId: 1 },
  // Chill Vibes
  { id: 4, title: "Midnight Rain",  artist: "Lune",       duration: 298, cover: "🌙", playlistId: 2 },
  { id: 5, title: "Soft Frequency", artist: "Aero",       duration: 265, cover: "☁️", playlistId: 2 },
  { id: 6, title: "Velvet Drift",   artist: "Moonly",     duration: 312, cover: "🌊", playlistId: 2 },
  // EDM Pulse
  { id: 7, title: "Thunder Drop",   artist: "SURGE",      duration: 195, cover: "⚡", playlistId: 3 },
  { id: 8, title: "Pulse 808",      artist: "NRG",        duration: 228, cover: "🔊", playlistId: 3 },
  { id: 9, title: "Overdrive",      artist: "FLUX",       duration: 204, cover: "🔥", playlistId: 3 },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type PlayerProps = { activePlaylist: number };

export default function Player({ activePlaylist }: PlayerProps) {
  const playlistTracks = TRACKS.filter((t) => t.playlistId === activePlaylist);
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);   // 0–100
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = playlistTracks[trackIdx] ?? TRACKS[0];

  // Reset track when playlist changes
  useEffect(() => {
    setTrackIdx(0);
    setProgress(0);
    setIsPlaying(false);
  }, [activePlaylist]);

  // Mock progress ticker
  const tick = useCallback(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        // Auto-next
        setTrackIdx((i) => (i + 1) % playlistTracks.length);
        return 0;
      }
      return prev + 100 / track.duration;
    });
  }, [track.duration, playlistTracks.length]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, tick]);

  const handlePrev = () => {
    setTrackIdx((i) => (i - 1 + playlistTracks.length) % playlistTracks.length);
    setProgress(0);
  };

  const handleNext = () => {
    setTrackIdx((i) => (i + 1) % playlistTracks.length);
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, pct)));
  };

  const currentTime = Math.floor((progress / 100) * track.duration);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4">

      {/* Album art */}
      <div className="relative animate-float">
        <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-br from-rose-900 via-zinc-900 to-purple-900 flex items-center justify-center text-7xl shadow-2xl animate-pulse-glow border border-zinc-700">
          {track.cover}
        </div>
        {/* Playing ring */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-2xl border-2 border-rose-500/50 animate-ping" />
        )}
      </div>

      {/* Track info */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">{track.title}</h2>
        <p className="text-sm text-zinc-400">{track.artist}</p>
      </div>

      {/* Progress bar */}
      <div className="w-full space-y-1">
        <div
          role="slider"
          aria-label="Track progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          className="w-full h-2 rounded-full bg-zinc-700 cursor-pointer overflow-hidden group relative"
          onClick={handleProgressClick}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setProgress((p) => Math.min(100, p + 2));
            if (e.key === "ArrowLeft")  setProgress((p) => Math.max(0, p - 2));
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Prev */}
        <button
          onClick={handlePrev}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
          aria-label="Previous track"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
          aria-label="Next track"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 3.14L8 16.14V9.86zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-zinc-400 hover:text-white transition-colors shrink-0"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
            </svg>
          ) : volume < 50 ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.5 12A4.5 4.5 0 0 0 16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={isMuted ? 0 : volume}
          onChange={(e) => { setVolume(+e.target.value); setIsMuted(false); }}
          className="flex-1"
          aria-label="Volume"
          style={{
            background: `linear-gradient(to right, #f43f5e ${isMuted ? 0 : volume}%, #3f3f46 ${isMuted ? 0 : volume}%)`,
          }}
        />
        <span className="text-xs text-zinc-500 w-7 text-right shrink-0">
          {isMuted ? 0 : volume}
        </span>
      </div>

      {/* Playlist track list */}
      <div className="w-full mt-2 space-y-1">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2 px-1">Up Next</p>
        {playlistTracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setTrackIdx(i); setProgress(0); setIsPlaying(true); }}
            className={[
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left",
              "transition-all duration-150 hover:bg-zinc-800 active:scale-[0.99]",
              i === trackIdx ? "bg-zinc-800 ring-1 ring-rose-500/30" : "",
            ].join(" ")}
          >
            <span className="text-lg w-8 text-center">{t.cover}</span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium truncate ${i === trackIdx ? "text-white" : "text-zinc-300"}`}>
                {t.title}
              </p>
              <p className="text-xs text-zinc-500 truncate">{t.artist}</p>
            </div>
            <span className="text-xs text-zinc-600 shrink-0">{formatTime(t.duration)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
