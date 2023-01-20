import styled from 'styled-components';

export const CommentBox = styled.div`
  position: relative;
  padding: 0 8px;
  box-sizing: border-box;
`;
export const CommentViewBox = styled.div`
  /* height: 376px; */
  height: 692px;
  padding-bottom: 36px;
  box-sizing: border-box;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  & > p {
    text-align: center;
    color: #aaaaaa;
  }
`;
export const CommentItem = styled.div<{ align: string; bgColor: string }>`
  margin-bottom: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => props.align};
  font-size: 12px;
  .commentMiniBox {
    display: flex;
    align-items: flex-start;
    & > img {
      width: 28px;
      height: 28px;
      margin-right: 9px;
      border-radius: 50%;
    }
    .username {
      font-size: 10px;
    }
    .userComment {
      max-width: 280px;
      margin-right: 4px;
      padding: 8px 14px;
      box-sizing: border-box;
      border-radius: 8px;
      color: ${(props) => props.color};
      background-color: ${(props) => props.bgColor};
      cursor: pointer;
    }
  }
  .date {
    margin-right: 4px;
    font-size: 8px;
  }
`;
export const InputBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  padding: 16px 0;
  box-sizing: border-box;
  background-color: white;
  & > form {
    width: 342px;
    height: 36px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-radius: 1000px;
    background-color: #f1f1f1;
    & > input {
      width: 90%;
      padding-left: 16px;
      background-color: #f1f1f1;
      outline: none;
    }
    & > input::placeholder {
      color: #aaaaaa;
    }
  }
`;
