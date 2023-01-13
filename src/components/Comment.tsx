import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { addComment, delelteComment, getCommentPage } from '../services/api';
import { CommentTypes } from '../types/DetailTypes';

const Comment = () => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const { isLoading, data, isError } = useQuery(['Comment', id], () => {
    return getCommentPage(id);
  });

  const useAddComment = () => {
    return useMutation(addComment, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries(['Comment', id]);
      },
    });
  };

  const { mutate: addCommentItem } = useAddComment();
  const handleAddComment = () => {
    addCommentItem({ id, comment });
  };

  const useDelComment = () => {
    return useMutation(delelteComment, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries(['Comment', id]);
      },
      onError: (data: any) => {
        alert(data?.response.data.statusMsg);
      },
    });
  };

  const { mutate: delCommentItem } = useDelComment();
  const handleDelComment = (commetnId: any) => {
    delCommentItem({ id, commetnId });
  };

  return (
    <>
      {/* {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null} */}
      <div>
        {data?.data.data === undefined
          ? null
          : data?.data.data.map((d: CommentTypes) => {
              return (
                <CommentBox key={d.commentId}>
                  <img src={d.profileUrl} style={{ width: '30px' }} />
                  <div>
                    <p>{d.username}</p>
                    <p>{d.comment}</p>
                  </div>
                  <p>{d.createdAt}</p>
                  <button
                    onClick={() => {
                      handleDelComment(d.commentId);
                    }}
                  >
                    삭제
                  </button>
                </CommentBox>
              );
            })}

        <InputBox>
          <input
            type="text"
            value={comment}
            placeholder="댓글을 입력해주세요"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleAddComment}>작성</button>
        </InputBox>
      </div>
    </>
  );
};

const InputBox = styled.div`
  border: 1px solid gray;
  padding: 10px 0;
  box-sizing: border-box;
`;
const CommentBox = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
`;
export default Comment;
