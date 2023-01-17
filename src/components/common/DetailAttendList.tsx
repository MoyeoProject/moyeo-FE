import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getAttendList } from '../../services/api';
import { MemberTypes } from '../../types/DetailTypes';
import FollowButton from './FollowButton';

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
                  <div className="masterParents">
                    <img
                      src={
                        m.profileUrl !== null
                          ? m.profileUrl
                          : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                      }
                    />
                    <span className="master">🎖️</span>
                  </div>
                  <span>{m.username}</span>
                </Member>
                <FollowButton userId={m.userId} followed={m.followed} />
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
                  />
                  <span>{m.username}</span>
                </Member>
                {data?.master ? (
                  <div>
                    <Out>내보내기</Out>
                    <FollowButton userId={m.userId} followed={m.followed} />
                  </div>
                ) : (
                  <FollowButton userId={m.userId} followed={m.followed} />
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
  margin-bottom: 15px;
  padding: 0 16px;
  box-sizing: border-box;
  p {
    font-size: 12px;
    color: #666666;
    font-weight: 700;
    margin-bottom: 12px;
    span {
      color: #aaaaaa;
    }
  }
`;
const MemberBox = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 4px;
`;
const Out = styled.button`
  width: 65px;
  height: 32px;
  border-radius: 4px;
  background-color: #e2806d;
  color: white;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  background-color: #aaaaaa;
  margin-right: 8px;
`;
const Member = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .masterParents {
    position: relative;
  }
  .master {
    position: absolute;
    top: 0;
    right: 0;
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid gray;
    margin-right: 11px;
  }
  span {
    font-size: 14px;
    line-height: 20px;
  }
`;

export default DetailAttendList;
