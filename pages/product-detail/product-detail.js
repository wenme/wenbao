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
        request.withSessionKey({
            url: 'https://wenme.cc/orders/check_product_is_paid',
            data: {
                pid : this.data.pid
            }
        })
            .then(({data: {
                err_code,
                check_rslt
            }}) => {
                let page    = 'prograde-zhifu';
                if (err_code === 0 && check_rslt) {
                    page    = 'product-grade';
                }
                wx.navigateTo({
                    url: `../${page}/${page}?pid=${this.data.pid}`,
                    fail(res) {
                        console.log(res);
                    }
                });
            })
            .catch(() => {
                wx.navigateTo({
                    url: `../prograde-zhifu/prograde-zhifu?pid=${this.data.pid}`,
                    fail(res) {
                        console.log(res);
                    }
                });
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

    download() {
        wx.showLoading({
            title   : 'loading',
            mask    : true
        });
        wx.downloadFile({
            url: this.data.terms_download_link,
            success({tempFilePath}){
                wx.openDocument({
                    filePath    : tempFilePath,
                    success(res) {
                        console.log(res)
                    },
                    fail(res) {
                        console.log(res)
                    },
                    complete() {
                        wx.hideLoading();
                    }
                });
            },
            fail() {
                wx.hideLoading();
            }
        });
    },

    onLoad({product_iachina_link, pid}) {
        let promise;
        if (product_iachina_link) {
            promise = request.withSessionKey({
                url: 'https://wenme.cc/terms/scan',
                data: {
                    product_iachina_link: decodeURIComponent(product_iachina_link),
                }
            });
        }

        if (pid) {
            promise = request.withSessionKey({
                url: 'https://wenme.cc/terms/get_product_detail_info',
                data: {
                    pid
                }
            }).then(res => (res.data.product_detail_info = res.data.product_info_json) && res);
        }

        if (promise) {
            promise.then(({data: {
                err_code,
                product_detail_info
            }}) => {
                if (err_code === 0) {
                    this.setData(product_detail_info);
                }
            });
        }
    }
});