import styled from 'styled-components';

export const AttendantsProfileWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 16px 0;
  img {
    right: 20px;
    width: 32px;
    height: 32px;
    border: 1.5px solid #ffffff;
    border-radius: 50%;
    object-fit: cover;
  }
  & > p {
    position: absolute;
    left: 94px;
    font-size: 12px;
    color: #aaaaaa;
  }
`;

export const ImgWrap = styled.div`
  position: absolute;
  left: ${(props: { index: number }) => `${props.index * 28}px`};
`;
