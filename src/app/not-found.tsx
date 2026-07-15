export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 24,
        textAlign: "center",
        background: "#000000",
        color: "#f5f5f5",
        fontFamily:
          "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @font-face {
          font-family: 'Alpha Lyrae';
          src: url('/fonts/AlphaLyrae-Medium.woff2') format('woff2'),
               url('/fonts/AlphaLyrae-Medium.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Alpha Lyrae', Geist, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(96px, 20vw, 200px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#f5f5f5",
        }}
      >
        404
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ fontSize: 20, color: "#f5f5f5", margin: 0 }}>
          Please insert a disc
        </p>
        <p style={{ fontSize: 14, color: "#a3a3a3", margin: 0 }}>
          (this page does not exist)
        </p>
      </div>

      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: 40,
          padding: "0 20px",
          marginTop: 8,
          background: "#f2f2f2",
          color: "#0b0b0b",
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 400,
          textDecoration: "none",
        }}
      >
        Back to homepage
      </a>
    </div>
  );
}
