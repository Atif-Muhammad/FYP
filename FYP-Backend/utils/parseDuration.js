export function parseDuration(str) {
  const lower = str.toLowerCase().trim();

  // Handle "Until I change" — means no auto deletion
  if (lower === "until i change") return null;

  const num = parseInt(lower.match(/\d+/)?.[0] || "0", 10);
  if (num <= 0) return null;

  if (lower.includes("hour")) return num * 60 * 60 * 1000;
  if (lower.includes("day")) return num * 24 * 60 * 60 * 1000;
  if (lower.includes("week")) return num * 7 * 24 * 60 * 60 * 1000;

  return null;
}
