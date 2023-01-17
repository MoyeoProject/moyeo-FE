import styled from 'styled-components';

export const Box = styled.div`
  margin-bottom: 15px;
  padding: 0 16px;
  box-sizing: border-box;
  & > p {
    font-size: 12px;
    color: #666666;
    font-weight: 700;
    margin-bottom: 12px;
    & > span {
      color: #aaaaaa;
    }
  }
`;
export const MemberBox = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 4px;
`;
export const Out = styled.button`
  width: 65px;
  height: 32px;
  border-radius: 4px;
  background-color: #e2806d;
  color: white;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  background-color: #aaaaaa;
  margin-right: 8px;
`;
export const Member = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .masterParents {
    position: relative;
  }
  .master {
    position: absolute;
    top: 0;
    right: 0;
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid gray;
    margin-right: 11px;
  }
  & > span {
    font-size: 14px;
    line-height: 20px;
  }
`;
