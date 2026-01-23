
export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    dateStyle: "medium"
  });
};

export function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

export function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 10800) return `${Math.floor(seconds / 3600)}h ago`; // up to 3 hours
  if (seconds < 86400) return formatTime(isoString); // up to 24 hours, today
  return formatDate(isoString);
};
