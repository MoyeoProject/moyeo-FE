import styled from 'styled-components';

export const ToggleContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 42px;
  & > input {
    display: ${(props: { isInput: boolean }) => !props.isInput && 'none'};
  }
`;

export const ToggleLabel = styled.label`
  font-weight: 700;
  font-size: 16px;
  color: #666666;
`;

export const ToggleButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 28px;
  border: none;
  border-radius: 10000px;
  transition: all 0.5s ease-in-out;
  background-color: ${(props: { secret: boolean }) => (!props.secret ? 'none' : '#D9D9D9')};
`;

export const Circle = styled.div`
  position: absolute;
  left: 5%;
  width: 24px;
  height: 24px;
  border-radius: 50px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
  background-color: white;
  transition: all 0.5s ease-in-out;
  ${(props: { secret: boolean }) =>
    props.secret &&
    `
      transform: translate(90%, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

export const InputFieldBox = styled.div`
  display: flex;
`;

export const InputField = styled.input`
  width: auto;
  color: #aaaaaa;
  background-color: transparent;
`;

export const ArrowImg = styled.img``;
