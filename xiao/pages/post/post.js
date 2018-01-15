var post_data = require('../../data/post_data.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  onPostTap: function (event) {
    var postid = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post_detail/post_detail?id=' + postid,
    })
  },
  onSwiperItemTap: function (event) {
    var postid = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post_detail/post_detail?id=' + postid,
    })
  },
  onSwiperTap: function (event) {
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post_detail/post_detail?id=' + postid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('post-onLoad');
    this.setData({
      postList: post_data.postList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('post-onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('post-onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('post-onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('post-onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log('post-onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('post-onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.log('post-onShareAppMessage');
  }
})