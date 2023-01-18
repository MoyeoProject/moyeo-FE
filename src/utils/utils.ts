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

export const setTime = (startTime: string) => {
  return startTime.split(':').slice(0, 2).join(':');
};

export const setDate = (startDate: string) => {
  return startDate
    .split('-')
    .map((date, i) => {
      return i === 0 ? date.slice(2, 4) : date;
    })
    .join('.');
};
