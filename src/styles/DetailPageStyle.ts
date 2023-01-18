import styled from 'styled-components';

export const DetailBox = styled.div`
  height: 812px;
  position: relative;
  background-color: white;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const DetailTopBox = styled.div`
  position: sticky;
  top: 0px;
  width: 375px;
  box-sizing: border-box;
  background-color: white;
  z-index: 10;
`;
export const DetailMainBox = styled.div`
  height: 676px;
  position: relative;
`;
export const ButtonBox = styled.div`
  position: sticky;
  bottom: 0;
  padding: 16px;
  box-sizing: border-box;
`;
