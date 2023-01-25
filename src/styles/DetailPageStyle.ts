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
    margin-bottom: 85px;
  }
  .buttonBox {
    position: fixed;
    top: 812px;
    transform: translateY(-100%);
    padding: 16px;
    box-sizing: border-box;
    background-color: white;
  }
`;
