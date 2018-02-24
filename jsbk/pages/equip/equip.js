import { config, schoolData, positionData, equipClass, equipFilter, checkboxFilter } from '../../data/index';
import { throttle } from '../../npm/index';
var selfForEquipPage;
Page({
  data: {
    equipTipSelect: "* 请选择心法以及部位",
    schoolArray: [],
    positionArray: [],
    schoolIndex: 0,
    positionIndex: 0,
    equipData: [],
    equipQualityMin: 1150,
    equipQualityMax: 1400,
    resetEquipData: [],
    equipChecked: []
  },
  onLoad: function () {
    this.setData({
      schoolArray: schoolData,
      positionArray: positionData,
      equipFilterArray: equipFilter,
      checkboxFilterArray: checkboxFilter,
      domain: config.domain
    });
    selfForEquipPage = this;
  },
  // 发起请求前处理
  beforeRequest: function () {
    var selfData = this.data;
    if (!selfData.positionArray[selfData.positionIndex].id) {
      return;
    }
    if (!selfData.schoolArray[selfData.schoolIndex].id) {
      return;
    };
    this.getEquipData();
    this.setData({
      equipTipSelect: "加载中...",
      equipData: []
    })
  },
  // 发起请求
  getEquipData: throttle(function () {
    var _self = selfForEquipPage;
    wx.request({
      url: config.domain + "/jw3zb/list/?position=" + _self.data.positionArray[_self.data.positionIndex].id + "&school=" + _self.data.schoolArray[_self.data.schoolIndex].id + "",
      method: "GET",
      success: function (res) {
        _self.processEquipData(res.data.data.list);
      }
    })
  }, 400),
  // 数据处理
  processEquipData: function (list) {
    var equipData = list;
    equipData.forEach(item => {
      item.className = equipClass[item.class]
    });
    this.setData({
      resetEquipData: equipData
    });
    this.filterEquipData();
  },
  // 数据筛选
  filterEquipData: throttle(function () {
    var selfData = selfForEquipPage.data;
    var resetArr = selfForEquipPage.data.resetEquipData;
    var newArr = [];
    resetArr.forEach(item => {
      if (item.quality > selfData.equipQualityMax) {
        return;
      }
      if (item.quality < selfData.equipQualityMin) {
        return;
      }
      var flag = true;
      selfData.equipChecked.forEach(checkItem => {
        if (item.filter.indexOf(checkItem) < 0) {
          flag = false;
        }
      });
      if (!flag) {
        return;
      }
      newArr.push(item);

    });
    selfForEquipPage.setData({
      equipData: newArr,
      equipTipSelect: '暂无数据'
    })
  }, 600),
  // 装备详情跳转
  onEquipDetail: function (e) {
    wx.navigateTo({
      url: 'equipDetail/equipDetail?equipId=' + e.currentTarget.dataset.id,
    })
  },
  // 心法下拉菜单
  bindPickerSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    });
    this.beforeRequest();
  },
  // 部位下拉菜单
  bindPickerPositionChange: function (e) {
    this.setData({
      positionIndex: e.detail.value
    });
    this.beforeRequest();
  },
  // 最小品质
  sliderMinChange: function (e) {
    var value = e.detail.value
    if (value > this.data.equipQualityMax) {
      value = this.data.equipQualityMax;
    };
    this.setData({
      equipQualityMin: value
    });
    this.filterEquipData();
  },
  // 最大品质
  sliderMaxChange: function (e) {
    var value = e.detail.value;
    if (value < this.data.equipQualityMin) {
      value = this.data.equipQualityMin;
    };
    this.setData({
      equipQualityMax: value
    });
    this.filterEquipData();
  },
  // 属性多选框
  checkboxChange: function (e) {
    this.setData({
      equipChecked: e.detail.value
    });
    this.filterEquipData();
  }
})