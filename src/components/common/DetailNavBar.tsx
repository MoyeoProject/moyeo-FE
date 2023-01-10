import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailNavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
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
    </div>
  );
};

export default DetailNavBar;
