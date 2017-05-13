//index.js
//获取应用实例
const app = getApp();

let keyword;
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
    bindKeyword({detail: {value}}) {
        keyword = value;
    },
    searchProduct() {
        // if (!keyword) {
        //     return wx.showToast({
        //         title: '请输入关键字',
        //         duration: 1000
        //     });
        // }
        wx.navigateTo({
            url: `../product-list/product-list?keyword=${keyword}&type=`
        });
    },

    scanQRCode() {
        wx.scanCode({
            success({result}) {
                wx.navigateTo({
                    url: `../product-detail/product-detail?product_iachina_link=${encodeURIComponent(result).replace(/\./g, "%2E")}`
                });
            }
        })
    }
});
