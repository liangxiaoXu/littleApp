
//获取应用实例
const app = getApp()

Page({
  data:{
    //content:null
  },
  onLoad:function(options){
    this.setData({
      content: options.content
    })
  }

})