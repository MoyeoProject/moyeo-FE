import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ReactComponent as Icon_send } from '../assets/n_send.svg';
import { ReactComponent as Frame_user } from '../assets/user_img.svg';
import { addComment, delelteComment, getCommentPage } from '../services/api';
import { loadItem } from '../services/storage';
import { CommentBox, CommentItem, CommentViewBox, InputBox } from '../styles/CommentStyle';
import { CommentTypes, meetingAfterType } from '../types/DetailTypes';

const Comment = ({ meetingAfter }: meetingAfterType) => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const myUsername = loadItem('username');
  const [comment, setComment] = useState('');

  const { data } = useQuery(['Comment', id], () => {
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
      toast('댓글을 작성해주세요.');
      return;
    }
    addCommentItem({ id, comment });
    setComment('');
  };

  const useDelComment = () => {
    return useMutation(delelteComment, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['Comment', id]);
      },
      onError: (data: any) => {
        toast(data?.response.data.statusMsg);
      },
    });
  };

  const { mutate: delCommentItem } = useDelComment();
  const handleDelComment = (commentId: number) => {
    Swal.fire({
      position: 'center',
      width: '365px',
      title: '정말 삭제하시겠습니까?',
      confirmButtonText: '네',
      cancelButtonText: '취소',
      icon: 'warning',
      iconColor: '#F1F1F1',
      showCancelButton: true,
      confirmButtonColor: '#666666',
      cancelButtonColor: '#FFA02D',
    }).then((result) => {
      result.isConfirmed ? delCommentItem({ id, commentId }) : null;
    });
  };

  return (
    <CommentBox>
      <CommentViewBox>
        {!data?.data.data ? (
          meetingAfter ? (
            <p>이미 끝난 모임입니다. 댓글을 남길 수 없습니다.</p>
          ) : (
            <p>댓글이 없습니다. 첫 댓글을 남겨보세요</p>
          )
        ) : (
          data?.data.data.map((c: CommentTypes) => {
            return (
              <CommentItem
                key={c.commentId}
                align={c.username === myUsername ? 'flex-end' : 'flex-start'}
                bgColor={c.username === myUsername ? '#FFFFFF' : '#FFFFFF'}
                color={c.username === myUsername ? '#222222' : '#222222'}
                border={c.username === myUsername ? '1px solid #FF9C07' : '1px solid #E9E9E9'}
              >
                {c.username === myUsername ? (
                  <p className="date">
                    {data
                      ? data?.data.data[0].createdTime.slice(0, 2) > 12
                        ? '오후'
                        : '오전'
                      : null}
                    &nbsp;
                    {c.createdAt.split('T')[1].split('.')[0].slice(0, 5)}
                  </p>
                ) : null}

                <div className="commentMiniBox">
                  {c.username === myUsername ? null : c.profileUrl !== null ? (
                    <img src={c.profileUrl} style={{ width: '28px' }} />
                  ) : (
                    <Frame_user style={{ width: '28px', height: '28px', marginRight: '9px' }} />
                  )}
                  <div>
                    {c.username === myUsername ? null : <p className="username">{c.username}</p>}
                    {c.username === myUsername ? (
                      <div
                        className="userComment"
                        onClick={() => {
                          if (!meetingAfter) {
                            handleDelComment(c.commentId);
                          }
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
                  <p className="date">
                    {data
                      ? data?.data.data[0].createdTime.slice(0, 2) > 12
                        ? '오후'
                        : '오전'
                      : null}
                    &nbsp;
                    {c.createdAt.split('T')[1].split('.')[0].slice(0, 5)}
                  </p>
                ) : null}
              </CommentItem>
            );
          })
        )}
      </CommentViewBox>

      <InputBox>
        {!meetingAfter ? (
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              value={comment}
              placeholder="댓글 내용을 입력해주세요"
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">
              <Icon_send />
            </button>
          </form>
        ) : (
          <p className="meetingEndText">완료된 모임에는 댓글을 작성할 수 없습니다.</p>
        )}
      </InputBox>
    </CommentBox>
  );
};

export default Comment;
