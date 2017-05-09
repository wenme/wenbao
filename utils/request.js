/**
 * Created by gzwujiaxiang@corp.netease.com on 2017/4/18 0018.
 */
const {stringify}   = require('./qs');

const request   = (options = {}) => new Promise((resolve, reject) => {
    let {success, fail, complete}   = options;

    options.success = (res) => {
        if (success) {
            success(res);
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
            return resolve(res);
        }
        reject(res);
    };

    options.fail    = (err) => {
        if (fail) {
            fail(err);
        }
        reject(err);
    };

    wx.request(options);
});

module.exports  = request;

module.exports.withSessionKey   = (options = {}) => {
    wx.showLoading({
        title   : 'loading',
        mask    : true
    });
    return getApp()
        .getSessionKey()
        .then(session_key => {
            options.data    = Object.assign({session_key}, options.data || {});

            return request(Object.assign({
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }, options))
                .then(res => {
                    wx.hideLoading();
                    return res;
                })
                .catch(res => {
                    wx.hideLoading();
                    if (res.statusCode) {
                        console.log(`code: ${res.statusCode} params: ${stringify(options.data)}`);
                    }
                    return Promise.reject(res);
                })
        });
};