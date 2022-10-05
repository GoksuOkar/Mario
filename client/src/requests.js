// later repace with deployed server IP
const basePath = 'http://localhost:3001';
const axios = require('axios');

module.exports = {
  /***************GAMES*******************/
  getAllGames: (city, state, sort = 'upcoming') => {
    return axios({
      url: '/games',
      method: 'get',
      baseURL: basePath,
      params: { city, state, sort },
    });
  },

  getOneGame: (id) => {
    return axios({
      url: '/game',
      method: 'get',
      baseURL: basePath,
      params: { id }
    })
  },

  getGamesByIds: (gameIds) => {
    // I think there's a params serializer we can use instead
    gameIds = JSON.stringify(gameIds);
    return axios({
      url: '/games',
      method: 'get',
      baseURL: basePath,
      params: { gameIds },
    });
  },

  joinGame: (userId, eventId) => {
    return axios({
      url: '/game/join',
      method: 'put',
      baseURL: basePath,
      data: { userId, eventId },
    });
  },

  createGame: (body) => {
    return axios({
      url: '/games',
      method: 'post',
      baseURL: basePath,
      data: body,
    });
  },


  // USERS
  getUserInfo: (userId) => {
    return axios({
      url: '/users',
      method: 'get',
      baseURL: basePath,
      params: { userId },
    });
  },
  joinGame: (gameId) => {
    return axios({
      url: '/users',
      method: 'put',
      baseURL: basePath,
      params: { gameId },
    });
  },

  getCurrentUser: (userId) => {
    return axios({
      url: '/currentUser',
      method: 'get',
      baseURL: basePath,
      params: { userId },
    });
  },

  addFriend: (userId, friendId) => {
    return axios({
      url: '/addFriend',
      method: 'put',
      baseURL: basePath,
      params: { userId, friendId },
    });
  },

  unFriend: (userId, friendId) => {
    return axios({
      url: '/unFriend',
      method: 'put',
      baseURL: basePath,
      params: { userId, friendId },
    });
  },

  getComments: (eventId) => {
    return axios({
      url: '/comments',
      method: 'get',
      baseURL: basePath,
      params: { eventId }
    })
  },
};
