export function getAuthToken() {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  return token;
}

export function removeAuthToken() {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
}

export function checkAuth() {
  const token = getAuthToken();
  return !!token;
}
