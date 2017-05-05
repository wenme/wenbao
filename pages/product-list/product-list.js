// pages/product-list/product-list.js
const request           = require('../../utils/request');

Page({
    data:{},
    toDetail({currentTarget}) {
        wx.redirectTo({
            url: `../product-detail/product-detail?pid=${currentTarget.dataset.pid}`
        });
    },
    onLoad:function(data){
        request.withSessionKey({
            url: 'https://wenme.cc/terms/terms_search',
            data
        })
            .then(({
                data: {
                    product_list,
                    total_page_count,
                    total_product_count
                }
            }) => {
                this.setData({product_list, total_page_count, total_product_count});
            });
    }
});