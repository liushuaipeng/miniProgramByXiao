import { schoolData, positionData, equipClass, equipFilter, checkboxFilter } from '../../../data/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipDetailData: {},
    equipFilter: equipFilter,
    basicsAttr: ['body', 'spirit', 'strength', 'agility', 'spunk']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEquipDetailData()
  },
  // 发起请求
  getEquipDetailData() {
    var _self = this;
    var id = 25674;
    wx.request({
      url: "https://cgz2ufde.qcloud.la/jw3zb/detail/" + id,
      method: "GET",
      success: function (res) {
        if (res.data.code == 1) {

          _self.progressData(res.data.data);
        }
        console.log(_self.data.equipDetailData)
      }
    })
  },
  // 数据处理
  progressData(data) {
    var equipDetailData = data;
    var basicsAttr = ['body', 'spirit', 'strength', 'agility', 'spunk'];
    this.setData({
      equipDetailData: data
    });
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