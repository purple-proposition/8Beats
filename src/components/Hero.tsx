"use client";

export default function Hero() {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl" />
        <div className="absolute -top-12 right-0 w-72 h-72 bg-pink-700/15 rounded-full blur-3xl" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-32 bg-rose-500/10 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 sm:py-14 px-6 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-5 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          Now Streaming
        </span>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-3 select-none">
          <span
            className="bg-gradient-to-r from-white via-rose-200 to-pink-400 bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            8
          </span>
          <span
            className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Beats
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 font-medium tracking-wide">
          Your{" "}
          <span className="text-rose-400 font-semibold">vibe</span>{" "}
          player
        </p>

        {/* Separator */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
          <div className="flex items-end gap-[3px]">
            {[12, 20, 8, 16, 10].map((h, i) => (
              <div
                key={i}
                className="eq-bar w-[3px] rounded-full bg-rose-500/70"
                style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
        </div>
      </div>
    </header>
  );
}
