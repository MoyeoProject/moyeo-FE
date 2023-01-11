import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getAttendList } from '../../services/api';
import { MemberTypes } from '../../types/DetailTypes';

const DetailAttendList = () => {
  const { id } = useParams();
  const { data: member } = useQuery(['member'], () => {
    return getAttendList(id);
  });
  return (
    <Box>
      {member?.data.data.map((m: MemberTypes) => {
        return (
          <MemberBox key={m.userId}>
            <div>
              {/* <p>방장 정보?</p> */}
              <img src={m.profileUrl} style={{ width: '30px' }} />
              <span>{m.username}</span>
            </div>
            <button>팔로우</button>
            <button>내보내기</button>
          </MemberBox>
        );
      })}
    </Box>
  );
};
const Box = styled.div`
  border: 1px solid gray;
  margin-bottom: 15px;
`;
const MemberBox = styled.div`
  display: flex;
  padding: 10px;
  box-sizing: border-box;
`;
export default DetailAttendList;
