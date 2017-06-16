// pages/question-class/question-class.js
const request           = require('../../utils/request');

Page({
    data:{},

    onLoad:function(){
        request.withSessionKey({
            url: 'https://api.wenme.cc/helpdesk/get_question_category'
        })
            .then(({data}) => {
                this.setData(data);
            });
    }
});