import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import {
  ButtonBasic,
  ButtonDisabled,
  ButtonEdit,
  MasterButton,
} from '../../styles/DetailButtonStyle';
import DetailMeetLinkButton from '../DetailMeetLinkButton';

const DetailButton = ({ data }: any) => {
  const [showModal, setShowModal] = useState(false);

  const meetingLinkedit = () => {
    // 입장링크 수정
  };

  const meetingEntranceBtn = () => {
    if (data.link) {
      alert(`${data.platform}으로 입장합니다`);
      window.open(`http://${data?.link}`);
    }
    // else {
    //  알람기능 되면 test
    //  alert('모임 시작 30분 전부터 입장 가능합니다');
    // }
  };
  return (
    <>
      {data?.master ? (
        <>
          {data?.link !== '' ? (
            <MasterButton>
              <ButtonBasic onClick={meetingEntranceBtn}>모임입장</ButtonBasic>
              <ButtonEdit onClick={() => setShowModal(true)}>입장 링크 수정</ButtonEdit>
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
              <ButtonBasic onClick={() => setShowModal(true)}>입장 링크를 입력해주세요</ButtonBasic>
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
        <ButtonBasic onClick={meetingEntranceBtn}>모임 입장</ButtonBasic>
      ) : (
        <ButtonDisabled>모임에 참석한 후 입장 가능합니다</ButtonDisabled>
      )}
    </>
  );
};

export default DetailButton;
