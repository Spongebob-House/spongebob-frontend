/* eslint-disable no-undef */
const kakaoHeader = {
  Authorization: "288636c0ea745790142825e31dfbb71e",
  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
};
// eslint-disable-next-line no-unused-vars
const getKakaoToken = async (code) => {
  console.log("loginWithKakao");
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "ccc74031513a06a11e93d44b64d0ba5e",
      redirect_uri: "http://localhost:8080/map/search/auth",
      code: "code",
    };
    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    const result = await axios.post("https://kauth.kakao.com/oauth/token", queryString, { headers: kakaoHeader });
    console.log("카카오 토큰", result);
    return result;
  } catch (e) {
    return e;
  }
};
