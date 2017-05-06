// pages/prograde-fenhong/prograde-fenhong.js
const request           = require('../../utils/request');

Page({
    data:{},
    toFeedback() {
        wx.navigateTo({
            url: `../feedback/feedback?pid=${this.data.pid}`
        });
    },

    onLoad:function({pid}){
        request.withSessionKey({
            url: 'https://wenme.cc/terms/product_module_evaluation',
            data: {
                pid,
                module_code: 6,
                product_structure: '分红型'
            }
        })
            .then(({
                data: {
                    err_code,
                    evaluation_info
                }
            }) => {
                if (err_code === 0) {
                    [
                        'avg_return_3y',
                        'volatile_return_3y',
                        'last_year_return',
                        'last_year_acc_return'
                    ].forEach(key => evaluation_info[key] = (evaluation_info[key]*100).toFixed(1));
                    this.setData(evaluation_info);
                }
            });
    }
});