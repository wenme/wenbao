// pages/product-screen/product-screen.js
const request           = require('../../utils/request');

const app               = getApp();

Page({
    
    data:{
        selected:true,
        selected1:false,
        selected2:false
        },
    selected(){
        this.setData({
            selected1:false,
            selected2:false,
            selected:true
        });
    },
    selected1(){
        this.setData({
            selected:false,
            selected2:false,
            selected1:true
        });
    },
    selected2(){
        this.setData({
            selected:false,
            selected1:false,
            selected2:true
        })
    },
    select({target  : {dataset}}) {
        let [key] = Object.keys(dataset);
        if (dataset[key] === this.data[key]) {
            return this.setData({
                [key]   : null
            });
        }
        this.setData(dataset);
    },
    toList() {
        let {
            insurerid       : insurer_id,
            'class'         : product_class,
            structure       : product_structure
        }                   = this.data;
        app.setQuery({
            search          : true,
            page_num        : 1,
            insurer_id,
            product_class,
            product_structure
        });
        wx.navigateBack();
    },
    onLoad:function(){
        let data        = app.getQuery();
        this.setData({
            insurerid   : data.insurer_id,
            'class'     : data.product_class,
            structure   : data.product_structure
        });
        request.withSessionKey({
            url: 'https://wenme.cc/terms/get_search_filter'
        })
            .then(({data}) => {
                this.setData(data);
            });
    }
});