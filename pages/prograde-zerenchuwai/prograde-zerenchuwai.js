// pages/prograde-zerenchuwai/prograde-zerenchuwai.js
const request           = require('../../utils/request');

Page({
    data:{},
    // toFeedback() {
    //     wx.navigateTo({
    //         url: `../feedback/feedback?pid=${this.data.pid}`
    //     });
    // },

    onLoad:function({pid}){
        this.setData({
            pid
        });
        request.withSessionKey({
            url: 'https://api.wenme.cc/terms/product_module_evaluation',
            data: {
                pid,
                module_code: 7
            }
        })
            .then(({
                       data: {
                           err_code,
                           evaluation_info
                       }
                   }) => {
                if (err_code === 0) {
                    this.setData(evaluation_info);
                }
            });
    }

});