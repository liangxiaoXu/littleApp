
const app = getApp()

Page({
  data:{
    //locationStr : null
  },

  get_location:function(){
    var that = this
    //获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        // console.log('经度=' + longitude)

        that.setData({
          locationStr: '经度=' + longitude + ',纬度=' + latitude + ",速度=" + speed + ',精确度=' + accuracy,
        })

      }
    })

  },

  get_location2:function(){


    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 18
          })
      }
    })
  }
})