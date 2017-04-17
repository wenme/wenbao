//app.js
let code, userInfo, session_key;

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getSessionKey() {
    return this.getCode()
      .then(({code, isNewSession}) => {
        if (isNewSession) {
          return this.getUserInfo()
            .then(userInfo => {
              return new Promise(resolve => {
                let data = Object.assign({
                    code,
                    nick_name : userInfo.nickName,
                    avatar_url: userInfo.avatarUrl
                  }, userInfo);
                delete data.nickName;
                delete data.avatarUrl;
                wx.request({
                    url: 'https://wenme.cc/users/wx_login',
                    data,
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function({data: {
                      session_key: key,
                      err_code
                    }}){
                      if (err_code === 0) {
                      resolve(session_key = key);
                    }
                  }
                });
              });
             });
        } else {
          return session_key;
        }
      });
  },
  getUserInfo(){
    if(userInfo){
      return Promise.resolve(userInfo);
    }else{
      //调用登录接口
      return this.getCode()
        .then(() => new Promise((resolve, reject) => {
          wx.getUserInfo({
            success: function ({userInfo: _userInfo}) {
              resolve(userInfo = _userInfo);
            }
          })
        }));
    }
  },
  getCode() {
    if (!code) {
      return this.login()
        .then(({code}) => {
          return {code, isNewSession: true};
        });
    }
    return new Promise(resolve => {
      wx.checkSession({
        success() {
          resolve({code});
        },

        fail: () => {
          this.login()
            .then(({code}) => {
              resolve({code, isNewSession: true});
            });
        }
      });
    });
  },
  login() {
    return new Promise(resolve => wx.login({
      success: resolve
    }));
  },
  globalData:{
    userInfo:null,
    code    : ""
  }
});