import Cookies from "js-cookie";
import { notification } from 'antd'

export const checkRes = (param) => {
  if (param === 200 || param === 201 || param === 212) {
    return true;
  } else if (param === 401) {
    window.localStorage.removeItem("profile");
    Cookies.remove("token");
    window.location = "/auth/login";
  } else if (param === 403) {
    window.location = "/auth/login";
  } else {
    return false;
  }
};

export const alertPop = (type, data,title=null) => {
  // message[type](data, 6);
  notification[type]({
      placement : 'bottomRight',
      message: title || `${type[0].toUpperCase()}${type.slice(1)}`,
      description:
        data
    })
}