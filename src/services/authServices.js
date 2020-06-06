import axios from "axios";
import * as urls from "./urls";

let signup = (data) => {
  return axios({
    method: "post",
    url: urls.registerUrl,
    data,
  });
};

let login = (data) => {
  return axios({
    method: "post",
    url: urls.authUrl,
    data,
  });
};

let getCurrentUser = () => {
  axios({
    method: "get",
    url: urls.currentUserUrl,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default {
  signup,
  login,
  getCurrentUser,
};
