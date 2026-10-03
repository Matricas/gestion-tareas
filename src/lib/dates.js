const pad = (n) => String(n).padStart(2, "0");

// Fecha local en formato YYYY-MM-DD (toISOString usaría UTC y puede cambiar el día)
export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatShort(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
  });
}

export function formatLong(date) {
  return date.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
