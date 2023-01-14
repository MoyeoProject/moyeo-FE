/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_KAKAO_CLIENT_ID: string;
    REACT_APP_KAKAO_REDIRECT_URL: string;
    REACT_APP_SHARE_KAKAO_LINK_KEY: string;
    REACT_APP_SHARE_KAKAO_TEMPLATE_ID: string;
  }
}
interface Window {
  Kakao: any;
}
