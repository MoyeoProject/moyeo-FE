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
  margin: 8px;
  font-size: 14px;
  :hover {
    border-radius: 50%;
    background-color: #F1F1F1;
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
  background-color: #666666;
  :hover {
    color: #000;
  }
}
.react-datepicker__day--keyboard-selected {
  border-radius: 50%;
  background-color: #666666;
  :hover {
    color: #000;
  }
}
`;
