// pages/company-detial/company-detial.js
const request           = require('../../utils/request');

const app               = getApp();

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

    toExplaination(event) {
        wx.navigateTo({
            url: `../explaination/explaination?tid=${event.target.dataset.tid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    onLoad({insurer_id}) {
        request.withSessionKey({
            url: 'https://wenme.cc/insurer/get_insurer_info',
            data: {insurer_id},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
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