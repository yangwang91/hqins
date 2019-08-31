import request from './request.js'
const _request = new request

const BASE_URL = 'http://112.74.228.70:8080/q/imax.do?method='

const URL = {
  getToken: BASE_URL + 'getToken',
  getOpenId: BASE_URL + 'getOpenId',
  getZrStatus: BASE_URL + 'getZrStatus',
  getProblem: BASE_URL + 'getProblem',
  addCooperation: BASE_URL + 'addCooperation',
  getMessage: BASE_URL + 'getMessage',
  getCategorylist: BASE_URL + 'getCategorylist',
  getProductlist: BASE_URL + 'getProductlist',
  getSales: BASE_URL + 'getSales',
  getProposeList: BASE_URL + 'getProposeList',
  addPropose: BASE_URL + 'addPropose',
  getProposeById: BASE_URL + 'getProposeById'
}

function getRequestData(data) {
  return Object.assign({}, {
    token: wx.getStorageSync('token'),
    wxid: wx.getStorageSync('userInfo').openid
  }, data)
}

function getToken(data) {
  return _request.send('GET', URL.getToken, data).then(res => res.data)
}

function getOpenId(data) {
  return _request.send('GET', URL.getOpenId, data).then(res => res.data)
}

function getZrStatus(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getZrStatus, data).then(res => res.data)
}

function getProblem(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getProblem, data).then(res => res.data)
}

function addCooperation(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.addCooperation, data).then(res => res.data)
}

function getMessage(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getMessage, data).then(res => res.data)
}

function getCategorylist(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getCategorylist, data).then(res => res.data)
}

function getProductlist(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getProductlist, data).then(res => res.data)
}

function getSales(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getSales, data).then(res => res.data)
}

function getProposeList(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getProposeList, data).then(res => res.data)
}

function addPropose(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.addPropose, data).then(res => res.data)
}

function getProposeById(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getProposeById, data).then(res => res.data)
}

module.exports = {
  getToken: getToken,
  getOpenId: getOpenId,
  getZrStatus: getZrStatus,
  getProblem: getProblem,
  addCooperation: addCooperation,
  getMessage: getMessage,
  getCategorylist: getCategorylist,
  getProductlist: getProductlist,
  getSales: getSales,
  getProposeList: getProposeList,
  addPropose: addPropose,
  getProposeById: getProposeById
}