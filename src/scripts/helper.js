import Cookies from "js-cookie";
import { notification } from 'antd'
import moment from 'moment';

export const checkRes = (param) => {
  if (param === 200 || param === 201 || param === 212) {
    return true;
  } 
  // else if (param === 401) {
  //   Cookies.remove("canpacToken");
  //   window.location = "/auth/login";
  //   localStorage.removeItem('canpacPermissions');
  // } else if (param === 403) {
  //   Cookies.remove("canpacToken");
  //   window.location = "/auth/login";
  //   localStorage.removeItem('canpacPermissions');
  // } 
  else {
    return false;
  }
};

export const alertPop = (type, data,title=null) => {
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

export const checkUserPermission = (allow, permissions) => { 
  if (allow && permissions?.length) {
      let array = permissions.map(per => per.name);
      return array.includes(allow);
  } else return false
}

export const buildSearchQuery = (object = {}) => {
  let query = "";

  for (const [key, value] of Object.entries(object)) {
      if (value) query = query + `&${key}=${value}`;
  }

  return query;
}