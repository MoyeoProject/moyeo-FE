import Swal from 'sweetalert2';

import { meetAttendExitApi } from '../services/api';
import './useAlertStyle.css';

export const handleEmailAlert = (email?: string) => {
  const emailAlert = `${email}로 인증코드를 발송하였습니다.`;
  const emailWarning = '이메일 주소 확인은 필수입니다.';
  Swal.fire({
    position: 'top',
    icon: 'success',
    iconColor: '#F1F1F1',
    title: email ? emailAlert : emailWarning,
    showConfirmButton: false,
    timer: 1500,
    width: '370px',
    toast: true,
  });
};

export const handleMemberOutAlert = () => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    iconColor: '#F1F1F1',
    title: '멤버를 내보냈습니다.',
    showConfirmButton: false,
    timer: 1500,
    width: '370px',
    toast: true,
  });
};

const handleClickAttnedExit = (id: string | undefined) => {
  meetAttendExitApi(id);
};

export const handleAttendAlert = (isAttend: boolean, id?: string) => {
  if (isAttend) {
    Swal.fire({
      position: 'top',
      width: '370px',
      icon: 'success',
      iconColor: '#F1F1F1',
      title: isAttend ? '참여완료' : '모임을 취소하셨습니다.',
      showConfirmButton: false,
      timer: 1300,
      toast: true,
    });
  } else {
    Swal.fire({
      position: 'top',
      width: '365px',
      title: '모임을 취소하시겠습니까?',
      text: '메인으로 이동합니다.',
      confirmButtonText: '네',
      cancelButtonText: '취소',
      icon: 'warning',
      iconColor: '#F1F1F1',
      showCancelButton: true,
      confirmButtonColor: '#aaaaaa',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        handleClickAttnedExit(id);
        Swal.fire({
          position: 'top',
          width: '370px',
          icon: 'success',
          iconColor: '#F1F1F1',
          title: '모임을 취소하셨습니다',
          showConfirmButton: false,
          timer: 1700,
          toast: true,
        });
        location.replace('/main');
      }
    });
  }
};
