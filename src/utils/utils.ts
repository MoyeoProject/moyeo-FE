export const calcStartDate = (startDate: Date) => {
  const year = String(startDate?.getFullYear());
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const date = String(startDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
};

export const calcStartTime = (startTime: string) => {
  const [time, modifier] = startTime.split(' ');
  const [hours, minutes] = time.split(':');

  let newHours = hours === '12' ? '00' : hours;
  newHours = modifier === 'pm' ? String(parseInt(hours, 10) + 12) : newHours;

  return `${newHours}:${minutes}:00`;
};
