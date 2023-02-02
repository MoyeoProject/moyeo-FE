import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as ReaviewBad } from '../assets/review_bad.svg';
import { ReactComponent as ReaviewGood } from '../assets/review_good.svg';
import { addReviewApi } from '../services/api';
import { ReviewBox } from '../styles/MettingReviewPageStyle';
import { SubPageBox } from '../styles/ProfileSubPageStyle';
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
    console.log(review, id);
    addReview({ id, review });
  };

  return (
    <>
      <SubPageBox>
        <SubNav children={'모임후기'} />
        <ReviewBox>
          <div className="reviewTitle">
            <p>오늘 모임 어떠셨나요?</p>
            <p>후기를 알려주세요</p>
          </div>

          <div className="reviewIconBox">
            <div
              onClick={() => {
                handleClickReview(true);
              }}
            >
              <ReaviewGood />
              <p>좋았아요</p>
            </div>
            <div
              onClick={() => {
                handleClickReview(false);
              }}
            >
              <ReaviewBad />
              <p>아쉬웠어요</p>
            </div>
          </div>
        </ReviewBox>
      </SubPageBox>
    </>
  );
};

export default MettingReviewPage;
