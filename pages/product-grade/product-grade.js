// pages/product-grade/product-grade.js
const request           = require('../../utils/request');

Page(Object.assign({
    data:{
        product   : "",
        product_score: 0,
        product_rating: 0,

        life_benefit_count: 0,
        disease_benefit_count: 0,
        accident_benefit_count: 0,
        medical_benefit_count: 0,
        saving_benefit_count: 0,

        product_structure: "",
        waiting_period  : "",
        exclusion_count : 0,

        showGuarantee: true,
        showSettlement: true,
        showInvestment: true

        // tabbar          : app.globalData.tabbar,
    },

    toggleGuarantee() {
        this.setData({ showGuarantee: !this.data.showGuarantee });
    },

    toggleSettlement() {
        this.setData({ showSettlement: !this.data.showSettlement });
    },

    toggleInvestment() {
        this.setData({ showInvestment: !this.data.showInvestment });
    },

    toDisease({target: {dataset : {code, type}}}) {
        if (type !== '重大疾病') {
            return;
        }
        wx.navigateTo({
            url: `../disease-insurance/disease-insurance?mCode=${code}&pid=${this.data.pid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    toApplyInfo() {
        wx.navigateTo({
            url: `../apply-info/apply-info?pid=${this.data.pid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    // toProductType() {
    //     let {product_structure, pid} = this.data;
    //     let type;
    //     switch (product_structure) {
    //         case '分红型'  :
    //             type = 'fenhong';
    //             break;
    //         case '万能型'  :
    //             type = 'wanneng';
    //             break;
    //         case '投资连结型':
    //             type = 'touzi';
    //     }
    //     wx.navigateTo({
    //         url: `../prograde-${type}/prograde-${type}?pid=${pid}`,
    //         fail(res) {
    //             console.log(res);
    //         }
    //     });
    // },

    // toFeedback() {
    //     wx.navigateTo({
    //         url: `../feedback/feedback?pid=${this.data.pid}`
    //     });
    // },
    //

    onLoad:function({pid}){
        this.setData({pid});
        request.withSessionKey({
            url: 'https://dev.wenme.cc/terms/get_product_rating_info',
            data: {pid}
        })
            .then(({
                data: {
                    err_code,
                    rating_info_json
                }
            }) => {
                if (err_code === 0) {
                    this.setData(rating_info_json);
                }
            });
    }
}, require('../../utils/toExplanation')));