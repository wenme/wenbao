// pages/product-screen/product-screen.js
const request           = require('../../utils/request');
const {stringify}       = require('../../utils/qs');

Page({
    
    data:{
        selected:true,
        selected1:false,
        selected2:false
        },
    selected:function(e){
        this.setData({
            selected1:false,
            selected2:false,
            selected:true
        })
    },
    selected1:function(e){
        this.setData({
            selected:false,
            selected2:false,
            selected1:true
        })
    },
    selected2:function(e){
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
                [key]   : ''
            });
        }
        this.setData(dataset);
    },
    toList() {
        let {keyword, insurerid, 'class': _class, structure}    = this.data;
        let data            = {keyword};
        if (_class) {
            data.product_class  = _class;
        }
        if (!isNaN(parseInt(insurerid))) {
            data.insurer_id = insurerid;
        }
        if (structure) {
            data.product_structure  = structure;
        }
        wx.redirectTo({
            url: `../product-list/product-list?${stringify(data)}`
        });
    },
    onLoad:function(data){
        data.insurerid  = data.insurer_id;
        delete data.insurer_id;
        data.class      = data.product_class;
        delete data.product_class;
        data.structure  = data.product_structure;
        delete data.product_structure;
        this.setData(data);
        request.withSessionKey({
            url: 'https://wenme.cc/terms/get_search_filter'
        })
            .then(({data}) => {
                this.setData(data);
            });
    }
});