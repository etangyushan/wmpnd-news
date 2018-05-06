const titleMap = {
  'gn':'国内',
  'gj':'国际',
  'cj': '财经',
  'yl': '娱乐',
  'js': '军事',
  'ty': '体育',
  'other': '其他',
}
Page({
  data: {
    subjectList: [],
    shortNews: [],
    titleMap: titleMap,
    type:''
  },
  //启动时加载
  onLoad(){
    this.setData({
      type: 'gn'
    })
    this.getNews()
  },
  //获取
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', //接口地址
      data: {
        type: this.data.type
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result
        console.log(result[0].title)
        this.setNews(result)
      },
      //结束后执行
      complete: () => {
        callback && callback()
      }
    })
    //设置导航栏背景颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#cbeefd'
    })  
  },
  //设置简讯
  setNews(result){
    console.log('length:' + result.length)
    let shortNews = []
    for (let i = 0; i < result.length; i +=1){
      //console.log(result[i].title)

      shortNews.push({
        title: result[i].title,
        date: result[i].date,
        source: result[i].source,
        firstImage: result[i].firstImage
      })

      this.setData({
        shortNews: shortNews
      })
    } 
  },
  //点击新闻类型触发
  onTapNewstype(e) {
    wx.showToast()
    //this.setNews()
    
    console.log("text:" + e.currentTarget.text)
  },
  //点击新闻详细信息
  onTapNewsdetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  }
})
