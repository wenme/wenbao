// pages/question-class-page/question-class-page.js
const request           = require('../../utils/request');

Page({
    data:{},

    onLoad(data){
        this.setData(data);
        request.withSessionKey({
            url: 'https://wenme.cc/helpdesk/get_question_list',
            data
        })
            .then(({data}) => {
                this.setData(data);
            });
    }
});