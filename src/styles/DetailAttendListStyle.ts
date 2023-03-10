import styled from 'styled-components';

export const Box = styled.div`
  margin-bottom: 15px;
  padding: 0 16px;
  box-sizing: border-box;
  & > p {
    font-size: 14px;
    color: #666666;
    font-weight: 700;
    margin-bottom: 8px;
    & > span {
      color: #aaaaaa;
    }
  }
`;
export const MemberBox = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 4px;
`;
export const Out = styled.button`
  width: 65px;
  height: 32px;
  margin-right: 8px;
  border-radius: 8px;
  background-color: #e9e9e9;
  color: #666666;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`;
export const Member = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
  }
  & > span {
    margin-right: 4px;
    font-size: 14px;
    line-height: 20px;
  }
  .imgBox {
    margin-right: 11px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    & > img {
      margin-right: 11px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
`;
