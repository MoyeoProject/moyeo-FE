import { subMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import cal_left_arrow_icon from '../../assets/cal_left_arrow_icon.svg';
import cal_right_arrow_icon from '../../assets/cal_right_arrow_icon.svg';
import { loadItem, saveItem } from '../../services/storage';

export default function Calendar({
  refetch,
  attendDates,
  setStartDate,
}: {
  refetch: () => void;
  attendDates: Array<number | undefined>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const getDayName = (date: Date) => {
    return date
      .toLocaleDateString('ko-KR', {
        weekday: 'long',
      })
      .substr(0, 1);
  };

  const createDate = (date: Date) => {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  };

  const handleClickPrev = (callback: () => void, monthDate: Date) => {
    callback();

    if (monthDate.getMonth() === 0) {
      saveItem('month', (12).toString());
      saveItem('year', (monthDate.getFullYear() - 1).toString());
      refetch();
    } else {
      saveItem('month', monthDate.getMonth().toString());
      saveItem('year', monthDate.getFullYear().toString());
      refetch();
    }
  };

  const handleClickNext = (callback: () => void, monthDate: Date) => {
    callback();

    if (monthDate.getMonth() + 2 === 13) {
      saveItem('month', (1).toString());
      saveItem('year', (monthDate.getFullYear() + 1).toString());
      refetch();
    } else {
      saveItem('month', (monthDate.getMonth() + 2).toString());
      saveItem('year', monthDate.getFullYear().toString());
      refetch();
    }
  };

  return (
    <DatePicker
      inline
      minDate={loadItem('keyword') !== 'calendar' ? new Date() : subMonths(new Date(), 999999)}
      onChange={(date: Date) => {
        setStartDate(date);
      }}
      dayClassName={(date: Date) =>
        getDayName(createDate(date)) === '일' ? 'calendar-sunday' : null
      }
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
      renderDayContents={(dayOfMonth: number, date?: Date | undefined) => {
        return (
          <>
            {attendDates.includes(date?.getTime()) ? <div className="calendar-badge"></div> : null}
            <span>{dayOfMonth}</span>
          </>
        );
      }}
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={'react-datepicker__navigation react-datepicker__navigation--previous'}
            onClick={() => handleClickPrev(decreaseMonth, monthDate)}
          >
            <img src={cal_left_arrow_icon} />
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString('ko', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <button
            aria-label="Next Month"
            className={'react-datepicker__navigation react-datepicker__navigation--next'}
            onClick={() => handleClickNext(increaseMonth, monthDate)}
          >
            <img src={cal_right_arrow_icon} />
          </button>
        </div>
      )}
    />
  );
}
