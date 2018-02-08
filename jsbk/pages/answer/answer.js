import { answerData } from '../../data/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList: [],
    answerTipShow: true,
    answerTip: '*请输入关键字搜索'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onAnswerSearch: function (e) {
    if (!!e.detail.value) {
      this.progressAnswerData(e.detail.value);
    } else {
      this.setData({
        answerTipShow: true,
        answerTip: '*请输入关键字搜索'
      })
    }

  },
  progressAnswerData: function (keyord) {
    var list = answerData;
    var renderList = [];
    list.forEach(item => {
      var index = item[0].indexOf(keyord)
      if (index > -1) {
        renderList.push({
          wordHighlightBefore: item[0].substr(0, index),
          wordHighlight: item[0].substr(index, keyord.length),
          wordHighlightAfter: item[0].substr(index + keyord.length),
          answer: item[1]
        })
      }
    });
    this.setData({
      answerList: renderList,
      answerTipShow: renderList.length > 0 ? false : true,
      answerTip: '没有找到 “' + keyord + '” 相关的问题'
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