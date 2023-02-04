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
  .reviewFace {
    margin-bottom: 50px;
  }
  .reviewTitle {
    margin-bottom: 32px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
`;

export const ReviewIconBox = styled.div`
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
      font-size: 14px;
      color: #ff9c07;
    }
  }
`;
export const Good = styled.div`
  color: #ff9c07;
  p:hover {
    font-weight: 700;
    color: #ff6f00;
  }
`;
export const Bad = styled.div`
  p {
    color: #666666 !important;
  }
  p:hover {
    font-weight: 700;
    color: #666666;
  }
`;
