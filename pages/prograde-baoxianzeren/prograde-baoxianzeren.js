// pages/prograde-baoxianzeren/prograde-baoxianzeren.js
Page({
    data:{},
    onLoad:function({pid, mCode}){
        app.getSessionKey()
            .then(session_key => request({
                url: 'https://wenme.cc/terms/product_brief_evaluation',
                data: {pid, session_key},
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }))
            .then(({
                data: {
                    err_code,
                    evaluation_info
                }
            }) => {
                if (err_code === 0) {
                    this.setData(evaluation_info);
                }
            });
    },
    onReady:function(){
        // 页面渲染完成
    },
    onShow:function(){
        // 页面显示
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    }
});