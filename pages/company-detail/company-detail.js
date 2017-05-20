// pages/company-detial/company-detial.js
const request           = require('../../utils/request');

Page({
    data:{
        insurer         : "",
        logo_link       : "",
        insurer_website : "",
        hotline1        : "",
        hotline2        : "",
        financial_year  : "",
        original_premium: 0,
        original_premium_market_pct: 0,
        original_premium_ranking: 0,
        solvency_valuation_quarter: "",
        core_solvency_adequacy_ratio: "",
        comp_solvency_adequacy_ratio: 0,
        solvency_rating : "",

        // tabbar          : app.globalData.tabbar,

        selected:true,
        selected1:false
    },
    selected:function(e){
        this.setData({
            selected1:false,
            selected:true
        })
    },
    selected1:function(e){
        this.setData({
            selected:false,
            selected1:true
        })
    },

    call(event) {
        wx.makePhoneCall({
            phoneNumber : event.target.dataset.phone
        })
    },

    toExplaination({target}) {
        request.withSessionKey({
            url: 'https://wenme.cc/helpdesk/get_explaination',
            data: target.dataset
        })

            .then(({data: {
                err_code,
                explaination_rslt: {title, explaination}
            }}) => {
                if (err_code === 0) {
                    wx.showModal({
                        title: title,
                        showCancel: false,
                        confirmText:'关闭',
                        confirmColor:'#5082f0',
                        content: explaination,
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                }
            });
    },

    onLoad({insurer_id}) {
        request.withSessionKey({
            url: 'https://wenme.cc/insurer/get_insurer_info',
            data: {insurer_id}
        })

            .then(({data: {
                err_code,
                insurer_info
            }}) => {
                if (err_code === 0) {
                    this.setData(insurer_info);
                }
            });
    }
});