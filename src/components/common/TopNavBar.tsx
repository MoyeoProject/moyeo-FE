import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import banner_1 from '../../assets/banner_1.svg';
import cal_left_arrow_icon from '../../assets/cal_left_arrow_icon.svg';
import home_search_icon from '../../assets/home_search_icon.svg';
import logo from '../../assets/logo.svg';
import plus_icon from '../../assets/plus_icon.svg';
import user_img from '../../assets/user_img.svg';
import { getAlarm } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import {
  Badge2,
  BannerImg,
  LeftBox,
  ProfileImg,
  RightBox,
  TopBar,
  TopNavBarWrap,
} from '../../styles/TopNavBarStyle';
import Categories from './Categories';
import SearchForm from './SearchForm';
import SortbyCategories from './SortbyCategories';

export default function TopNavBar({ name }: { name: string }) {
  const { id } = useParams();

  useQuery({
    queryKey: ['alarm'],
    queryFn: getAlarm,
    onSuccess: (data) => {
      saveItem('existenceAlarm', data?.data.success);
    },
  });

  return name === 'home' ? (
    <TopNavBarWrap>
      <TopBar>
        <Link to="/main">
          <img src={logo} alt={logo} />
        </Link>
        <RightBox>
          <Link to="/search">
            <img src={home_search_icon} alt={home_search_icon} />
          </Link>
          <Link to="/post">
            <img src={plus_icon} alt={plus_icon} />
          </Link>
          <Link to="/profile">
            <ProfileImg src={!loadItem('profileUrl') ? user_img : loadItem('profileUrl')} />
            {loadItem('existenceAlarm') === 'true' && <Badge2></Badge2>}
          </Link>
        </RightBox>
      </TopBar>
      <SortbyCategories />
      {loadItem('keyword') !== 'calendar' && (
        <>
          <BannerImg>
            <img src={banner_1} alt={banner_1} />
          </BannerImg>
          <Categories />
        </>
      )}
    </TopNavBarWrap>
  ) : name === 'search' ? (
    <TopNavBarWrap>
      <LeftBox>
        <button type="button" onClick={() => history.back()}>
          <img src={cal_left_arrow_icon} alt={cal_left_arrow_icon} />
        </button>
        <SearchForm />
      </LeftBox>
    </TopNavBarWrap>
  ) : (
    <TopNavBarWrap>
      <LeftBox>
        <button type="button" onClick={() => history.back()}>
          <img src={cal_left_arrow_icon} alt={cal_left_arrow_icon} />
        </button>
        {name === 'profile' ? <p>나의 프로필</p> : <p>{id ? '모임 수정하기' : '모임 만들기'}</p>}
      </LeftBox>
    </TopNavBarWrap>
  );
}
