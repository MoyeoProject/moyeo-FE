import Swal from 'sweetalert2';

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
