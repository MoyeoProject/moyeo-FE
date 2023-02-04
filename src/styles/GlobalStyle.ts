import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
}
body{
  width: 375px;
  margin: 0 auto;
  background-color: #E5E5E5;
  box-shadow: 0px 4px 16px rgba(34, 34, 34, 0.05);
}
a {
  color: #000;
  :visited {
  color: #000;
}
}
button {
  cursor: pointer;
}
input, textarea, button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
}
input[type="file"] {
  display: none;
}
.react-datepicker {
  width: 100%;
  border: none;
}
.react-datepicker__header {
  border-bottom: none;
  background-color: #fff;
}
.react-datepicker__current-month {
  font-size: 16px;
  font-weight: 500;
}
.react-datepicker__week {
  display: flex;
  justify-content: space-between;
}
.react-datepicker__day {
  position: relative;
  margin: 8px;
  font-size: 14px;
  .react-datepicker__day--weekend {
  color: #7b7b7b;
}
  :hover {
    border-radius: 50%;
    color: #FF9C07;
    background-color: #FFF1DB;
  }
  :focus {
    border-radius: 50%;
    color: #FF9C07;
    background-color: #FFF1DB;
  }
}
.react-datepicker__day-names {
  margin-top: 16px;
}
.react-datepicker__day-name {
  margin: 8px;
  font-size: 14px;
  color: #AAAAAA;
}
.react-datepicker__day--selected {
  border-radius: 50%;
  color: #FF9C07;
  background-color: #FFF1DB;
}
.react-datepicker__day--keyboard-selected {
  border-radius: 50%;
  color: #FF9C07;
  background-color: #FFF1DB;
}
.react-datepicker__day--outside-month>:first-child {
  color: #ccc;
}
.calendar-sunday {
  color: #F87070;
}
.calendar-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #FF9C07;
}
`;
