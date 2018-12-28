// pages/my/change.js
const userUrl = require('../../config.js').userUrl

Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '请输入内容',
    changeWhat: '',
    titleArray: {
      name: "姓名",
      number: "学号",
      tel: "手机号",
      school: "学校",
      sex: "性别",
      enter_year: "入学年份"
    },
    sexArray: {
      0: '未知',
      1: '男',
      2: '女'
    },
    value: '',
    tmp: '',
    userInfo: wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      changeWhat:options.changeWhat,
      placeholder:'请输入' + this.data.titleArray[options.changeWhat],
      value:this.data.userInfo[options.changeWhat]
    })
    if(options.changeWhat == 'sex'){
      this.setData({
        value:this.data.sexArray[this.data.userInfo[options.changeWhat]]
      })
    }
    wx.setNavigationBarTitle({
      title: '修改' + this.data.titleArray[options.changeWhat]
    })
  },

  valueChange:function (res) {
    console.log(res);
    this.setData({
      tmp:res.detail.value
    })
    console.log(this.data.tmp)
  },
  submit:function (res) {
    if(this.data.tmp == ''){
      wx.showToast({
        title: this.data.titleArray[this.data.changeWhat] + '不能为空',
        icon: 'none'
      })
      return
    }

    if(this.data.changeWhat == 'name'){

    } else if(this.data.changeWhat == 'sex'){
      if (this.data.tmp == '男') {
        this.data.tmp = 1
      } else if (this.data.tmp == '女') {
        this.data.tmp = 2
      } else {
        this.data.tmp = 0
      }
    }

    if(this.data.tmp==this.data.userInfo[this.data.changeWhat]){
      wx.navigateBack()
    }

    console.log(this.data.tmp);
    wx.request({
      url: userUrl + 'updateInfo',
      data: {
        openid: wx.getStorageSync('jiaoxue_OPENID'),
        change: this.data.changeWhat,
        value: this.data.tmp
      },
      success: res => {
        //修改成功之后更新本地的storage并跳转回“我的”页面
        if (res.data.success) {
          this.data.userInfo[this.data.changeWhat] = this.data.tmp
          console.log(this.data.userInfo)
          wx.setStorageSync('userInfo', this.data.userInfo)
          // setTimeout(wx.navigateBack(),3000)
          wx.navigateBack()
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })

          wx.navigateBack()
        }
      },
      fail: res => {
      },
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