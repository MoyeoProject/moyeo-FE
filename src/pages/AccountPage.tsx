import { toast } from 'react-hot-toast';

import black_right_arrow_icon from '../assets/black_right_arrow_icon.svg';
import { handleClickLogoutAlert } from '../hooks/useAlert';
import { AccountBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { SubNav } from './AlarmListPage';

const AccountPage = () => {
  const handleClickLogout = () => {
    handleClickLogoutAlert();
  };

  return (
    <SubPageBox>
      <SubNav children={'계정'} />
      <AccountBox>
        <p>계정</p>
        <div>
          <span
            onClick={() => {
              toast('준비중인 페이지입니다');
            }}
          >
            계정 관리
          </span>
          <img src={black_right_arrow_icon} alt={black_right_arrow_icon} />
        </div>
        <div>
          <span onClick={() => handleClickLogout()}>로그아웃</span>
          <img src={black_right_arrow_icon} alt={black_right_arrow_icon} />
        </div>
      </AccountBox>
    </SubPageBox>
  );
};
export default AccountPage;
