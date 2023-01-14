import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}
body{
  width: 375px;
  /* height: 812px; 세로는 정확히 모르겠어서  */
  margin: 20px auto;
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
.user-profile {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
`;
