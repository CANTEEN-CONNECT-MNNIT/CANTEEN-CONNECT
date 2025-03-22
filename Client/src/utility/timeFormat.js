export const timeFormat = (time) => {
  if (!time) return '-';
  return new Date(time) !== new Date().toDateString()
    ? new Date(time).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : 'now';
};
