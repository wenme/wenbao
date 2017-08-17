// pages/prograde-touzi/prograde-touzi.js
const request           = require('../../utils/request');

Page({
    data:{},
    // toFeedback() {
    //     wx.navigateTo({
    //         url: `../feedback/feedback?pid=${this.data.pid}`
    //     });
    // },

    onLoad:function({pid}){
        request.withSessionKey({
            url: 'https://dev.wenme.cc/terms/product_module_evaluation',
            data: {
                pid,
                module_code: 6,
                product_structure: '投资连结型'
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
                        'avg_manage_fee',
                        'avg_surrender_charge_f5y',
                        'initial_fee'
                    ].forEach(key => evaluation_info[key] = (evaluation_info[key]*100).toFixed(1));
                    this.setData(evaluation_info);
                }
            });
    },

    toToulian(event) {
        let {pid} = this.data;
        wx.navigateTo({
            url: `../prograde-touzitoulian/prograde-touzitoulian?pid=${pid}&aid=${event.target.dataset.aid}`,
            fail(res) {
                console.log(res);
            }
        });
    }
});