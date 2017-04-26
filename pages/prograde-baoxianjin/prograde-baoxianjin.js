// pages/prograde-baoxianjin/prograde-baoxianjin.js
const request           = require('../../utils/request');

Page({
    data:{},
    onLoad:function({pid, bid}){
        this.setData({
            pid,
            bid
        });
        request.withSessionKey({
            url: 'https://wenme.cc/terms/get_benefit_info',
            data: {
                pid,
                benefit_id: bid
            }
        })
            .then(({
                data: {
                    err_code,
                    benefit_info
                }
            }) => {
                if (err_code === 0) {
                    this.setData(benefit_info);
                }
            });
    }
})