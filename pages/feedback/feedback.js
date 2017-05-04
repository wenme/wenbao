// pages/feedback/feedback.js
Page({
    data: {
    items: [
          {text: '产品信息错误', type: 'success'},
          {text: '产品评级不合理', type: 'circle'},
          {text: '找不到需要的信息', type: 'circle'},
        ]
      },
 feedbackok: function() {
    wx.redirectTo({
      url: '../feedback-success/feedback-success'
    })
  },
    bindCheckbox: function(e) {
        /*绑定点击事件，将checkbox样式改变为选中与非选中*/
 
        //拿到下标值，以在items作遍历指示用
        var index = parseInt(e.currentTarget.dataset.index);
        //原始的icon状态
        var type = this.data.items[index].type;
        var items = this.data.items;
        if (type == 'circle') {
            //未选中时
            items[index].type = 'success';
        } else {
            items[index].type = 'circle';
        }
 
        // 写回经点击修改后的数组
        this.setData({
            items: items
        });
        // 遍历拿到已经勾选的值
        var checkedValues = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'success_circle') {
                checkedValues.push(items[i].value);
            }
        }
        // 写回data，供提交到网络
        this.setData({
            checkedValues: checkedValues
        });
    }
})