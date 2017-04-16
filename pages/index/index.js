//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: [
      '../../images/home-tips01.jpg',
      '../../images/home-tips02.jpg',
      '../../images/home-tips03.jpg'
    ],
    autoplay: false,
    interval: 5000,
    duration: 1000,

    tabbar  : app.globalData.tabbar
  },
  //事件处理函数
  searchProduct() {

  },
  scanQRCode() {
    wx.scanCode({
      success({result}) {
        wx.redirectTo({
          url: `../product-detail/product-detail?product_iachina_link=${result}`
        });
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
