//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tip: '获取位置',
    content:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // console.log(app.data.motto);
    // console.log(app.globalData);
    // console.log(app.globalData);
    
    this.setData({
      motto: '你好',
      content: app.globalData.userInfo
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  clickMe: function () {
    wx.navigateTo({
      url: '../location/location',
    })
  },
  // 扫码功能
  scanQr:function(){
    wx.scanCode({
      //只允许从相机选取图片
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        console.log(res.result)

        //跳转到扫描结果页面
        wx.navigateTo({
          url: '../scanResult/scanResult?content=' + res.result
        })

      }
    })
  },
  //发起请求
  req:function(){
    wx.request({
      url: 'http://localhost:9081/trade/order/goods_order_view.do', 
      data :{
        order_sn: '311494677',
        user_id: '1816'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  //支付
  wx_pay:function(){
    wx.requestPayment({
      'timeStamp': '1520940936681',
      'nonceStr': 'gn0zrn0kwaq5hgs',
      'package': 'wx20180313201632c7e6fd26cb0215203398',
      'signType': 'MD5',
      'paySign': '37DC45596F1E4D8D6A4B8F3D36FA2D4A',
      'success': function (res) {
        console.log('success' + res)
      },
      'fail': function (res) {
        console.log('fail' + res)
        console.log('fail' + res.errMsg)
      }
    })
  },

  //收货地址
  receive_addr : function(){

    wx.chooseAddress({
      success: function (res) {

        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)

          wx.showToast({
            title: res.detailInfo,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
      }
    })
  }
})
