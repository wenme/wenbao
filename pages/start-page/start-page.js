// pages/start-page/start-page.js
const version   = require('../../config/version');

Page({
    data: {
        autoplay: false
    },
    swipclick() {
        wx.switchTab({
            url: '../index/index'
        });
    },

    onLoad() {
        let toIndex = '';
        try {
            toIndex = wx.getStorageSync(version);
        } catch (e) {
            // ignore
        }
        if (toIndex) {
            wx.switchTab({
                url: '../index/index'
            });
        } else {
            try {
                wx.setStorageSync(version, 'true');
            } catch (e) {
                // ignore
            }
        }
    }
});