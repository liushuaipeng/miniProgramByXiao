// pages/movies/movies.js
var app = getApp();
import { convertToStarsArray } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.douBanBase + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = app.globalData.douBanBase + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = app.globalData.douBanBase + "/v2/movie/top250?start=0&count=3";
    // 正在热映
    this.getMovieListData(inTheatersUrl, 'inTheatersList');
    // 即将上映
    this.getMovieListData(comingSoonUrl, 'comingSoonList');
    // top250
    this.getMovieListData(top250Url, 'top250List');
  },
  // 请求函数
  getMovieListData: function (url, key) {
    var _self = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        _self.processDoubanData(res.data, key);
      }
    })
  },
  // 数据处理
  processDoubanData: function (data, key) {
    var movies = [];
    data.subjects.forEach(item => {
      var title = item.title;
      if (title.length > 5) {
        title = title.substr(0, 6);
      }
      var temp = {
        title: title,
        average: item.rating.average,
        starts: convertToStarsArray(item.rating.stars),
        coverageUrl: item.images.large,
        movieId: item.id
      }
      movies.push(temp);
    });
    var handData = {};
    var referenceObj = {
      inTheatersList: '正在热映',
      comingSoonList: '即将上映',
      top250List: 'Top250'
    }
    handData[key] = {
      movies: movies,
      title: referenceObj[key]
    }
    this.setData(handData);
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