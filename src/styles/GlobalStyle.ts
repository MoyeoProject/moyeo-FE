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
  :hover {
    border-radius: 50%;
    background-color: #F1F1F1;
  }
  :focus {
    border-radius: 50%;
    color: #fff;
    background-color: #FFC107;
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
  background-color: #FFC107;
}
.react-datepicker__day--keyboard-selected {
  border-radius: 50%;
  background-color: #FFC107;
}
.react-datepicker__badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #FF8F00;
}
`;
