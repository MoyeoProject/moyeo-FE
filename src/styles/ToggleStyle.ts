import styled from 'styled-components';

export const ToggleWrapper = styled.div``;

export const ToggleButton = styled.button`
  background-color: ${(props: { secret: boolean }) => (!props.secret ? 'none' : 'rgb(51,30,190)')};
  width: 130px;
  height: 50px;
  border-radius: 30px;
  border: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export const Circle = styled.div`
  background-color: white;
  width: 38px;
  height: 38px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props: { secret: boolean }) =>
    props.secret &&
    `
      transform: translate(80px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
