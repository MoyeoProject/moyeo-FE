import styled from 'styled-components';

export const ModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 343px;
  height: fit-content;
  padding: 16px;
  border-radius: 15px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

export const ModalTitle = styled.p`
  text-align: ${(props: { align: string }) => props.align};
  padding: 16px 0;
  font-weight: 700;
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Overlay = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.7); */
  background: rgba(0, 0, 0, 0.2);
`;

export const OptionsBox = styled.div`
  display: flex;
  justify-content: ${(props: { name: string }) =>
    props.name === 'duration' || props.name === 'maxNum' ? 'center' : ' flex-start'};
  align-items: center;
  margin: ${(props: { name: string }) =>
    props.name === 'duration' || props.name === 'maxNum' ? '0 12px' : '16px 12px'};
  border-bottom: ${(props: { name: string }) =>
    props.name === 'duration' || props.name === 'maxNum' ? '1px solid #E1E1E1' : ' none'};
  & > button {
    margin-left: ${(props: { name: string }) =>
      props.name === 'duration' || props.name === 'maxNum' ? 0 : ' 8px'};
    padding: ${(props: { name: string }) =>
      props.name === 'duration' || props.name === 'maxNum' ? '12px' : 0};
    font-size: 16px;
    color: #aaaaaa;
    background-color: transparent;
    :focus,
    :hover {
      color: #000;
    }
  }
`;
