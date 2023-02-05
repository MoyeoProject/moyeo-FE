import styled from 'styled-components';

export const TopNavBarWrap = styled.div`
  z-index: 2;
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

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e9e9e9;
  & > button {
    margin-right: 26px;
    background-color: #fff;
  }
  & > p {
    font-weight: 700;
    font-size: 18px;
  }
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  & > a {
    position: relative;
    margin-left: 12px;
  }
`;

export const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const BannerImg = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
  box-shadow: 0px 4px 16px rgba(34, 34, 34, 0.05);
  & > img {
    width: 342px;
    height: 150px;
    margin-top: 20px;
    border-radius: 16px;
    object-fit: cover;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 0;
  left: 32px;
  right: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ff8f00;
`;

export const Badge2 = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff8f00;
`;
