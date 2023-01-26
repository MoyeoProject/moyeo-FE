import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ReactComponent as FramePlusIcon } from '../../assets/Frame_plus.svg';
import { ReactComponent as Frame_user } from '../../assets/Frame_user.svg';
import { handleMemberOutAlert } from '../../hooks/useAlert';
import { memberOutApi } from '../../services/api';
import { Box, Member, MemberBox, Out } from '../../styles/DetailAttendListStyle';
import { MemberTypes } from '../../types/DetailTypes';
import FollowButton from './FollowButton';

// type DetailAttendType = {
//   data: DetailTypes[]
//   member: MemberTypes[]
//  서로 다른 두 데이터를 props으로 넘길
// }

const DetailAttendList = ({ data, member }: any) => {
  const QueryClient = useQueryClient();
  const masterId = data?.masterId;
  const maxNum = data?.maxNum;
  const currentNum = member?.length;

  const useMemberOut = () => {
    return useMutation(memberOutApi, {
      onSuccess: (data) => {
        console.log(data);
        handleMemberOutAlert();
        location.reload();
        QueryClient.invalidateQueries(['memberOut']);
      },
    });
  };

  const { mutate: memberOut } = useMemberOut();
  const handleMemberOut = (userId: number) => {
    const meetingId = data?.id;
    memberOut({ meetingId, userId });
  };

  return (
    <Box>
      <p>
        참여인원 {currentNum}
        <span> / {maxNum}</span>
      </p>
      {member?.map((m: MemberTypes) => {
        return (
          <MemberBox key={m.userId}>
            {m.userId === masterId ? (
              <>
                <Member>
                  <div className="imgBox">
                    {m.profileUrl !== null ? <img src={m.profileUrl} /> : <Frame_user />}
                  </div>
                  <div>
                    <span>{m.username}</span>
                    <FramePlusIcon />
                  </div>
                </Member>
                <FollowButton userId={m.userId} followed={m.followed} />
              </>
            ) : (
              <>
                <Member>
                  <div className="imgBox">
                    {m.profileUrl !== null ? <img src={m.profileUrl} /> : <Frame_user />}
                  </div>
                  <span>{m.username}</span>
                </Member>
                {data?.master ? (
                  <div>
                    <Out
                      onClick={() => {
                        handleMemberOut(m.userId);
                      }}
                    >
                      내보내기
                    </Out>
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

export default DetailAttendList;
