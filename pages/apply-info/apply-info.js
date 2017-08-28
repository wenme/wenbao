// pages/disease-insurance/disease-insurance.js
const request           = require('../../utils/request');

Page(Object.assign({
    data:{},

    onLoad:function({pid}){
        request.withSessionKey({
            url: 'https://dev.wenme.cc/terms/get_benefit_applying_docs',
            data: {
                pid
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