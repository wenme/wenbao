// pages/feedback/feedback.js
const request           = require('../../utils/request');

let desc;

Page({
    data: {},
    feedbackok() {
        let {feedback_error_type}   = this.data;
        let data    = {
            feedback_id_arr: feedback_error_type.filter(error => !!error[2]).map(([id]) => id).join(',')
        };
        if (desc) {
            data.feedback_content = desc;
        }
        request.withSessionKey({
            url : 'https://dev.wenme.cc/users/feedback',
            data
        })
            .then(({data: {err_code}}) => err_code === 0 && wx.redirectTo({
                url: '../feedback-success/feedback-success'
            }));

    },
    selectError({currentTarget}) {
        let {feedback_error_type}= this.data;
        let {index}     = currentTarget.dataset;
        let error       = feedback_error_type[index];
        error[2]        = !error[2];
        this.setData({feedback_error_type});
    },
    bindDesc({detail: {value}}) {
        desc = value;
    },
    onLoad(/*{pid}*/) {
        request.withSessionKey({
            url: 'https://dev.wenme.cc/users/feedback_error_type',
            /*data: {
                pid
            }*/
        }).then(({data}) => {
            this.setData(data);
        });
    }
});