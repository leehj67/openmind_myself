const url = window.location.href;

// Facebook
export const shareFacebook = () => {
  window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
};

// Kakao
export const shareKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }

    window.Kakao.Link.sendCustom({
      templateId: 105094,
    });
  }
};
