//app.js
const query = { // 产品列表搜索条件
    search  : true,
    page_num: 1
};
let code, userInfo, session_key;

App({
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
                                    url: 'https://dev.wenme.cc/users/wx_login',
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
                        success({userInfo: _userInfo}) {
                            resolve(userInfo = _userInfo);
                        },
                        fail: reject
                    })
                }));
        }
    },
    getCode() {
        if (!code) {
            return this.getNewCode();
        }
        return new Promise(resolve => {
            wx.checkSession({
                success() {
                    resolve({code});
                },

                fail: () => {
                    this.getNewCode().then(resolve);
                }
            });
        });
    },

    getNewCode() {
        return this.login()
            .then(({code: _code}) => {
                code  = _code;
                return {code, isNewSession: true};
            });
    },
    login() {
        return new Promise(resolve => wx.login({
            success: resolve
        }));
    },

    getQuery() {
        return query;
    },

    setQuery(data) {
        Object.keys(data).forEach(key => {
            let value   = data[key];
            if (value != null) {
                query[key] = value;
            } else {
                delete query[key];
            }
        });
    }
});