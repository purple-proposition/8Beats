import { NextRequest, NextResponse } from "next/server";

// Server-side proxy for the Odesli / song.link API.
// api.song.link doesn't return CORS headers for arbitrary origins, so a
// browser fetch() straight to it gets silently blocked (curl "works" because
// curl never enforces CORS). Calling it from our own serverless function
// sidesteps that entirely — same-origin request from the browser's point of
// view, server-to-server on the way out.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "missing url param" }, { status: 400 });
  }

  const upstream = await fetch(
    "https://api.song.link/v1-alpha.1/links?url=" + encodeURIComponent(url),
    { headers: { Accept: "application/json" } }
  );

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "upstream lookup failed", status: upstream.status },
      { status: upstream.status }
    );
  }

  const data = await upstream.json();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
