// pages/prograde-baoxianzeren/prograde-baoxianzeren.js
const request           = require('../../utils/request');

Page({
    data:{},

    toFeedback() {
        wx.navigateTo({
            url: `../feedback/feedback?pid=${this.data.pid}`
        });
    },

    toExplaination(event) {
        wx.navigateTo({
            url: `../explaination/explaination?tid=${event.target.dataset.tid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    toBaoXianJin(event) {
        wx.navigateTo({
            url: `../prograde-baoxianjin/prograde-baoxianjin?bid=${event.target.dataset.bid}&pid=${this.data.pid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    onLoad:function({pid, mCode}){
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
                    evaluation_info.important_info_arr
                        .some(info => info[0] === '轻疾赔付比例' && (!!(info[1]=(info[1]*100).toFixed(1)) || true));
                    this.setData(evaluation_info);
                }
            });
    }
});