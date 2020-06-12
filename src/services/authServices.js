import axios from "axios";
import * as urls from "./urls";

let headers = () => {
  let userToken = localStorage.getItem("studymate-token");
  return { Authorization: `Bearer ${userToken}` } || {};
};

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

let googleLogin = (data) => {
  return axios({
    method: "post",
    url: urls.googleAuthUrl,
    data,
  });
};

let getCurrentUser = (token) => {
  axios({
    method: "get",
    url: urls.userUrl,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

let getUserCourses = (token, id) => {
  return axios({
    method: "get",
    // url: urls.userCourseUrl,
    url: urls.getUserLearnCourseUrl,
    params: {
      id,
    },
    headers: token ? { Authorization: `Bearer ${token}` } : headers(),
  });
};

let getCourseByName = (name) => {
  return axios({
    method: "get",
    url: urls.courseUrl + "/byname",
    params: {
      name,
    },
  });
};

let updateUserCourses = (data) => {
  return axios({
    method: "post",
    url: urls.userLearnCourseUrl,
    data,
  });
};

let deleteUserCourse = (id) => {
  return axios({
    method: "delete",
    url: urls.userLearnCourseUrl + "/" + id,
  });
};

let getAllCourses = (token) => {
  return axios({
    method: "get",
    url: urls.learnCourseUrl,
    headers: token ? { Authorization: `Bearer ${token}` } : headers(),
  });
};

let updateUserData = (data, id) => {
  return axios({
    method: "patch",
    url: urls.userUrl + "/" + id,
    data,
    headers: headers(),
  });
};

let getSubjectQuiz = (id) => {
  return axios({
    method: "get",
    url: urls.learnCourseUrl + "/" + id,
  });
};

let getSubjectVideos = (id) => {
  return axios({
    method: "get",
    url: urls.videosUrl + "/" + id,
  });
};

let getAwards = () => {
  return axios({
    method: "get",
    url: urls.awardsUrl,
    headers: headers(),
  });
};

let getUserAward = (id) => {
  return axios({
    method: "get",
    url: urls.userAwardsUrl,
    headers: headers(),
    params: {
      id,
    },
  });
};

let getLeaderboard = (userID, quizID) => {
  return axios({
    method: "get",
    url: urls.userAwardsUrl + "/leaders/" + userID + "?id=" + quizID,
    headers: headers(),
  });
};

let getStudypackData = (quizID) => {
  return axios({
    method: "get",
    url: `${urls.studyPackUrl}${quizID}?child=true`,
    headers: headers(),
  });
};

export default {
  signup,
  login,
  googleLogin,
  updateUserData,
  getCurrentUser,
  getUserCourses,
  getCourseByName,
  updateUserCourses,
  deleteUserCourse,
  getAllCourses,
  getAwards,
  getSubjectQuiz,
  getSubjectVideos,
  getUserAward,
  getLeaderboard,
  getStudypackData,
};
