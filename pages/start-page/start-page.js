// pages/start-page/start-page.js
Page({
  data: {
    autoplay: false
  },
  swipclick: function() {
    wx.switchTab({
      url: '../index/index',
      success: function(res){
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
})