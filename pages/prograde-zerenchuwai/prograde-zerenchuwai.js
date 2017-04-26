// pages/prograde-zerenchuwai/prograde-zerenchuwai.js
const request           = require('../../utils/request');

Page({
    data:{},
    onLoad:function({pid}){
        this.setData({
            pid
        });
        request.withSessionKey({
            url: 'https://wenme.cc/terms/product_module_evaluation',
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