// pages/product-detial/product-detial.js
const app               = getApp();

Page({
    data                :{
        product         : "",
        filing_year     : "0",
        sale_available  : "在售",
        product_structure: "传统型",
        product_class   : "终身寿险",
        insured_minimum_age: "",
        insured_maximum_age: "",
        insured_renewal_maximum_age: "",
        cooling_off_period: "",
        terms_download_link: "",
        policy_period   : "",
        channel         : "",

        tabbar          : app.globalData.tabbar,

        baseInfo        :true,
        purchaseInfo    :false
    },

    showBaseInfo() {
        this.setData({
            baseInfo:true,
            purchaseInfo:false
        })
    },
    showPurchaseInfo() {
        this.setData({
            baseInfo:false,
            purchaseInfo:true
        })
    },

    toCompany() {
        wx.navigateTo({
          url: `../company-detail/company-detail?insurer_id=${this.data.insurer_id}`
        });
    },

    toGrade() {
        wx.navigateTo({
          url: `../product-grade/product-grade?pid=${this.data.pid}`
        });
    },

    download() {
        wx.downloadFile({
          url: this.data.terms_download_link,
          success: function(res){
            // success
          },
          fail: function(res) {
            // fail
          }
        });
    },

    onLoad({product_iachina_link}) {
        if (product_iachina_link) {
            wx.request({
                url: 'https://wenme.cc/terms/scan',
                data: {product_iachina_link},
                method: 'POST',
                success: ({
                    data: {
                        err_code,
                        product_detail_info
                    }
                }) => {
                    if (err_code === 0) {
                        this.setData(product_detail_info);
                        wx.request({
                            url: 'https://wenme.cc/orders/check_product_is_paid',
                            data: {pid: product_detail_info.pid},
                            method: 'POST',
                            success: ({
                                data: {
                                    err_code,
                                    check_rslt
                                }
                            }) => {
                                if (err_code === 0) {
                                    this.setData({check_rslt});
                                }
                            }
                        });
                    }
                }
            });
        }

    }
})