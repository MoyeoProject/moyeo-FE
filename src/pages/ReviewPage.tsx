import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as ReviewBad } from '../assets/review_bad.svg';
import { ReactComponent as ReviewFace } from '../assets/review_face.svg';
import { ReactComponent as ReviewGood } from '../assets/review_good.svg';
import { addReviewApi } from '../services/api';
import { SubPageBox } from '../styles/ProfileSubPageStyle';
import { Bad, Good, ReviewBox, ReviewIconBox } from '../styles/ReviewPageStyle';
import { SubNav } from './AlarmListPage';

const MettingReviewPage = () => {
  const QueryClient = useQueryClient();
  const { id } = useParams();

  const useAddReview = () => {
    return useMutation(addReviewApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['review']);
        // QueryClient.invalidateQueries(['detail']);
      },
    });
  };

  const { mutate: addReview } = useAddReview();
  const handleClickReview = (review: boolean) => {
    addReview({ id, review });
  };

  return (
    <>
      <SubPageBox>
        <SubNav children={'모임후기'} />
        <ReviewBox>
          <div className="reviewFace">
            <ReviewFace />
          </div>
          <div className="reviewTitle">
            <p>오늘 모임 어떠셨나요?</p>
            <p>후기를 알려주세요</p>
          </div>

          <ReviewIconBox>
            <Good
              onClick={() => {
                handleClickReview(true);
              }}
            >
              <ReviewGood />
              <p>좋았아요</p>
            </Good>
            <Bad
              onClick={() => {
                handleClickReview(false);
              }}
            >
              <ReviewBad />
              <p>아쉬웠어요</p>
            </Bad>
          </ReviewIconBox>
        </ReviewBox>
      </SubPageBox>
    </>
  );
};

export default MettingReviewPage;
