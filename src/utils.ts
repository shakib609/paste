export const formatDate: (dateString: string) => string = dateString => {
  const d: Date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

export const capitalize: (str: string) => string = str => {
  const chars = str.split("");
  if (chars.length) chars[0] = chars[0].toUpperCase();
  return chars.join("");
};
