// pages/contact-wenbao/contact-wenbao.js
const request           = require('../../utils/request');

let feedback_content;

Page({
    data:{
        loading: false,
        butStatus: false
    },
    bindContent({detail: {value}}) {
        feedback_content  = value;
        this.setData({
            butStatus: !!feedback_content
        });
    },
    feedbackok() {
        if (!feedback_content) {
            return;
        }
        this.setData({
            loading: true
        });
        request.withSessionKey({
            url : 'https://wenme.cc/users/feedback',
            data: {feedback_content}
        }).then(() => {
            this.setData({
                loading: false
            });
            wx.redirectTo({
                url: '../feedback-success/feedback-success'
            });
        });
    }
});