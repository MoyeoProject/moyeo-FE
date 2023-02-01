import { useMutation, useQueryClient } from '@tanstack/react-query';
import { read } from 'fs';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

import useCloseModal from '../hooks/useCloseModal';
import { editImageApi } from '../services/api';
import { Overlay } from '../styles/ModalStyle';

type DetailImageEditlType = {
  onClose: () => void;
  id: number;
};

export const DetailImgEditModal = ({ onClose, id }: DetailImageEditlType) => {
  const QueryClient = useQueryClient();

  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<File>();

  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && [0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const usedetailImageEdit = () => {
    return useMutation(editImageApi, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries(['detail']);
        toast(data.data.statusMsg);
        onClose();
      },
    });
  };
  const { mutate: detailImageEdit } = usedetailImageEdit();
  const handleClickImageEdit = () => {
    detailImageEdit({ image, id });
  };

  return (
    <Overlay>
      <DetailImgEditWrap ref={modalRef}>
        <p>이미지 변경</p>
        <Img>
          <img src={imageUrl} />
        </Img>
        <p className="fileLoad">
          <label htmlFor="file">이미지 불러오기</label>
        </p>
        <input type="file" id="file" accept="image/*" required onChange={handleChangeImage} />
        <ButtonBox>
          <Button onClick={onClose} isColor={false}>
            취소
          </Button>
          <Button onClick={handleClickImageEdit} isColor={true}>
            수정하기
          </Button>
        </ButtonBox>
      </DetailImgEditWrap>
    </Overlay>
  );
};

const DetailImgEditWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 343px;
  height: fit-content;
  padding: 16px;
  border-radius: 15px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  .fileLoad {
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

const ButtonBox = styled.div`
  height: 46px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ isColor: boolean }>`
  width: 152px;
  border-radius: 8px;
  color: ${(props) => (props.isColor ? '#FFFFFF' : '#666666')};
  background-color: ${(props) => (props.isColor ? '#FFB300' : '#E9E9E9')};
`;

const Img = styled.div`
  width: 100%;
  border-radius: 8px;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
