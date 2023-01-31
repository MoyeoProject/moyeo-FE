import styled from 'styled-components';

export const NavBox = styled.div`
  height: 56px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .navArrow {
    display: flex;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
  }
  .navTitle {
    width: 100%;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const NavButtonBox = styled.div`
  display: flex;
  align-items: center;
  & > div {
    width: 25px;
    height: 25px;
    margin-left: 12px;
    & > span {
      font-size: 20px;
      cursor: pointer;
    }
  }
`;
