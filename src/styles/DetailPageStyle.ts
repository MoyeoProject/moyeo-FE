import styled from 'styled-components';

export const DetailBox = styled.div`
  height: 812px;
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
    position: relative;
    height: 692px;
  }
  .buttonBox {
    position: absolute;
    bottom: 0;
    padding: 16px;
    box-sizing: border-box;
  }
`;
