/**
 * A template (unlike a layout) remounts on every navigation, so this gives each
 * route a short fade-and-rise instead of a hard content swap.
 */
export default function Template({ children }) {
  return <div className="animate-page-in">{children}</div>;
}
