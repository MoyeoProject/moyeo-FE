import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getDetailPage } from '../services/api';

// import { useDetailIntro } from '../hooks/useDetailList';

const DetailPage = () => {
  const navigate = useNavigate();
  const [categories, setCategoreis] = useState('intro');

  const { id } = useParams();
  const { isLoading, data, isError } = useQuery(['detail'], () => {
    return getDetailPage(id as string);
  });
  console.log(data);

  return (
    <>
      {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>로딩중입니다</h2> : null}
      <div className="detail_nav">
        <button
          onClick={() => {
            navigate('/main');
          }}
        >
          뒤로가기
        </button>
        <span>모임이름</span>
        <button>알림아이콘</button>
        <button>모임공유</button>
        <button>수정아이콘</button>
      </div>

      <div className="detail_tab">
        <button type="button" onClick={() => setCategoreis('intro')}>
          소개
        </button>
        <button type="button" onClick={() => setCategoreis('comment')}>
          댓글
        </button>
      </div>

      {categories === 'intro' ? (
        <>
          <h2>소개</h2>
          <div>DetailIntro</div>
          <div>
            <p>모임 이름 : {data ? data.data[0].title : null}</p>
            <p>카테고리</p>
            <p>모임</p>
            <p>날짜</p>
            <p>모임 시간</p>
            <p>모임 기간</p>
            <p>이용 플랫폼</p>
          </div>
          <div>
            <p>방장 정보</p>
            <p>참여멤버 정보</p>
            <p>참여멤버 팔로우</p>
            <p>참여멤버 추방</p>
            <p>입장 링크 입력</p>
          </div>
        </>
      ) : (
        <>
          <h2>댓글</h2>
          <div>DetailComment</div>
          <div>
            <span>댓글내용</span>
            <p>작성자 사진</p>
            <p>작성자 이름</p>
            <p>작성 일자</p>
            <p>작성 내용</p>
            <button>삭제</button>
          </div>
          <div>
            <span>댓글내용</span>
            <p>작성자 사진</p>
            <p>작성자 이름</p>
            <p>작성 일자</p>
            <p>작성 내용</p>
            <button>삭제</button>
          </div>
          <div>
            <input placeholder="댓글을 입력해주세요" />
            <button>입력</button>
          </div>
        </>
      )}
    </>
  );
};

export default DetailPage;
