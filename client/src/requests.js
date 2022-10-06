// later repace with deployed server IP
const basePath = "http://localhost:3001";
const axios = require("axios");

const Axios = axios.create({
  baseURL: basePath,
  withCredentials: true,
});

module.exports = {
  //AUTHORIZATION
  authorize: () => {
    return Axios.get("/auth");
  },

  registerUser: (values) => {
    return Axios.post("/register", values);
  },

  login: (values) => {
    return Axios.post("/login", values);
  },

  googleLogin: (values) => {
    return Axios.post("/googleLogin", values);
  },

  logOut: () => {
    return Axios.delete("/logout");
  },

  // GAMES
  /***************GAMES*******************/

  getAllGames: (city, state, sort = "upcoming", userId) => {
    return axios({
      url: "/games",
      method: "get",
      baseURL: basePath,
      params: { city, state, sort, userId },
    });
  },

  getOneGame: (id) => {
    return axios({
      url: "/game",
      method: "get",
      baseURL: basePath,
      params: { id },
    });
  },

  getGamesByIds: (gameIds) => {
    return axios({
      url: "/games",
      method: "get",
      baseURL: basePath,
      params: { gameIds },
    });
  },

  joinGame: (userId, eventId) => {
    return axios({
      url: "/game/join",
      method: "put",
      baseURL: basePath,
      data: { userId, eventId },
    });
  },

  leaveGame: (userId, eventId) => {
    return axios({
      url: "/game/leave",
      method: "put",
      baseURL: basePath,
      data: { userId, eventId },
    });
  },

  createGame: (body) => {
    return axios({
      url: "/game",
      method: "post",
      baseURL: basePath,
      data: body,
    });
  },

  // USERS
  getUserInfo: (userId) => {
    return axios({
      url: "/users",
      method: "get",
      baseURL: basePath,
      params: { userId },
    });
  },

  getCurrentUser: (userId) => {
    return axios({
      url: "/currentUser",
      method: "get",
      baseURL: basePath,
      params: { userId },
    });
  },

  getUserPhotos: (userIds) => {
    return axios({
      url: "/user",
      method: "get",
      baseURL: basePath,
      params: { userIds },
    });
  },

  addFriend: (userId, friendId) => {
    return axios({
      url: "/addFriend",
      method: "put",
      baseURL: basePath,
      params: { userId, friendId },
    });
  },

  unFriend: (userId, friendId) => {
    return axios({
      url: "/unFriend",
      method: "put",
      baseURL: basePath,
      params: { userId, friendId },
    });
  },

  getComments: (eventId) => {
    return axios({
      url: "/comments",
      method: "get",
      baseURL: basePath,
      params: { eventId },
    });
  },

  addComment: (gameId, comment) => {
    return axios({
      url: "/comments",
      method: "post",
      baseURL: basePath,
      params: { gameId },
      data: comment,
    });
  },

  updateUser: (userInfo, id) => {
    return axios({
      url: "/updateUser",
      method: "put",
      baseURL: basePath,
      data: { userInfo, id },
    });
  },
};
