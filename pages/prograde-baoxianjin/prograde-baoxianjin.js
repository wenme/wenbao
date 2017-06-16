// pages/prograde-baoxianjin/prograde-baoxianjin.js
const request           = require('../../utils/request');

const INSURANCE_TYPES   = [
    '人寿',
    '疾病',
    '意外',
    '医疗',
    '储蓄'
];

Page({
    data:{},
    // toFeedback() {
    //     wx.navigateTo({
    //         url: `../feedback/feedback?pid=${this.data.pid}`
    //     });
    // },

    onLoad:function({pid, bid}){
        this.setData({
            pid,
            bid
        });
        request.withSessionKey({
            url: 'https://api.wenme.cc/terms/get_benefit_info',
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
});