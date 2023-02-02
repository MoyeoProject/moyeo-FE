import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Frame_user from '../../assets/Frame_user.svg';
import cal_left_arrow_icon from '../../assets/cal_left_arrow_icon.svg';
import logo from '../../assets/logo.svg';
import plus_icon from '../../assets/plus_icon.svg';
import search_icon from '../../assets/search_icon.svg';
import { getAlarm, getBanners } from '../../services/api';
import { loadItem, removeItem } from '../../services/storage';
import {
  Badge,
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

  const handleClickBack = () => {
    history.back();
    removeItem('currPost');
  };

  const bannerData = useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
  });

  const alarmData = useQuery({
    queryKey: ['alarm'],
    queryFn: getAlarm,
  });

  const randomBanner =
    bannerData.data?.data.data[Math.floor(Math.random() * bannerData.data?.data.data.length)];

  const existenceAlarm = alarmData.data?.data.success;

  return name === 'home' ? (
    <TopNavBarWrap>
      <TopBar>
        <Link to="/main">
          <img src={logo} alt={logo} />
        </Link>
        <RightBox>
          <Link to="/search">
            <img src={search_icon} alt={search_icon} />
          </Link>
          <Link to="/post">
            <img src={plus_icon} alt={plus_icon} />
          </Link>
          <Link to="/profile">
            <ProfileImg
              src={loadItem('profileUrl') === 'null' ? Frame_user : loadItem('profileUrl')}
            />
            {existenceAlarm && <Badge></Badge>}
          </Link>
        </RightBox>
      </TopBar>
      <SortbyCategories />
      {loadItem('keyword') !== 'calendar' && (
        <>
          <BannerImg>
            <img src={randomBanner} alt={randomBanner} />
          </BannerImg>
          <Categories />
        </>
      )}
    </TopNavBarWrap>
  ) : name === 'search' ? (
    <TopNavBarWrap>
      <LeftBox>
        <button type="button" onClick={() => handleClickBack()}>
          <img src={cal_left_arrow_icon} alt={cal_left_arrow_icon} />
        </button>
        <SearchForm />
      </LeftBox>
    </TopNavBarWrap>
  ) : (
    <TopNavBarWrap>
      <LeftBox>
        <button type="button" onClick={() => handleClickBack()}>
          <img src={cal_left_arrow_icon} alt={cal_left_arrow_icon} />
        </button>
        {name === 'profile' ? <p>프로필</p> : <p>{id ? '모임 수정하기' : '모임 만들기'}</p>}
      </LeftBox>
    </TopNavBarWrap>
  );
}
