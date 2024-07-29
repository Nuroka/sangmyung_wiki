export function getAuthToken() {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  return token;
}

export function removeAuthToken() {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  sessionStorage.removeItem("id");
}

export function checkAuth() {
  const token = getAuthToken();
  return !!token;
}
