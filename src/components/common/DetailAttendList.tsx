import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import { ReactComponent as Frame_user } from '../../assets/Frame_user.svg';
import { ReactComponent as Icon_Master } from '../../assets/n_master.svg';
import { handleMemberOutAlert } from '../../hooks/useAlert';
import { memberOutApi } from '../../services/api';
import { Box, Member, MemberBox, Out } from '../../styles/DetailAttendListStyle';
import { MemberTypes } from '../../types/DetailTypes';
import { FollowButton } from './FollowButton';

const DetailAttendList = ({
  data,
  member,
  meetingAfter,
}: {
  data: any;
  member: any;
  meetingAfter: boolean;
}) => {
  const QueryClient = useQueryClient();
  const masterId = data?.masterId;
  const maxNum = data?.maxNum;
  const currentNum = member?.length;

  const useMemberOut = () => {
    return useMutation(memberOutApi, {
      onSuccess: (data) => {
        handleMemberOutAlert();
        location.reload();
        QueryClient.invalidateQueries(['memberOut']);
      },
    });
  };

  const { mutate: memberOut } = useMemberOut();
  const handleMemberOut = (userId: number) => {
    const meetingId = data?.id;
    Swal.fire({
      position: 'center',
      width: '365px',
      text: '멤버를 내보내기 하시겠습니까? 한번 내보낸 멤버는 다시 입장할 수 없습니다.',
      confirmButtonText: '네',
      cancelButtonText: '취소',
      icon: 'warning',
      iconColor: '#F1F1F1',
      showCancelButton: true,
      confirmButtonColor: '#aaaaaa',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        memberOut({ meetingId, userId });
        return;
      }
    });
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
                    <Icon_Master />
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
                    {!meetingAfter ? (
                      <Out
                        onClick={() => {
                          handleMemberOut(m.userId);
                        }}
                      >
                        내보내기
                      </Out>
                    ) : null}
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
