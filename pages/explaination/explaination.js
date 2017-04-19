const request           = require('../../utils/request');

const app               = getApp();

Page({
    data: {
        title   : "",
        explaination: ""

        // tabbar  : app.globalData.tabbar
    },

    onLoad({tid}) {
        app.getSessionKey()
            .then(session_key => request({
                url: 'https://wenme.cc/helpdesk/get_explaination',
                data: {
                    tid,
                    session_key
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }))

            .then(({data: {
                err_code,
                explaination_rslt
            }}) => err_code === 0 && this.setData(explaination_rslt))
    }
});
