import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import useChangePostForm from '../hooks/useChangePostForm';
import ModalAccordion from './common/ModalAccordion';

export default function PostContentForm() {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const { postForm, handleChangeInputField, handleSubmitForm } = useChangePostForm();
  const { title, content, category } = postForm;

  const handleClickConfirm = (event: React.ChangeEvent<HTMLFormElement>) => {
    handleSubmitForm(event);
    setShowModal(false);
  };

  return (
    <>
      <h2>모임에 대해 설명해주세요!</h2>
      <label htmlFor="category">주제</label>
      <button type="button" disabled={id ? true : false} onClick={() => setShowModal(true)}>
        {category ? category : '주제를 선택해주세요'}
      </button>
      {showModal &&
        createPortal(
          <ModalAccordion
            onClickConfirm={handleClickConfirm}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
      <p>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</p>

      <label htmlFor="title">모임 이름</label>
      <input
        type="text"
        id="title"
        placeholder="모임 이름을 입력해주세요"
        value={title}
        onChange={(e) => handleChangeInputField(e)}
      />

      <label htmlFor="content">소개</label>
      <input
        type="text"
        id="content"
        placeholder="최대 20자까지 입력이 가능해요"
        value={content}
        onChange={(e) => handleChangeInputField(e)}
      />
    </>
  );
}
