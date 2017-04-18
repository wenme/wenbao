/**
 * Created by gzwujiaxiang@corp.netease.com on 2017/4/18 0018.
 */

module.exports  = (options = {}) => new Promise((resolve, reject) => {
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