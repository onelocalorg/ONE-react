export const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  return userInfo;
};
