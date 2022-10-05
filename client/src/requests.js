// later repace with deployed server IP
const basePath = 'http://localhost:3001';
const axios = require('axios');

const Axios = axios.create({
  baseURL: basePath,
  withCredentials: true,
});

module.exports = {
  //AUTHORIZATION
  authorize: () => {
    return Axios.get('/auth');
  },

  registerUser: (values) => {
    return (
      Axios
      .post('/register', values)
    )
  },

  login: (values) => {
    return (
      Axios
      .post('/login', values)
    )
  },

  // GAMES
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
      url: '/games',
      method: 'get',
      baseURL: basePath,
      params: { gameId }
    })
  },

  createGame: (body) => {
    return axios({
      url: '/games',
      method: 'post',
      baseURL: basePath,
      data: body
    })
  },

  getGamesByIds: (gameIds) => {
    return axios({
      url: '/games',
      method: 'get',
      baseURL: basePath,
      params: { gameIds }
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
  joinGame: (gameId) => {
    return axios({
      url: '/users',
      method: 'put',
      baseURL: basePath,
      params: { gameId }
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