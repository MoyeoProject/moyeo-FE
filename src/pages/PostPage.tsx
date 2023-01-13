import { TimePicker } from 'antd';

import ModalAccordionButton from '../components/common/ModalAccordionButton';
import TopNavBar from '../components/common/TopNavBar';
import useChangePostForm from '../hooks/useChangePostForm';

export default function PostPage() {
  const {
    postForm,
    handleChangeInputField,
    handleSubmitForm,
    handleChangeStartTime,
    handleChangeStartDate,
  } = useChangePostForm();
  const { title, content, link } = postForm;

  const handleClickConfirm = (event: React.ChangeEvent<HTMLFormElement>, callback: () => void) => {
    handleSubmitForm(event);
    callback();
  };

  const handleClickTimeConfirm = (startDate: string, callback: () => void) => {
    handleChangeStartDate(startDate);
    callback();
  };

  return (
    <>
      <TopNavBar name={'post'} />
      <br />
      <br />

      <h2>모임에 대해 설명해주세요!</h2>
      <ModalAccordionButton
        name={'category'}
        postForm={postForm}
        onClickConfirm={handleClickConfirm}
        onClickTimeConfirm={handleClickTimeConfirm}
      />
      <p>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</p>
      <label htmlFor="title">모임 이름</label>
      <input
        type="text"
        id="title"
        placeholder="모임 이름을 입력해주세요 0/20"
        value={title}
        maxLength={20}
        onChange={(e) => handleChangeInputField(e)}
      />

      <label htmlFor="content">소개</label>
      <input
        type="text"
        id="content"
        placeholder="모두가 즐거운 대화를 나눠요!"
        value={content}
        onChange={(e) => handleChangeInputField(e)}
      />
      <br />
      <br />

      <ModalAccordionButton
        name={'platform'}
        postForm={postForm}
        onClickConfirm={handleClickConfirm}
        onClickTimeConfirm={handleClickTimeConfirm}
      />
      <h2>모임은 어디에서 언제 시작하나요?</h2>
      <label htmlFor="link">링크</label>
      <input
        type="text"
        id="link"
        placeholder="모두가 즐거운 대화를 나눠요!"
        value={link}
        onChange={(e) => handleChangeInputField(e)}
      />
      <br />
      <br />

      <ModalAccordionButton
        name={'startDate'}
        postForm={postForm}
        onClickConfirm={handleClickConfirm}
        onClickTimeConfirm={handleClickTimeConfirm}
      />
      <label htmlFor="startTime">모임 시간</label>
      <TimePicker use12Hours format="hh:mm a" onChange={handleChangeStartTime} />
      <ModalAccordionButton
        name={'duration'}
        postForm={postForm}
        onClickConfirm={handleClickConfirm}
        onClickTimeConfirm={handleClickTimeConfirm}
      />
      <br />
      <br />

      <h2>모임은 몇 명이 어떻게 들어오나요?</h2>
      <ModalAccordionButton
        name={'maxNum'}
        postForm={postForm}
        onClickConfirm={handleClickConfirm}
        onClickTimeConfirm={handleClickTimeConfirm}
      />
      <p>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</p>
      <br />
    </>
  );
}
