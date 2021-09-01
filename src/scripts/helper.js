import Cookies from "js-cookie";

export const checkRes = (param) => {
  if (param === 200 || param === 201 || param === 212) {
    return true;
  } else if (param === 401) {
    window.localStorage.removeItem("profile");
    Cookies.remove("token");
    window.location = "/auth/login";
  } else if (param === 403) {
    window.location = "/admin/access-denied";
  } else {
    return false;
  }
};