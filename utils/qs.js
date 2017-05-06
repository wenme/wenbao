/**
 * Created by xingxing2wingwing on 2017/5/6.
 */

module.exports.stringify    = (obj) => Object.keys(obj)
    .filter(key => typeof obj[key] !== 'undefined')
    .map(key => `${key}=${obj[key]}`)
    .join('&');