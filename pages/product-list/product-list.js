// pages/product-list/product-list.js
const request           = require('../../utils/request');

const app               = getApp();

let loading;

Page({
    data:{},
    toDetail({currentTarget}) {
        wx.redirectTo({
            url: `../product-detail/product-detail?pid=${currentTarget.dataset.pid}`
        });
    },
    toScreen() {
        wx.navigateTo({
            url: `../product-screen/product-screen`
        });
    },
    more() {
        if (loading) {
            return;
        }
        else {
            loading = true;
        }
        let data    = app.getQuery();
        let {type}  = data;
        let {product_list} = this.data;
        let page_num= data.page_num++;
        request.withSessionKey({
            url: `https://dev.wenme.cc/terms/${type?`my_${type}_product`:'terms_search'}`,
            data
        })
            .then(({data}) => {
                loading = false;
                if (!(data.product_list && data.product_list.length)) {
                    return app.setQuery({
                        page_num
                    });
                }
                data.product_list   = product_list.concat(data.product_list);
                this.setData(data);
            });
    },
    onLoad:function(query){
        app.resetQuery();
        app.setQuery(query);
    },

    onShow() {
        let data        = app.getQuery();
        if (data.search) {
            let {type}  = data;
            app.setQuery({search: false});
            request.withSessionKey({
                url: `https://dev.wenme.cc/terms/${type?`my_${type}_product`:'terms_search'}`,
                data
            })
                .then(({
                           data
                       }) => {
                    data.type = type;
                    this.setData(data);
                });
        }
    },

    onUnload() {
        app.setQuery({search: true});
    }
});