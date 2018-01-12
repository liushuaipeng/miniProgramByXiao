var post_data = require('../../../data/post_data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingmucis: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    var postData = post_data.postData(postid);
    var postsCollected = wx.getStorageSync('postCollected');
    if (postsCollected) {
      var collected = postsCollected[postid];
    };
    this.setData({
      postId: postid,
      postData: postData,
      collected: collected || false
    });
  },
  // 点击收藏
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('postCollected');
    if (postsCollected) {
      var collected = !postsCollected[this.data.postId];
    } else {
      var postsCollected = {};
      var collected = true;
    }
    postsCollected[this.data.postId] = collected;
    wx.setStorageSync('postCollected', postsCollected);
    this.setData({
      collected: collected
    })
    wx.showLoading({
      title: collected ? '收藏中...' : '取消中...'
    })
    setTimeout(function () {
      wx.hideLoading();
      wx.showToast({
        title: collected ? '收藏成功' : '取消成功',
        duration: 1000
      })
    }, 2000)
  },
  // 点击分享
  onShareTap: function (event) {
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        '分享到朋友圈',
        '分享到QQ',
        '分享到微博'
      ],
      itemColor: "#405f80",
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 音乐播放
  onMusicTap: function (event) {
    var isPlayingmucis = this.data.isPlayingmucis;
    if (isPlayingmucis) {
      wx.pauseBackgroundAudio();
      this.data.isPlayingmucis = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
        title: '夜夜夜夜-齐秦',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000'
      })
      this.data.isPlayingmucis = true;
    }

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