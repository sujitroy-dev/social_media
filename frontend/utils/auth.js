import Cookies from "js-cookie";

export const googleSingin = () => {
  window.location.replace(`${process.env.API_BASE_URL}/auth/google`);
};
export const githubSingin = () => {
  window.location.replace(`${process.env.API_BASE_URL}/auth/github`);
};

export const logout = () => {
  Cookies.remove("token");
  window.location.replace(`${process.env.CLIENT_ORIGIN_URL}/auth/sign-in`);
};
