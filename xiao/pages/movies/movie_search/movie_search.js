// pages/movies/movie_search/movie_search.js
var app = getApp();
import { convertToStarsArray } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoFocus: true,
    searchHistoryValue: '',
    movies: [],
    historyShow: true,
    historyData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var historyData = wx.getStorageSync('movieHistorySearchData') || [];
    this.setData({
      historyData,
      placeholderData: options.placeholderData
    })
  },
  onBindFocus: function (event) {

  },
  // 点击确定搜索
  onBindConfirm: function (event) {
    var text = event.detail.value;
    if (!text) {
      text = this.data.placeholderData
    };
    this.historySearchHandle(text);
  },
  // 点击搜索历史
  onHistoryItem: function (event) {
    var text = event.currentTarget.dataset.text;
    this.setData({
      searchHistoryValue: text
    })
    this.historySearchHandle(text);
  },
  // 清空搜索历史
  onClearHistory: function () {
    var _self = this;
    wx.showModal({
      title: '确定清除历史搜索吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          _self.setData({
            historyData: []
          });
          wx.setStorageSync('movieHistorySearchData', []);
        }

      }
    })
  },
  // 搜索历史处理
  historySearchHandle: function (text) {
    var url = app.globalData.douBanBase + "/v2/movie/search?count=21&q=" + text;
    wx.showNavigationBarLoading();
    var historyData = this.data.historyData;
    var onceIndex = 'noonce';
    historyData.forEach((item, i) => {
      if (item == text) {
        onceIndex = i;
      }
    });
    if (onceIndex == 'noonce') {
      if (historyData.length >= 15) {
        historyData.shift();
        historyData.unshift(text);
      } else {
        historyData.unshift(text);
      }
    } else {
      historyData.splice(onceIndex, 1);
      historyData.unshift(text);
    };
    wx.setStorageSync('movieHistorySearchData', historyData);
    this.setData({
      historyShow: false,
      historyData
    })
    this.getMovieListData(url);
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
        _self.processDoubanData(res.data)
      }
    })
  },
  // 数据处理
  processDoubanData: function (data) {
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

    this.setData({
      movies: movies
    });
    wx.hideNavigationBarLoading();
  },
  // 详情跳转
  onMovieTap: function (event) {
    wx.navigateTo({
      url: '../movie_detail/movie_detail?id=' + event.currentTarget.dataset.movieid,
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