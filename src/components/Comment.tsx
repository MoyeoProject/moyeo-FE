import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as SendIcon } from '../assets/send_icon.svg';
import { addComment, delelteComment, getCommentPage } from '../services/api';
import { loadItem } from '../services/storage';
import { CommentBox, CommentItem, CommentViewBox, InputBox } from '../styles/CommentStyle';
import { CommentTypes } from '../types/DetailTypes';

const Comment = () => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const myUsername = loadItem('username');
  const [comment, setComment] = useState('');

  const { isLoading, data, isError } = useQuery(['Comment', id], () => {
    return getCommentPage(id);
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
    if (comment === '') {
      alert('댓글을 작성해주세요.');
      return;
    }
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
  const handleDelComment = (commentId: any) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      delCommentItem({ id, commentId });
    }
  };

  return (
    <CommentBox>
      {/* {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null} */}
      <CommentViewBox>
        {!data?.data.data ? (
          <p>댓글이 없습니다. 첫 댓글을 남겨보세요</p>
        ) : (
          data?.data.data.map((c: CommentTypes) => {
            return (
              <CommentItem
                key={c.commentId}
                align={c.username === myUsername ? 'flex-end' : 'flex-start'}
                bgColor={c.username === myUsername ? '#9CC8D2' : '#F4F4F4'}
                color={c.username === myUsername ? '#FFFFFF' : '#222222'}
              >
                {c.username === myUsername ? (
                  <p className="date">{c.createdAt.split('T')[1].split('.')[0]}</p>
                ) : null}

                <div className="commentMiniBox">
                  {c.username === myUsername ? null : (
                    <img src={c.profileUrl} style={{ width: '28px' }} />
                  )}
                  <div>
                    {c.username === myUsername ? null : <p className="username">{c.username}</p>}
                    {c.username === myUsername ? (
                      <div
                        className="userComment"
                        onClick={() => {
                          handleDelComment(c.commentId);
                        }}
                      >
                        {c.comment}
                      </div>
                    ) : (
                      <div className="userComment"> {c.comment} </div>
                    )}
                  </div>
                </div>

                {c.username !== myUsername ? (
                  <p className="date">{c.createdAt.split('T')[1].split('.')[0]}</p>
                ) : null}
              </CommentItem>
            );
          })
        )}
      </CommentViewBox>
      <InputBox>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={comment}
            placeholder="댓글 내용을 입력해주세요"
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </InputBox>
    </CommentBox>
  );
};

export default Comment;
