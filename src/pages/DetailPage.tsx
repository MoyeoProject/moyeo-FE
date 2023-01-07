import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const navigate = useNavigate();
  const [categories, setCategoreis] = useState('intro');

  // // 전체 데이터를 가져오는 hooks
  // const { isLoading, data, isError, error, isFetching, refetch } =
  // useSuperHeroData(onSuccess, onError);

  return (
    <>
      <div>
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

      <div>
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
        </>
      ) : (
        <>
          <h2>댓글</h2>
          <div>DetailComment</div>
        </>
      )}
    </>
  );
};

export default DetailPage;
