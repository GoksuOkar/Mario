// later repace with deployed server IP
const basePath = 'http://localhost:3001';
const axios = require('axios');

module.exports = {
  /***************GAMES*******************/
  getAllGames: (city, state, sort='upcoming') => {
    return axios({
      url: '/games',
      method: 'get',
      baseURL: basePath,
      params: { city, state, sort }
    })
  },

  getOneGame: (gameId) => {
    return axios({
      url: '/game',
      method: 'get',
      baseURL: basePath,
      params: { gameId }
    })
  },

  getGamesByIds: (gameIds) => {
    // I think there's a params serializer we can use instead
    gameIds = JSON.stringify(gameIds);
    return axios({
      url: '/games',
      method: 'get',
      baseURL: basePath,
      params: { gameIds }
    })
  },

  joinGame: (userId, eventId) => {
    return axios({
      url: '/game/join',
      method: 'put',
      baseURL: basePath,
      data: { userId, eventId }
    })
  },

  createGame: (body) => {
    return axios({
      url: '/game',
      method: 'post',
      baseURL: basePath,
      data: body
    })
  },

  // USERS
  getUserInfo: (userId) => {
    return axios({
      url: '/users',
      method: 'get',
      baseURL: basePath,
      params: { userId }
    })
  },

  // friendIds should be an array
  getFriendInfo: (friendIds) => {
    return axios({
      url: '/friends',
      method: 'get',
      baseURL: basePath,
      params: { friendIds }
    })
  },
}