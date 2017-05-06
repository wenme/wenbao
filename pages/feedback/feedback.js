// pages/feedback/feedback.js
const request           = require('../../utils/request');

let desc;

Page({
    data: {},
    feedbackok() {
        let {pid, id}   = this.data;
        let data    = {
            pid,
            error_id    : id
        };
        if (desc) {
            data.error_desc = desc;
        }
        request.withSessionKey({
            url : 'https://wenme.cc/terms/debug_report',
            data
        })
            .then(({data: {err_code}}) => err_code === 0 && wx.redirectTo({
                url: '../feedback-success/feedback-success'
            }));

    },
    selectError({currentTarget}) {
        this.setData(currentTarget.dataset);
    },
    bindDesc({detail: {value}}) {
        desc = value;
    },
    onLoad({pid}) {
        request.withSessionKey({
            url: 'https://wenme.cc/terms/debug_error_type',
            data: {
                pid
            }
        }).then(({data}) => this.setData(data));
    }
});