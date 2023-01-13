export const calcStartDate = (startDate: Date) => {
  const year = String(startDate?.getFullYear());
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const date = String(startDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
};
