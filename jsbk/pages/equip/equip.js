import { schoolData, positionData, equipClass, equipFilter } from '../../data/index';
import { throttle } from '../../npm/index';
var selfForEquipPage;
var equipFilterArray = ["会心", "破防", "加速", "命中", "无双", "化劲", "治疗", "外防", "内防", "闪避", "招架", "拆招", "御劲"];
Page({
  data: {
    schoolArray: [],
    positionArray: [],
    schoolIndex: 0,
    positionIndex: 0,
    equipData: [],
    equipQualityMin: 1150,
    equipQualityMax: 1400,
    resetEquipData: []
  },
  onLoad: function () {
    this.setData({
      schoolArray: schoolData,
      positionArray: positionData,
      equipFilterArray: equipFilter
    });
    // this.getEquipData();
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
    selfForEquipPage = this;
    this.getEquipData();
  },
  // 发起请求
  getEquipData: throttle(function () {
    var _self = selfForEquipPage;
    wx.request({
      url: "https://cgz2ufde.qcloud.la/jw3zb/list/?position=" + _self.data.positionArray[_self.data.positionIndex].id + "&school=" + _self.data.schoolArray[_self.data.schoolIndex].id + "",
      method: "GET",
      success: function (res) {
        _self.processEquipData(res.data.data.list);
      }
    })
  }, 1000),
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
      if (item.quality <= selfData.equipQualityMax && item.quality >= selfData.equipQualityMin) {
        newArr.push(item);
      }
    });
    selfForEquipPage.setData({
      equipData: newArr
    })
  }, 600),
  bindPickerSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    });
    this.beforeRequest();
  },
  bindPickerPositionChange: function (e) {
    this.setData({
      positionIndex: e.detail.value
    });
    this.beforeRequest();
  },
  sliderMinChange: function (e) {
    var value = e.detail.value
    if (value > this.data.equipQualityMax) {
      value = this.data.equipQualityMax;
    };
    this.setData({
      equipQualityMin: value
    });
    selfForEquipPage = this;
    this.filterEquipData();
  },
  sliderMaxChange: function (e) {
    var value = e.detail.value;
    if (value < this.data.equipQualityMin) {
      value = this.data.equipQualityMin;
    };
    this.setData({
      equipQualityMax: value
    });
    selfForEquipPage = this;
    this.filterEquipData();
  }
})