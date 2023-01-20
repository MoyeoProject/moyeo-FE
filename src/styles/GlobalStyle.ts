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
`;
