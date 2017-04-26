// pages/prograde-wanneng/prograde-wanneng.js
const request           = require('../../utils/request');

Page({
    data:{
    },
    onLoad:function({pid}){
        request.withSessionKey({
            url: 'https://wenme.cc/terms/product_module_evaluation',
            data: {
                pid,
                module_code: 6,
                product_structure: '万能型'
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
                        'avg_credit_rate_3y',
                        'avg_surrender_charge_f5y',
                        'credit_rate',
                        'initial_fee',
                        'last_year_credit_rate',
                        'min_credit_rate',
                        'volatile_credit_rate_3y'
                    ].forEach(key => evaluation_info[key] = (evaluation_info[key]*100).toFixed(1));
                    this.setData(evaluation_info);
                }
            });
    }
});