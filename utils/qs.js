/**
 * Created by xingxing2wingwing on 2017/5/6.
 */

module.exports.stringify    = (obj) => Object.keys(obj)
    .map(key => `${key}=${obj[key]}`).join('&');