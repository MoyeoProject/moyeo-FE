import styled from 'styled-components';

export const ReviewBox = styled.div`
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 56px;
  box-sizing: border-box;
  .reviewTitle {
    margin-bottom: 32px;
  }
  .reviewIconBox {
    width: 210px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      p {
        margin-top: 8px;
      }
    }
  }
`;
