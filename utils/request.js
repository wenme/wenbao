/**
 * Created by gzwujiaxiang@corp.netease.com on 2017/4/18 0018.
 */

const request   = (options = {}) => new Promise((resolve, reject) => {
    let {success, fail, complete}   = options;

    options.success = (res) => {
        if (success) {
            success(res);
        }
        resolve(res);
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
            }, options)).then(res => {
                wx.hideToast();
                return res;
            });
        });
};