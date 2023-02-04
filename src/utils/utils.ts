export const calcStartDate = (startDate: Date) => {
  const year = String(startDate?.getFullYear());
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const date = String(startDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
};

export const calcStartTime = (startTime: string) => {
  const [hours, minutes] = startTime.split(':');
  return `${hours}:${minutes}:00`;
};

export const setTime = (startTime: string) => {
  return startTime.split(':').slice(0, 2).join(':');
};

export const setDate = (startDate: string) => {
  return startDate.split('-').slice(1).join('.');
};

export const countDownTimer = (
  currMeetingList: any,
  targetElement: React.RefObject<HTMLSpanElement>
) => {
  const willAttendDates = currMeetingList
    ?.map((obj: { startDate: string; startTime: string }) => {
      const [hours, mins, secs] = obj.startTime.split(':');
      const time = new Date(obj.startDate).setHours(+hours, +mins, +secs);
      return new Date(time).getTime();
    })
    .filter((time: number) => new Date(time) >= new Date());

  const closeDate = new Date(Math.min(...willAttendDates));
  const targetDate = closeDate.getTime();
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  const showTimer = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = String(Math.floor(difference / day)).padStart(2, '0');
    const hours = String(Math.floor((difference % day) / hour)).padStart(2, '0');
    const mins = String(Math.floor((difference % hour) / min)).padStart(2, '0');
    const secs = String(Math.floor((difference % min) / sec)).padStart(2, '0');

    if (targetElement.current) {
      targetElement.current.innerText = `${days} : ${hours} : ${mins} : ${secs}`;
    }
  };

  setInterval(showTimer, 1000);
};
