import { subMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import cal_left_arrow_icon from '../../assets/cal_left_arrow_icon.svg';
import cal_right_arrow_icon from '../../assets/cal_right_arrow_icon.svg';
import { loadItem } from '../../services/storage';

export default function Calendar({
  attendDates,
  startDate,
  setStartDate,
}: {
  attendDates: Array<number | undefined>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <DatePicker
      inline
      minDate={loadItem('keyword') !== 'calendar' ? new Date() : subMonths(new Date(), 6)}
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date);
      }}
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
      renderDayContents={(dayOfMonth: number, date?: Date | undefined) => {
        return (
          <>
            {attendDates.includes(date?.getTime()) ? (
              <div className="react-datepicker__badge"></div>
            ) : null}
            <span>{dayOfMonth}</span>
          </>
        );
      }}
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div>
          {loadItem('keyword') !== 'calendar' ? (
            <button
              aria-label="Previous Month"
              className={'react-datepicker__navigation react-datepicker__navigation--previous'}
              onClick={decreaseMonth}
            >
              <img src={cal_left_arrow_icon} />
            </button>
          ) : null}
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString('ko', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
          {loadItem('keyword') !== 'calendar' ? (
            <button
              aria-label="Next Month"
              className={'react-datepicker__navigation react-datepicker__navigation--next'}
              onClick={increaseMonth}
            >
              <img src={cal_right_arrow_icon} />
            </button>
          ) : null}
        </div>
      )}
    />
  );
}
