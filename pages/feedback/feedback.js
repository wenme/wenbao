// pages/feedback/feedback.js
const request           = require('../../utils/request');

let desc;

Page({
    data: {},
    feedbackok() {
        let {pid, error_type}   = this.data;
        let data    = {
            pid,
            error_id_arr: error_type.filter(error => !!error[2]).map(([id]) => id).join(',')
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
        let {error_type}= this.data;
        let {index}     = currentTarget.dataset;
        let error       = error_type[index];
        error[2]        = !error[2];
        this.setData({error_type});
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
        }).then(({data}) => {
            this.setData(data);
        });
    }
});