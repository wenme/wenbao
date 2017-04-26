// pages/prograde-touzitoulian/prograde-touzitoulian.js
const request           = require('../../utils/request');

Page({
    data:{
    },
    onLoad:function({pid, aid}){
        request.withSessionKey({
            url: 'https://wenme.cc/terms/get_investment_link_account_info',
            data: {
                pid,
                account_id: aid
            }
        })
            .then(({
                data: {
                    err_code,
                    account_info
                }
            }) => {
                if (err_code === 0) {
                    [
                        'account_spread',
                        'avg_return_3y',
                        'last_year_return',
                        'manage_fee',
                        'this_year_return',
                        'volatile_return_3y'
                    ].forEach(key => account_info[key] = (account_info[key]*100).toFixed(1));
                    this.setData(account_info);
                }
            });
    }
});