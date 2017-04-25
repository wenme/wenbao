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

    // tabbar          : app.globalData.tabbar,
  },

  toZeren() {},

  onLoad:function({pid}){
      app.getSessionKey()
          .then(session_key => wx.request({
              url: 'https://wenme.cc/terms/product_brief_evaluation',
              data: {pid, session_key},
              method: 'POST',
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
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
          }));
  }
});