import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleEmailAlert } from '../../hooks/useAlert';
import { emailAuthNumberApi, emailCheckApi } from '../../services/api';
import { emailRegex } from '../../services/regEx';
import { saveItem } from '../../services/storage';
import { AuthFormBox, EmailAuthButton, Label } from '../../styles/LoginFormStyle';

export const EmailAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const [emailCheck, setEmailCheck] = useState(false);
  const [emailAuthCheck, setEmailAuthCheck] = useState(false);

  // 정규식 확인
  const [emailRegExCheck, setEmailRegExCheck] = useState<boolean>(true);

  const handleEmailCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const emailValueCheck = emailRegex.test(email);
    if (email === '' || !emailValueCheck) {
      setEmailRegExCheck(false);
      return;
    }
    emailCheckApi(email)
      .then((res) => {
        setEmailRegExCheck(true);
        handleEmailAlert(email);
        setEmailCheck(true);
        saveItem('email', email);
        return res;
      })
      .catch((err) => {
        toast(err.response.data.statusMsg);
        setEmailCheck(false);
      });
  };

  const handleClickEamilAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // 인증email type 찾아야함, 일단 지금은 true로 넘어감
    // emailAuthNumberApi({ email, authNumber });
    if (!emailCheck) {
      handleEmailAlert();
      return;
    }
    toast('이메일 인증이 완료되었습니다');
    saveItem('emailAuthCheck', 'true');
    setEmailAuthCheck(true);
  };

  return (
    <AuthFormBox>
      <div className="inputBox">
        <p>이메일 </p>
        <div className="inputBtnBox">
          <input
            type="email"
            value={email || ''}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일 주소를 입력하세요"
            readOnly={emailAuthCheck ? true : false}
          />
          <EmailAuthButton
            onClick={handleEmailCheck}
            type="button"
            disabled={emailAuthCheck ? true : false}
            disabledStyle={emailAuthCheck ? true : false}
          >
            {!emailCheck ? '이메일 인증' : emailAuthCheck ? '인증완료' : '재전송'}
          </EmailAuthButton>
        </div>
        {!emailRegExCheck ? <Label warning={true}>이메일 형식을 확인하세요</Label> : null}
      </div>

      <div className="inputBox">
        <div className="inputBtnBox">
          <input
            type="text"
            placeholder="인증번호를 입력하세요"
            onChange={(e) => {
              setAuthNumber(e.target.value);
            }}
            readOnly={emailAuthCheck ? true : false}
          />
          <EmailAuthButton
            onClick={handleClickEamilAuth}
            type="button"
            disabled={emailAuthCheck ? true : false}
            disabledStyle={emailAuthCheck ? true : false}
          >
            {emailAuthCheck ? '인증완료' : '인증하기'}
          </EmailAuthButton>
        </div>
      </div>
    </AuthFormBox>
  );
};
