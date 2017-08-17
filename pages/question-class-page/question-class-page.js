// pages/question-class-page/question-class-page.js
const request           = require('../../utils/request');

let loading;

Page({
    data:{},

    more() {
        if (loading) {
            return;
        } else {
            loading = true;
        }
        let {data}  = this;
        let {question_list}  = data;
        let page_num= data.page_num++;
        request.withSessionKey({
            url: `https://dev.wenme.cc/helpdesk/get_question_list`,
            data
        })
            .then(({data}) => {
                loading = false;
                if (!(data.question_list && data.question_list.length)) {
                    return this.setData({
                        page_num
                    });
                }
                data.question_list   = question_list.concat(data.question_list);
                this.setData(data);
            });
    },

    onLoad(data){
        this.setData(data);
        request.withSessionKey({
            url: 'https://dev.wenme.cc/helpdesk/get_question_list',
            data
        })
            .then(({data}) => {
                this.setData(data);
            });
    }
});