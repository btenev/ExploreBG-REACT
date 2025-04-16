export const formatDateToDDMMMYYYY = (inputDate: string) => {
  const [year, monthNumber, day] = inputDate.split('-');
  const date = new Date(Number(year), Number(monthNumber) - 1, Number(day));
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month} ${year}`;
};

export const formatDate = (inputDate: string | null): string | null => {
  if (!inputDate || typeof inputDate !== 'string') return null;

  const parts = inputDate.split('-');
  if (parts.length !== 3) return null;

  const [year, monthNumber, day] = parts;
  const date = new Date();
  date.setMonth(Number(monthNumber) - 1);
  const month = date.toDateString().split(' ')[1];

  return `${day} ${month} ${year}`;
};
