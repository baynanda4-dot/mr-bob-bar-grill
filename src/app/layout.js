// Next.js requires a root layout.js to exist, but the actual <html>/<body>
// (and everything locale-dependent) now lives in app/[locale]/layout.js —
// App Router only allows one <html> definition for the whole app, and
// since [locale] wraps every real route, that's the outermost layout that
// actually renders for anything. This file is intentionally just a
// pass-through.
export default function RootLayout({ children }) {
  return children;
}
