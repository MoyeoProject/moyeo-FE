import styled from 'styled-components';

export const ListContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #f4f4f4;
`;

export const LeftBox = styled.div``;

export const RightBox = styled.div`
  & > img {
    width: 36px;
  }
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 12px;
  & > img,
  h3 {
    margin-right: 8px;
    font-size: 16px;
  }
`;

export const Content = styled.div`
  margin-bottom: 8px;
  color: #666666;
  font-size: 14px;
  & > p {
    width: 260px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const SubContent = styled.div`
  display: flex;
  margin-top: 8px;
  & > img {
    margin-right: 6px;
  }
  & > p {
    color: #aaaaaa;
    font-size: 12px;
  }
`;
