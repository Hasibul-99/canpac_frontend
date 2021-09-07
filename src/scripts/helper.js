import Cookies from "js-cookie";
import { notification } from 'antd'
import moment from 'moment';

export const checkRes = (param) => {
  if (param === 200 || param === 201 || param === 212) {
    return true;
  } else if (param === 401) {
    Cookies.remove("canpacToken");
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

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const dateFormat = (date) => {
  if (date) {
      return moment(date).format('YYYY-MM-DD h:mm a');
  } else return null
}