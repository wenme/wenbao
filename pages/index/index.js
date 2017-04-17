//index.js
//获取应用实例
const app = getApp();
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

    // tabbar  : app.globalData.tabbar
  },
  //事件处理函数
  searchProduct() {

  },
  scanQRCode() {
    wx.scanCode({
      success({result, scanType, charSet}) {
        wx.redirectTo({
          url: `../product-detail/product-detail?product_iachina_link=${encodeURIComponent(result).replace(/\./g, "%2E")}`
        });
      }
    })
  }
});
