import styled from 'styled-components';

export const ButtonBasic = styled.button<{ activeBtn: boolean; cursorAct?: boolean }>`
  width: 343px;
  height: 54px;
  border-radius: 8px;
  background-color: ${(props) => (props.activeBtn ? '#FFA02D ' : '#F4F4F4')};
  color: ${(props) => (props.activeBtn ? 'white' : '#666666')};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: ${(props) => (props.cursorAct ? 'pointer' : 'default')};
  :hover {
    background-color: ${(props) => (props.activeBtn ? '#FF6F00' : '#666666')};
    color: #fff;
  }
`;
export const MasterButton = styled.div`
  width: 343px;
  display: flex;
  flex-grow: 1 1;
  justify-content: space-between;
  button:first-child {
    margin-right: 8px;
  }
`;

export const MasterLinkInput = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  input {
    width: 90%;
    padding-left: 10px;
    border: 1px solid #9cc8d2;
    border-radius: 8px;
    :focus {
      outline: 1px solid #9cc8d2;
    }
  }
  button {
    border-radius: 8px;
    background-color: #9cc8d2;
    height: 100%;
    width: 70px;
    color: white;
  }
  .cancle {
    color: #666666;
    font-weight: 500;
    background-color: #e9e9e9;
  }
`;

export const FollowStyleButton = styled.button<{
  BGcolor: string;
  color: string;
  hover: boolean;
}>`
  width: 65px;
  height: 32px;
  border-radius: 8px;
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  background-color: ${(props) => props.BGcolor};
  :hover {
    background-color: ${(props) => (props.hover ? '#666666' : '#ffb300')};
    color: ${(props) => (props.hover ? '#fff' : 'white')};
  }
`;
