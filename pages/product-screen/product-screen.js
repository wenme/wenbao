// pages/product-screen/product-screen.js
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
    chooseD: function (event) {
        if (this.class == 'chose') {
            this.class = '';
        } else {
            this.class = 'chose';
        }
    }
})