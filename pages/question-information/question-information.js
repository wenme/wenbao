// pages/question-information/question-information.js
const request           = require('../../utils/request');

Page({
    data:{},

    onLoad(data){
        this.setData(data);
        request.withSessionKey({
            url: 'https://api.wenme.cc/helpdesk/get_answer',
            data
        })
            .then(({data}) => {
                this.setData(data);
            });
    }
});