// pages/catalogue/catalogue.js
Page({
  data:{},
  //事件处理函数
  Shouye: function() {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  Product: function() {
    wx.redirectTo({
      url: '../product-detial/product-detial'
    })
  },
  Company: function() {
    wx.redirectTo({
      url: '../company-detial/company-detial'
    })
  },
  Gradea: function() {
    wx.redirectTo({
      url: '../product-grade/product-grade'
    })
  },
  Baoxianjin: function() {
    wx.redirectTo({
      url: '../prograde-baoxianjin/prograde-baoxianjin'
    })
  },
  Bxzeren: function() {
    wx.redirectTo({
      url: '../prograde-baoxianzeren/prograde-baoxianzeren'
    })
  },
  Bxfenhong: function() {
    wx.redirectTo({
      url: '../prograde-fenhong/prograde-fenhong'
    })
  },
  Bxtouzi: function() {
    wx.redirectTo({
      url: '../prograde-touzi/prograde-touzi'
    })
  },
  Bxtoulianzhanghu: function() {
    wx.redirectTo({
      url: '../prograde-touzitoulian/prograde-touzitoulian'
    })
  },
  Bxwanneng: function() {
    wx.redirectTo({
      url: '../prograde-wanneng/prograde-wanneng'
    })
  },
  Bxzerenchuwai: function() {
    wx.redirectTo({
      url: '../prograde-zerenchuwai/prograde-zerenchuwai'
    })
  },
  Bxzhifu: function() {
    wx.redirectTo({
      url: '../prograde-zhifu/prograde-zhifu'
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