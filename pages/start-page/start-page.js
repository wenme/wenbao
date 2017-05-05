// pages/start-page/start-page.js
Page({
  data: {
    autoplay: false
  },
  swipclick() {
    wx.switchTab({
      url: '../index/index'
    });
  },
})