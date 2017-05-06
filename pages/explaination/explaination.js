const request           = require('../../utils/request');

Page({
    data: {
        title   : "",
        explaination: ""

        // tabbar  : app.globalData.tabbar
    },

    onLoad({tid}) {
        request.withSessionKey({
            url: 'https://wenme.cc/helpdesk/get_explaination',
            data: {tid}
        })

            .then(({data: {
                err_code,
                explaination_rslt
            }}) => err_code === 0 && this.setData(explaination_rslt));
    }
});
