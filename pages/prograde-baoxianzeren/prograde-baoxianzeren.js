// pages/prograde-baoxianzeren/prograde-baoxianzeren.js
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

    toExplaination(event) {
        wx.navigateTo({
            url: `../explaination/explaination?tid=${event.target.dataset.tid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    onLoad:function({pid, mCode}){
        this.setData({insuranceType: INSURANCE_TYPES[mCode-1]});
        request.withSessionKey({
            url: 'https://wenme.cc/terms/product_module_evaluation',
            data: {
                pid,
                module_code: mCode
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