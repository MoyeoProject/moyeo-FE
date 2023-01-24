import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ButtonBasic, MasterButton } from '../../styles/DetailButtonStyle';
import { DetailMeetLinkButton } from '../DetailMeetLinkButton';

const DetailButton = ({ data, member }: any) => {
  const [showModal, setShowModal] = useState(false);
  const meetingEntranceBtn = () => {
    if (data.link) {
      window.open(`${data?.link}`);
    }
    // else {
    //  알람기능 되면 test
    //  alert('모임 시작 30분 전부터 입장 가능합니다');
    // }
  };
  console.log(data);
  return (
    <>
      {data?.master ? (
        <>
          {data?.link !== '' ? (
            <MasterButton>
              <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
                모임입장
              </ButtonBasic>
              <ButtonBasic activeBtn={false} cursorAct={true} onClick={() => setShowModal(true)}>
                입장 링크 수정
              </ButtonBasic>
              {showModal &&
                createPortal(
                  <DetailMeetLinkButton
                    platform={data?.platform}
                    isEdit={true}
                    onClose={() => setShowModal(false)}
                  />,
                  document.body
                )}
            </MasterButton>
          ) : (
            <>
              <ButtonBasic activeBtn={false} onClick={() => setShowModal(true)}>
                입장 링크를 입력해주세요
              </ButtonBasic>
              {showModal &&
                createPortal(
                  <DetailMeetLinkButton
                    platform={data?.platform}
                    isEdit={false}
                    onClose={() => setShowModal(false)}
                  />,
                  document.body
                )}
            </>
          )}
        </>
      ) : data?.attend ? (
        !data?.link ? (
          <ButtonBasic onClick={meetingEntranceBtn} activeBtn={false} cursorAct={false}>
            링크 개설 전 입니다
          </ButtonBasic>
        ) : (
          <ButtonBasic onClick={meetingEntranceBtn} activeBtn={true} cursorAct={true}>
            모임 입장
          </ButtonBasic>
        )
      ) : member?.length === data?.maxNum ? (
        <ButtonBasic activeBtn={false}>정원이 다 찼습니다</ButtonBasic>
      ) : (
        <ButtonBasic activeBtn={false}>모임에 참석한 후 입장 가능합니다</ButtonBasic>
      )}
    </>
  );
};

export default DetailButton;
