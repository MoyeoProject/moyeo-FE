import React, { useEffect } from 'react';

const KakaoShareButton = (shareData: any) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
      <span>🔗</span>
    </div>
  );
};

export default KakaoShareButton;
