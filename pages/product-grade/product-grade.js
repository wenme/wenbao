// pages/product-grade/product-grade.js
const app               = getApp();

Page({
  data:{
    product   : "",
    product_score: 0,
    product_rating: 0,

    life_benefit_count: 0,
    disease_benefit_count: 0,
    accident_benefit_count: 0,
    medical_benefit_count: 0,
    saving_benefit_count: 0,
    
    product_structure: "",
    waiting_period  : "",
    exclusion_count : 0,

    tabbar          : app.globalData.tabbar,
  },
  onLoad:function({pid}){
      wx.request({
          url: 'https://wenme.cc/terms/product_brief_evaluation',
          data: {pid},
          method: 'POST',
          success: ({
              data: {
                  err_code,
                  evaluation_info
              }
          }) => {
              if (err_code === 0) {
                  this.setData(evaluation_info);
              }
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
})