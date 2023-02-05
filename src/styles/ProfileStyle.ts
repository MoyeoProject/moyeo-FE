import styled from 'styled-components';

export const ProfileWrap = styled.div`
  height: 100vh;
  padding-top: 74px;
  background-color: #fff;
`;

export const ProfileButton = styled.button`
  position: relative;
  background-color: transparent;
`;

export const ProfileImg = styled.img`
  width: ${(props: { isModal: boolean }) => (props.isModal ? '100px' : '88px')};
  height: ${(props: { isModal: boolean }) => (props.isModal ? '100px' : '88px')};
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileIcon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const ProfileDetail = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 226px;
  height: 50px;
  margin-left: 28px;
  cursor: pointer;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      font-weight: 500;
    }
    span {
      margin-top: 4px;
      font-weight: 700;
      color: #ff9c07;
    }
  }
`;

export const TopButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

export const UserInformation = styled.div`
  padding: 0 16px;
  padding-top: 12px;
  padding-bottom: 20px;
  border-bottom: 4px solid #f4f4f4;
  box-shadow: 0px 4px 16px rgba(34, 34, 34, 0.025);
  & > span {
    font-weight: 700;
    font-size: 16px;
  }
  & > p {
    margin-top: 8px;
    font-size: 14px;
  }
`;

export const BottomSettings = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f4f4f4;
  & > span {
    padding: 16px;
    font-weight: 400;
    font-size: 12px;
  }
  & > a {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-top: 1px solid #f4f4f4;
    & > span {
      position: relative;
    }
  }
`;
