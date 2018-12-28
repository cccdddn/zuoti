// pages/register/register.js
//register.js
//获取应用实例
const app = getApp()
const userUrl = require('../../config.js').userUrl

Page({
  data: {
    name: '',   //姓名
    tel: '',    //手机号
    school: '', //学校
    num: '',    //学号
    enterYear: '',   //入学年份
  },
  onLoad: function () {
  },
  changeName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  changeTel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  changeSchool: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  changeNum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  changeYear: function (e) {
    this.setData({
      enterYear: e.detail.value
    })
  },
  bindSubmit: function (e) {
    //todo 这里需要验证用户输入的合法性，时间原因我仅判断非空
    //理论上需要判断格式等等
    if (!this.data.name) {
      this.openAlert('姓名不能为空')
      return
    } else if (!this.data.tel) {
      this.openAlert('手机号不能为空')
      return
    } else if (!this.data.school) {
      this.openAlert('学校不能为空')
      return
    } else if (!this.data.num) {
      this.openAlert('学号不能为空')
      return
    } else if (!this.data.enterYear) {
      this.openAlert('入学年份不能为空')
      return
    }
    wx.request({
      url: userUrl + 'register_by_openid',
      data: {
        openid: wx.getStorageSync('jiaoxue_OPENID'),
        globalData: JSON.stringify(app.globalData.userInfo),
        name: this.data.name,
        tel: this.data.tel,
        school: this.data.school,
        num: this.data.num,
        enter_year: this.data.enterYear
      },
      success: res => {
        if (res.data.is_register) {
          console.log(res.data);
          wx.navigateTo({
            url: '../index/index',
          })
        } else {
          this.openAlert(res.data.data)
        }
      },
      fail: res => {
      },
    })
  },
  openAlert: function (e) {
    wx.showModal({
      content: e,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {

        }
      }
    });
  }
})