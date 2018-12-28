// pages/my/myinfo.js
//myinfo.js
const userUrl = require('../../config.js').userUrl

Page({

  /**
  * 页面的初始数据
  */
  data: {
    userInfo: {},
    sex_array: ['保密', '男', '女']
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // wx.request({
    //   url: userUrl + 'getInfo',
    //   data: {
    //     'openid': wx.getStorageSync('jiaoxue_OPENID'),
    //   },
    //   success: function (res) {
    //     wx.setStorageSync('userInfo', res.data.data)
    //   },
    // })
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(this.data.userInfo)
  },

  /**
  * 修改个人信息
  */
  choseImage: function () {
    //修改头像需用到wx.uploadfile()上传至服务器
    //这里不开放图片上传的接口，有需要可学习后台相关自行搭建服务器
    wx.showToast({
      title: '头像暂不支持修改',
      icon: 'none'
    })
  },
  bindName: function () {
    wx.navigateTo({
      url: './change?changeWhat=name',
    })
  },
  bindTel: function () {
    wx.navigateTo({
      url: './change?changeWhat=tel',
    })
  },
  bindSex: function () {
    wx.navigateTo({
      url: './change?changeWhat=sex',
    })
  },
  bindSchool: function () {
    wx.navigateTo({
      url: './change?changeWhat=school',
    })
  },
  bindNumber: function () {
    wx.navigateTo({
      url: './change?changeWhat=number',
    })
  },
  bindYear: function () {
    wx.navigateTo({
      url: './change?changeWhat=enter_year',
    })
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  }
})