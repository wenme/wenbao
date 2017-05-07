// pages/question-class-page/question-class-page.js
const request           = require('../../utils/request');

Page({
    data:{},

    more() {
        let {data}  = this;
        let {question_list}  = data;
        data.page_num++;
        request.withSessionKey({
            url: `https://wenme.cc/helpdesk/get_question_list`,
            data
        })
            .then(({data}) => {
                data.question_list   = question_list.concat(data.question_list);
                this.setData(data);
            });
    },

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