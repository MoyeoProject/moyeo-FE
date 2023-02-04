import styled from 'styled-components';

export const AttendantsProfileWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 210px;
  height: 32px;
  padding-top: 16px;
  & > img {
    position: absolute;
    left: 88px;
    font-size: 12px;
    color: #aaaaaa;
  }
  & > p {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: #666666;
  }
`;

export const ImgWrap = styled.div`
  position: absolute;
  left: ${(props: { index: number }) => `${props.index * 28}px`};
  & > img {
    right: 20px;
    width: 32px;
    height: 32px;
    border: 1.5px solid #ffffff;
    border-radius: 50%;
    object-fit: cover;
  }
`;
