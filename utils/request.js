class request {

  constructor() {
    this._header = {}
  }

  send(method, url, data, header = this._header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res) => {
          if (res.statusCode === 200) {
            // 200
            resolve(res)
          } else {
            // other
            reject(res)
          }
        },
        fail: (res) => {
          reject(res)
        },
        complete: (res) => {},
      })
    })
  }

}

export default request