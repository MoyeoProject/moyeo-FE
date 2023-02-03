import React, { useEffect } from 'react';

import { ReactComponent as Icon_Share } from '../assets/n_share.svg';

const KakaoShareButton = (shareData: any) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // const data: shareData[] = shareData?.shareData;
  // const { link, title, content }: shareData = shareData?.shareData;
  const { link, title, content } = shareData?.shareData;
  const KakaoShareLink = () => {
    if (window.Kakao) {
      const Kakao = window.Kakao;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
      }
      Kakao.Share.sendCustom({
        templateId: 88651,
        templateArgs: {
          title: title,
          content: content,
          link: link,
        },
      });
    }
  };

  return (
    <div onClick={KakaoShareLink}>
      <span>
        <Icon_Share />
      </span>
    </div>
  );
};

export default KakaoShareButton;
