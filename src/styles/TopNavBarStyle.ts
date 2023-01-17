import styled from 'styled-components';

export const TopNavBarWrap = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 375px;
  background-color: #fff;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-left: 12px;
  }
`;
