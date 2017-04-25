// pages/product-detial/product-detial.js
const request           = require('../../utils/request');

Page({
    data                :{
        product         : "",
        filing_year     : "",
        sale_available  : "",
        product_structure: "",
        product_class   : "",
        insured_minimum_age: "",
        insured_maximum_age: "",
        insured_renewal_maximum_age: "",
        cooling_off_period: "",
        terms_download_link: "",
        policy_period   : "",
        channel         : "",

        // tabbar          : app.globalData.tabbar,

        baseInfo        :true,
        purchaseInfo    :false
    },

    showBaseInfo() {
        this.setData({
            baseInfo:true,
            purchaseInfo:false
        });
    },
    showPurchaseInfo() {
        this.setData({
            baseInfo:false,
            purchaseInfo:true
        });
    },

    toCompany() {
        wx.navigateTo({
          url: `../company-detail/company-detail?insurer_id=${this.data.insurer_id}`
        });
    },

    toGrade() {
        wx.navigateTo({
            url: `../product-grade/product-grade?pid=${this.data.pid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    toExplaination(event) {
        wx.navigateTo({
            url: `../explaination/explaination?tid=${event.target.dataset.tid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    download() {
        wx.downloadFile({
          url: this.data.terms_download_link,
          success: function({tempFilePath}){
            wx.openDocument({
                filePath    : tempFilePath,
                success(res) {
                    console.log(res)
                },
                fail(res) {
                    console.log(res)
                }
            });
          }
        });
    },

    onLoad({product_iachina_link}) {
        if (product_iachina_link) {
            request.withSessionKey({
                url: 'https://wenme.cc/terms/scan',
                data: {
                    product_iachina_link: decodeURIComponent(product_iachina_link),
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })

                .then(({data: {
                    err_code,
                    product_detail_info
                }}) => {
                    let pid;
                    if (err_code === 0) {
                        this.setData(product_detail_info);
                        pid = product_detail_info.pid;
                    }

                    return pid;
                })

                .then(pid => pid !== null && request.withSessionKey({
                    url: 'https://wenme.cc/orders/check_product_is_paid',
                    data: {pid},
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST'
                }))

                .then(({data: {
                    err_code,
                    check_rslt
                }}) => {
                    if (err_code === 0) {
                        this.setData({check_rslt});
                    }
                });
        }

    }
});