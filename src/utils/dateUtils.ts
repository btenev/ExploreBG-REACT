export const formatDateToDDMMMYYYY = (inputDate: string) => {
  const [year, monthNumber, day] = inputDate.split('-');
  const date = new Date(Number(year), Number(monthNumber) - 1, Number(day));
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month} ${year}`;
};
