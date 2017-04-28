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
                err_code,
                wx_pay_json
            }}) => new Promise((resolve, reject) => {
                let prepay_id = (wx_pay_json || {}).package;
                reject  = reject.bind(this, prepay_id);
                wx.requestPayment(Object.assign(wx_pay_json, {
                    success   : resolve.bind(this, prepay_id),
                    fail      : reject,
                    complete  : reject
                }));
            }))

            .then(prepay_id => {
                return {
                    prepay_id,
                    status  :'success'
                };
            })
            .catch(prepay_id => {
                return {
                    prepay_id,
                    status  :'fail'
                };
            })

            .then(({status, prepay_id}) => new Promise((resolve, reject) => {
                let success = status === 'success';
                wx.showToast({
                    title: `支付${success ? '成功' : '失败'}`,
                    icon: status,
                    duration: 500,
                    success : () => setTimeout(() => {
                        if (success) {
                            resolve();
                        } else {
                            reject();
                        }
                    }, 600)
                });
                wx.request({
                    url     : `https://wenme.cc/orders/wx_pay_notify?status=${status}&${prepay_id}`
                });
            }))

            .then(() => wx.redirectTo({
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