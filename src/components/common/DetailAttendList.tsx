import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getAttendList } from '../../services/api';
import { MemberTypes } from '../../types/DetailTypes';

const DetailAttendList = ({ data }: any) => {
  const { id } = useParams();
  const { data: member } = useQuery(['member'], () => {
    return getAttendList(id);
  });
  const isMaster = data?.master;
  return (
    <Box>
      {member?.data.data.map((m: MemberTypes) => {
        return (
          <MemberBox key={m.userId} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {/* <p>방장 정보?</p> */}
              <img
                src={
                  m.profileUrl !== null
                    ? m.profileUrl
                    : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                }
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
              <span>{m.username}</span>
            </div>
            {isMaster ? (
              <>
                <button>팔로우</button>
                <button>내보내기</button>
              </>
            ) : (
              <button>팔로우</button>
            )}
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
