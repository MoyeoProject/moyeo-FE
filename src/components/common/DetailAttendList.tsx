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
  const masterId = data?.masterId;
  const maxNum = data?.maxNum;
  const currentNum = member?.data.data.length;

  return (
    <Box>
      <p>
        참여인원 {currentNum}
        <span> / {maxNum}</span>
      </p>
      {member?.data.data.map((m: MemberTypes) => {
        return (
          <MemberBox key={m.userId}>
            {m.userId === masterId ? (
              <>
                <Member>
                  <img
                    src={
                      m.profileUrl !== null
                        ? m.profileUrl
                        : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                    }
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  />
                  <span>🎖️</span>
                  <span>{m.username}</span>
                </Member>
              </>
            ) : (
              <>
                <Member>
                  <img
                    src={
                      m.profileUrl !== null
                        ? m.profileUrl
                        : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                    }
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  />
                  <span>{m.username}</span>
                </Member>
                {data?.master ? (
                  <div>
                    <button>팔로우</button>
                    <button>내보내기</button>
                  </div>
                ) : (
                  <button>팔로우</button>
                )}
              </>
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
  p {
    font-size: 12px;
    color: #666666;
    font-weight: 700;
    span {
      color: #aaaaaa;
    }
  }
`;
const MemberBox = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;
const Member = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default DetailAttendList;
