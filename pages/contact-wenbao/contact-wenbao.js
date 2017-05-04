// pages/contact-wenbao/contact-wenbao.js
Page({
  data:{
    loading: false,
    butstatus: true
  },
  bindTextAreaBlur: function() {
    this.setData({
      butstatus: true
    })
  },
  feedbackok: function() {
    wx.redirectTo({
      url: '../feedback-success/feedback-success'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
})