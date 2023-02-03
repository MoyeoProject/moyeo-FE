import React from 'react';
import styled from 'styled-components';

import { ReactComponent as NotFound } from '../assets/404page.svg';
import { SubPageBox } from '../styles/ProfileSubPageStyle';
import { SubNav } from './AlarmListPage';

const NotFoundPage = () => {
  return (
    <SubPageBox>
      <SubNav children={'오류페이지'} />
      <NotFoundBox>
        <NotFound />
      </NotFoundBox>
    </SubPageBox>
  );
};
const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 116px;
`;
export default NotFoundPage;
