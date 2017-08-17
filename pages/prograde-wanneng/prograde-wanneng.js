// pages/prograde-wanneng/prograde-wanneng.js
const request           = require('../../utils/request');
const Chart             = require('../../utils/wxcharts');

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

                    new Chart({
                        canvasId    : 'touzijiazhi',
                        type        : 'line',
                        width       : 300,
                        height      : 200,
                        categories  : evaluation_info.invest_time_line,
                        yAxis       : {
                            min     : 800
                        },
                        series      : [
                            {
                                name: '投连账户名',
                                data: evaluation_info.invest_value
                            },
                            {
                                name: evaluation_info.invest_bm_name,
                                data: evaluation_info.invest_bm_value,
                                color:'#adff2f'
                            }
                        ],
                        dataLabel   : false
                    });
                }
            });
    }
});