// pages/user-home/user-home.js
const request           = require('../../utils/request');

Page({
    data:{},

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