// pages/prograde-zhifu/prograde-zhifu.js
const request           = require('../../utils/request');

Page({
    data:{},
    pay() {
        request.withSessionKey({
            url : 'https://wenme.cc/orders/make_orders',
            data: {
                pid : this.data.pid,
                good_quantity: 1
            }
        })
            .then(({data  : {
                appId,
                "package" : prepay_id,
                signType,
                nonceStr,
                timeStamp,
                paySign
            }}) => new Promise((resolve, reject) => wx.requestPayment({
                timeStamp,
                nonceStr,
                "package" : prepay_id,
                signType,
                paySign,
                success   : resolve,
                fail      : reject,
                complete  : reject
            })))

            .then(() => 'success')
            .catch(() => 'fail')

            .then(status => new Promise((resolve, reject) => {
                let success = status === 'success';
                wx.showToast({
                    title: `支付${success ? '成功' : '失败'}`,
                    icon: status,
                    duration: 500,
                    success : () => {
                        if (success) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                });
            }))

            .then(() => wx.navigateTo({
                url: `../product-grade/product-grade?pid=${this.data.pid}`,
                fail(res) {
                    console.log(res);
                }
            }))

            .catch(() => wx.navigateBack());
    },
    onLoad:function({pid}){
        request.withSessionKey({
            url: 'https://wenme.cc/terms/term_analysis_info',
            data: {
                pid
            }
        })
            .then(({
                       data: {
                           err_code,
                           term_analysis_info
                       }
                   }) => {
                if (err_code === 0) {
                    term_analysis_info.price  = (term_analysis_info.price / 100).toFixed(2);
                    this.setData(term_analysis_info);
                }
            });
    }

});