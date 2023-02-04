import styled from 'styled-components';

export const ContentWrap = styled.div`
  & > button {
    display: flex;
    justify-content: space-between;
    text-align: start;
    background-color: #fff;
  }
  & > h3 {
    width: 120px;
    margin: 2px 0;
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: ellipsis;
  }
  & > p {
    font-size: 12px;
    color: #666666;
  }
`;

export const Content = styled.div`
  & > span {
    font-size: 12px;
    color: #aaaaaa;
  }
`;

export const SecretWrap = styled.div`
  position: absolute;
  top: 12px;
  right: 8px;
`;
