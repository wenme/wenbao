// pages/company-detial/company-detial.js
const app               = getApp();

Page({
    data:{
        insurer         : "",
        logo_link       : "",
        insurer_website : "",
        hotline_1       : "",
        hotline_2       : "",
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

    onLoad({insurer_id}) {
        app.getSessionKey()
            .then(session_key => wx.request({
                url: 'https://wenme.cc/insurer/get_insurer_info',
                data: {insurer_id, session_key},
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: ({
                              data: {
                                  err_code,
                                  insurer_info
                              }
                          }) => {
                    if (err_code === 0) {
                        this.setData(insurer_info);
                    }
                }
            }));
    }
});