// pages/product-list/product-list.js
const request           = require('../../utils/request');
const {stringify}       = require('../../utils/qs');

let data;

Page({
    data:{},
    toDetail({currentTarget}) {
        wx.redirectTo({
            url: `../product-detail/product-detail?pid=${currentTarget.dataset.pid}`
        });
    },
    toScreen() {
        wx.redirectTo({
            url: `../product-screen/product-screen?${stringify(data)}`
        });
    },
    onLoad:function(_data){
        data    = _data;
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