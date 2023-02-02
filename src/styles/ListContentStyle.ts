import styled from 'styled-components';

export const ListContentWrap = styled.div`
  & > button {
    display: flex;
    justify-content: space-between;
    text-align: start;
    background-color: #fff;
  }
`;

export const Title = styled.div`
  & > h3 {
    width: 120px;
    margin: 2px 0;

    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  font-size: 12px;
  color: #666666;
`;

export const Content = styled.div`
  & > span {
    font-size: 12px;
    color: #aaaaaa;
  }
`;
