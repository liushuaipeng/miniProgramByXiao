// pages/movies/more_movie/more_movie.js
var app = getApp();
import { convertToStarsArray } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: "",
    startCount: 0,
    pageCount: 21,
    movies: [],
    isMoreData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.categoryTitle = category;
    var dataUrl = '';
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.douBanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.douBanBase + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataUrl = app.globalData.douBanBase + "/v2/movie/top250";
        break;
    };
    this.data.requestUrl = dataUrl;
    dataUrl = dataUrl + '?start=' + this.data.startCount + '&count=' + this.data.pageCount;
    this.getMovieListData(dataUrl);
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
    if (this.data.startCount == 0) {
      this.setData({
        movies: [],
        isMoreData: true
      })
    };
    var startCount = this.data.startCount + this.data.pageCount;
    if (data.total <= startCount) {
      this.setData({
        isMoreData: false
      })
    };
    var movies = this.data.movies;
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
      movies: movies,
      startCount: startCount
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })
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
    this.setData({
      startCount: 0
    });
    var requestUrl = this.data.requestUrl + '?start=0&count=' + this.data.pageCount;
    this.getMovieListData(requestUrl);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isMoreData) {
      var requestUrl = this.data.requestUrl + '?start=' + this.data.startCount + '&count=' + this.data.pageCount;
      console.log(requestUrl);
      this.getMovieListData(requestUrl);
      wx.showNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})