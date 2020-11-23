export function getFormattedTime(time) {
  const d = new Date(time * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[d.getMonth()];
  const day = d.getDay();
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${h}:${m}`;
}
