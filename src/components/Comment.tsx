import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { addComment, delelteComment, getCommentPage } from '../services/api';
import { CommentTypes } from '../types/DetailTypes';

const Comment = () => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const { isLoading, data, isError, fetchNextPage } = useInfiniteQuery(
    ['Comment', id],
    () => {
      return getCommentPage(id);
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const handleScroll = () => {
    // 스크롤 기준이 document라서.. 내가 원하는 곳에서 무한스크롤 안됨
    // 그럼 어떻게 해야 할까?
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log('top: ', scrollTop, '/ clientHeight: ', clientHeight);
    console.log('result: ', scrollTop + clientHeight >= 400);
    if (scrollTop + clientHeight >= 400) {
      return fetchNextPage();
    }
  };
  // 스크롤 이벤트 감지, 이벤트 한 번 동작 후 제거 ( 반복x )
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const useAddComment = () => {
    return useMutation(addComment, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['Comment', id]);
      },
    });
  };

  const { mutate: addCommentItem } = useAddComment();
  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentItem({ id, comment });
    setComment('');
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
    <CommentBox>
      {/* {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null} */}
      <CommentViewBox>
        {data?.pages.map((comment) => {
          return !comment?.data.data
            ? null
            : comment?.data.data.map((c: CommentTypes) => {
                return (
                  <CommentItem key={c.commentId}>
                    <img src={c.profileUrl} style={{ width: '30px' }} />
                    <div>
                      <p>{c.username}</p>
                      <p>{c.comment}</p>
                    </div>
                    <p>{c.createdAt}</p>
                    <button
                      onClick={() => {
                        handleDelComment(c.commentId);
                      }}
                    >
                      삭제
                    </button>
                  </CommentItem>
                );
              });
        })}
      </CommentViewBox>
      <InputBox onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          placeholder="댓글을 입력해주세요"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">작성</button>
      </InputBox>
    </CommentBox>
  );
};

const CommentBox = styled.div`
  height: 500px;
  position: relative;
  border: 1px solid blue;
`;
const InputBox = styled.form`
  border: 1px solid gray;
  padding: 10px 0;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
`;
const CommentViewBox = styled.div`
  border: 1px solid red;
  height: 450px;
  overflow: scroll;
`;
const CommentItem = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
`;

export default Comment;
