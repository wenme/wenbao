// pages/user-home/user-home.js
const request           = require('../../utils/request');

Page({
    data:{},

    toFeedback() {
        wx.navigateTo({
            url: `../feedback/feedback?pid=${this.data.pid}`
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

    toBaoXianJin(event) {
        wx.navigateTo({
            url: `../prograde-baoxianjin/prograde-baoxianjin?bid=${event.target.dataset.bid}&pid=${this.data.pid}`,
            fail(res) {
                console.log(res);
            }
        });
    },

    onLoad:function(){
        request.withSessionKey({
            url: 'https://wenme.cc/users/user_center'
        })
            .then(({
                       data: {
                           err_code,
                           user_info
                       }
                   }) => {
                if (err_code === 0) {
                    this.setData(user_info);
                }
            });
    }
});