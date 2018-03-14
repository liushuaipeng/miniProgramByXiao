// pages/home/articleDetail/articleDetail.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetailTitle: '',
    articleDetailTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var url = 'https://998629976.liushuaipeng.cn/jw3home/article/detail?link=' + options.link;
    if (options.id != 'null') {
      url = url + '?id=' + options.id
    }
    wx.request({
      url: url,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var html = res.data.data.html;
        that.setData({
          articleDetailTitle: res.data.data.title,
          articleDetailTime: res.data.data.date
        })
        WxParse.wxParse('data', 'html', html, that, 10);
        wx.hideLoading();
      },
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})