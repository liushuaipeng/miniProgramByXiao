Page({
  data: {
    currentId: 'allnews',
    refreshAnimation: false,
    allnewsList: [],
    pressList: [],
    announceList: [],
    allnewsScrollPosition: 0,
    pressScrollPosition: 0,
    announceScrollPosition: 0,
    pressPage: 1,
    announcePage: 1,
    homeArticleRefresh: false
  },
  onLoad: function (e) {
    this.getHomeData('allnews');
  },
  // 点击详情跳转
  jumpArticleDetail(e) {
    var link = e.currentTarget.dataset.link;
    var id = null;
    if (link.indexOf('id=') >= 0) {
      id = link.substr(link.indexOf('id=') + 3);
      link = link.substr(0, link.indexOf('?'))
    }
    wx.navigateTo({
      url: 'articleDetail/articleDetail?link=' + link + '&id=' + id
    })
  },
  onNavTap: function (e) {
    this.setData({
      currentId: e.currentTarget.dataset.info
    })
  },
  onSwiperBindchange: function (e) {
    var currentItemId = e.detail.currentItemId;
    if (!this.data[currentItemId + "List"].length) {
      this.getHomeData(currentItemId);
    }
    if (!!e.detail.source) {
      this.setData({
        currentId: currentItemId
      })
    }
  },
  // 发起请求
  getHomeData(key, category) {
    this.setData({
      refreshAnimation: true
    })
    var _self = this;
    var url = 'https://998629976.liushuaipeng.cn/jw3home/article/list/' + key;
    if (key != 'allnews' && category == 'loading') {
      url = url + '?page=' + (_self.data[key + 'Page'] + 1)
    };
    wx.request({
      url: url,
      success: function (res) {
        var list;
        var data = {
          homeArticleRefresh: false,
          refreshAnimation: false
        };
        if (category == 'loading') {
          list = _self.data[key + 'List'];
          data[key + 'Page'] = _self.data[key + 'Page'] + 1;
        } else {
          list = [];
          data[key + 'Page'] = 1;
        }
        res.data.data.list.forEach((item) => {
          list.push(item);
        })
        data[key + 'List'] = list
        _self.setData(data);
      }
    })
  },
  onScrollTolower: function (e) {
    if (this.data.refreshAnimation) {
      return;
    }
    this.getHomeData(e.target.dataset.id, 'loading');
  },
  homeRefresh: function (e) {
    if (this.data.refreshAnimation) {
      return
    };
    var key = this.data.currentId;
    var data = {
      homeArticleRefresh: true,
    };
    data[key + 'ScrollPosition'] = 0;
    this.setData(data);
    this.getHomeData(key);
  }
})