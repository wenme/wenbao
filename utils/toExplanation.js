/**
 * Created by xingxing2wingwing on 2017/5/21.
 */

const request           = require('./request');

module.exports  = {
    toExplaination({target}) {
        request.withSessionKey({
            url: 'https://dev.wenme.cc/helpdesk/get_explaination',
            data: target.dataset
        })

            .then(({data: {
                err_code,
                explaination_rslt: {title, explaination}
            }}) => {
                if (err_code === 0) {
                    wx.showModal({
                        title: title,
                        showCancel: false,
                        confirmText:'关闭',
                        confirmColor:'#5082f0',
                        content: explaination,
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                }
            });
    }
};