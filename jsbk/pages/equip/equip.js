import { schoolData, positionData } from '../../data/index';

Page({
  data: {
    schoolArray: [],
    positionArray: [],
    schoolIndex: 0,
    positionIndex: 0
  },
  onLoad: function () {
    this.setData({
      schoolArray: schoolData,
      positionArray: positionData
    })
  },
  bindPickerSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  bindPickerPositionChange: function (e) {
    this.setData({
      positionIndex: e.detail.value
    })
  }
})