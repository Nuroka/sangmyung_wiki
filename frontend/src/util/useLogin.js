function isLogin() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return !!token;
}

export default isLogin;
