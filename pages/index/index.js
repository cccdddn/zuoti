//index.js
//获取应用实例
const app = getApp()
const userUrl = require('../../config.js').userUrl
const courseId = require('../../config.js').courseId

Page({
  data: {
    current_course: {
      id: courseId,
      name: '',
      logo: '',
      count: 0,
      teacher: {
        name: '',
      },
      course_count: 0,
    },
    examInlets: [],
    ques_count: 0,
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: userUrl + 'getCourseInfo',
      data: {
        courseId: courseId,
      },
      success: function (res) {
        that.setData({
          current_course: res.data.msg
        })
        console.log(that.data)
      }
    })
    wx.request({
      url: userUrl + 'getDoneQuesCount',
      data: {
        openid: wx.getStorageSync('jiaoxue_OPENID'),
        courseId: courseId
      },
      success: function (res) {
        console.log(res)
        that.setData({
          ques_count: res.data.msg
        })
      }
    })
    this.getCurrentCourse(courseId);
    console.log(this.data)
  },
  exercise(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type
    var _url = ''
    if (type == 'sxlx') {
      _url = "/pages/answer/answer_info/info?subject=&type=sxlx"
    } else if (type == 'zjlx') {
      _url = '/pages/answer/answer_chapter/chapter?subject=&type=zjlx'
    } else if (type == 'zylx') {
      _url = '/pages/answer/answer_info/info?subject=&type=sjlx'
    } else if (type == 'ztlx') {
      _url = '/pages/answer/answer_classify/classify?subject=&type=zxlx'
    }
    console.log(_url)
    wx.navigateTo({
      url: _url,
    })
  },
  bindUrlToStore: function (f) {
    // console.log(f)
    var that = this,
      subject = f.currentTarget.dataset.urlparem,
      collection = f.currentTarget.dataset.collection - 0;
    if (!!collection) {
      wx.navigateTo({
        url: '/pages/answer/answer_info/info?subject=subject&type=wdsc'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '未发现您的收藏',
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {

        }
      })
    }
  },
  bindUrlToWrong: function (e) {
    var subject = e.currentTarget.dataset.urlparem,
      answerError = e.currentTarget.dataset.answererror - 0;
    if (!!answerError) {
      wx.navigateTo({
        url: `/pages/answer/answer_info/info?subject=${subject}&type=wdct`
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '恭喜您，暂无错题。',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#00bcd5',
        success: function (res) { }
      })
    }
  },
  getCurrentCourse(course_id = '') {
    let current_course_id = course_id
    if (!current_course_id) {
      current_course_id = wx.getStorageSync('pingshifen_current_course_id');
    }
    let openid = wx.getStorageSync('jiaoxue_OPENID')

    wx.request({
      url: userUrl + 'current',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        current_course_id: course_id,
        openid: openid,
      },
      method: 'POST',
      success: res => {
        this.setData({
          current_course: res.data.data,
        })
      }
    })
  }
})
