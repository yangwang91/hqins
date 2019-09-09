import request from './request.js'
const _request = new request
import urls from './urls.js'
// const BASE_URL = 'http://112.74.228.70:8080/q/imax.do?method='

const BASE_URL = urls.apiUrl

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
  getProposeById: BASE_URL + 'getProposeById',
  getMemberlist: BASE_URL + 'getMemberlist',
  getZtList: BASE_URL + 'getZtList',
  getZrMiddleStatus: BASE_URL + 'getZrMiddleStatus',
  getEstimate: BASE_URL + 'getEstimate',
  getPromotionPicturelist: BASE_URL + 'getPromotionPicturelist',
  getQc: BASE_URL + 'getQc',
  getTgSuccess: BASE_URL + 'getTgSuccess',
  getTgQysum: BASE_URL + 'getTgQysum',
  getAchievementTarget: BASE_URL + 'getAchievementTarget',
  scanAddScande: BASE_URL + 'scanAddScande',
  getCzdjz: BASE_URL + 'getCzdjz',
  zrAutoApproval: BASE_URL + 'zrAutoApproval',
  getDayScore: BASE_URL + 'getDayScore',
  getCinfoAndKey: BASE_URL + 'getCinfoAndKey',
  getMonthScore: BASE_URL + 'getMonthScore',
  getUnderwriting: BASE_URL + 'getUnderwriting',
  getUnionId: BASE_URL + 'getUnionId'
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
  data = getRequestData(data);
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

function getMemberlist(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getMemberlist, data).then(res => res.data)
}

function getZtList(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getZtList, data).then(res => res.data)
}

function getZrMiddleStatus(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getZrMiddleStatus, data).then(res => res.data)
}

function getEstimate(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getEstimate, data).then(res => res.data)
}

function getPromotionPicturelist(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getPromotionPicturelist, data).then(res => res.data)
}

function getQc(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getQc, data).then(res => res.data)
}

function getTgSuccess(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getTgSuccess, data).then(res => res.data)
}

function getTgQysum(type) {
  const data = getRequestData(data);
  return _request.send('GET', URL.getTgQysum, data).then(res => res.data)
}

function getAchievementTarget(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getAchievementTarget, data).then(res => res.data)
}

function zrAutoApproval(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.zrAutoApproval, data).then(res => res.data)
}

function scanAddScande(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.scanAddScande, data).then(res => res.data)
}

function getCzdjz(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getCzdjz, data).then(res => res.data)
}

function getDayScore(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getDayScore, data).then(res => res.data)
}

function getCinfoAndKey(data) {
  data = getRequestData(data);
  return _request.send('GET', URL.getCinfoAndKey, data).then(res => res.data)
}

function getMonthScore(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getMonthScore, data).then(res => res.data)
}

function getUnderwriting(data) {
  data = getRequestData(data)
  return _request.send('GET', URL.getUnderwriting, data).then(res => res.data)
}

function getUnionId(data = getRequestData(data)) {
  return _request.send('GET', URL.getUnionId, data).then(res => res.data)
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
  getProposeById: getProposeById,
  getMemberlist: getMemberlist,
  getZtList: getZtList,
  getZrMiddleStatus: getZrMiddleStatus,
  getEstimate: getEstimate,
  getPromotionPicturelist: getPromotionPicturelist,
  getQc: getQc,
  getTgSuccess: getTgSuccess,
  getTgQysum: getTgQysum,
  getAchievementTarget: getAchievementTarget,
  scanAddScande: scanAddScande,
  getCzdjz: getCzdjz,
  zrAutoApproval: zrAutoApproval,
  getDayScore: getDayScore,
  getCinfoAndKey: getCinfoAndKey,
  getMonthScore: getMonthScore,
  getUnderwriting: getUnderwriting,
  getUnionId: getUnionId
}