<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment workflow

- The entire UI lives in `public/8beats.html` (served via `src/app/route.ts`).
- Fonts are in `public/fonts/`.
- **Always push directly to `main`** — no branches, no PRs. Vercel deploys to production automatically within ~1 min of each push to `main` at https://8beats.vercel.app
- Vercel project: `8beats` (`prj_ZcEdZsck34hkzw9CxRE0wZ41wBhO`), team `purple-proposition`.
