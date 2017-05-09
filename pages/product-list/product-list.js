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
    more() {
        let {data}  = this;
        let {type, product_list}  = data;
        let page_num= data.page_num++;
        request.withSessionKey({
            url: `https://wenme.cc/terms/${type?`my_${type}_product`:'terms_search'}`,
            data
        })
            .then(({data}) => {
                if (!(data.product_list && data.product_list.length)) {
                    return this.setData({
                        page_num
                    });
                }
                data.product_list   = product_list.concat(data.product_list);
                this.setData(data);
            });
    },
    onLoad:function(_data){
        data        = _data;
        this.setData(data);
        let {type}  = data;
        request.withSessionKey({
            url: `https://wenme.cc/terms/${type?`my_${type}_product`:'terms_search'}`,
            data
        })
            .then(({
                data
            }) => {
                this.setData(data);
            });
    }
});