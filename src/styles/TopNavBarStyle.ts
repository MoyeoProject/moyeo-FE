import styled from 'styled-components';

export const TopNavBarWrap = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 375px;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f4;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  & > button {
    margin-right: 26px;
    background-color: #fff;
  }
  & > p {
    font-weight: 700;
    font-size: 16px;
  }
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-left: 12px;
  }
`;
