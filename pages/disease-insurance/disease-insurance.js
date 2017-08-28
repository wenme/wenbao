// pages/disease-insurance/disease-insurance.js
const request           = require('../../utils/request');

Page(Object.assign({
    data:{},
    //
    // toFeedback() {
    //     wx.navigateTo({
    //         url: `../feedback/feedback?pid=${this.data.pid}`
    //     });
    // },

    onLoad:function({pid, mCode}){
        request.withSessionKey({
            url: 'https://dev.wenme.cc/terms/get_benefit_info',
            data: {
                pid,
                benefit_id: mCode
            }
        })
            .then(({
                data: {
                    err_code,
                    applying_docs_json
                }
            }) => {
                if (err_code === 0) {
                    this.setData(applying_docs_json);
                }
            });
    }
}, require('../../utils/toExplanation')));