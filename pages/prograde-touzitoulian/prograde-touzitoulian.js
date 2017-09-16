// pages/prograde-touzitoulian/prograde-touzitoulian.js
const request           = require('../../utils/request');
const Chart             = require('../../utils/wxcharts');

Page({
    data:{},
    // toFeedback() {
    //     wx.navigateTo({
    //         url: `../feedback/feedback?pid=${this.data.pid}`
    //     });
    // },

    onLoad:function({pid, aid}){
        request.withSessionKey({
            url: 'https://dev.wenme.cc/terms/get_investment_linked_account_info',
            data: {
                pid,
                account_id: aid
            }
        })
            .then(({
                data: {
                    err_code,
                    account_info_json: account_info
                }
            }) => {
                if (err_code === 0) {
                    [
                        'account_spread',
                        'avg_return_3y',
                        'last_year_return',
                        'avg_volatility_3y',
                        'this_year_return',
                        'investment_management_fee'
                    ].forEach(key => account_info[key] = (account_info[key]*100).toFixed(1));
                    this.setData(account_info);

                    new Chart({
                        canvasId    : 'touzijiazhi',
                        type        : 'line',
                        width       : 300,
                        height      : 200,
                        categories  : account_info.time_line,
                        yAxis       : {
                            min     : 800
                        },
                        series      : [
                            {
                                name: account_info.account_name,
                                data: account_info.investment_value
                            },
                            {
                                name: account_info.benchmark_str,
                                data: account_info.benchmark_value,
                                color:'#adff2f'
                            }
                        ],
                        dataLabel   : false
                    });
                }
            });
    }
});