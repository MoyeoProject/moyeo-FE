import styled from 'styled-components';

export const DetailBox = styled.div`
  height: 100vh;
  position: relative;
  background-color: white;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .detailTopBox {
    position: sticky;
    top: 0px;
    width: 375px;
    box-sizing: border-box;
    background-color: white;
    z-index: 10;
  }
  .detailMainBox {
    margin-bottom: 85px;
  }
  .buttonBox {
    position: fixed;
    bottom: 0;
    z-index: 10;
    padding: 16px;
    box-sizing: border-box;
    background-color: white;
  }
`;
