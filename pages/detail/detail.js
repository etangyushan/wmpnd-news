
Page({
  date: {
    id: '', //新闻ID
    image:'',//默认图片
    detailNews:[]
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      id: options.id,
      image:options.image
    })
    this.getDetailNews()
  },
  onPullDownRefresh() {
    this.getDetailNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  getDetailNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        this.setDetailNews(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setDetailNews(result) {
    console.log(result)
    let detailNews = []
    let content = []
    detailNews.push({
      title:result.title,
      date:result.date,
      source:result.source,
      firstImage:result.firestImage,
      content: result.content,
      readCount: result.readCount
    })

    this.setData({
      detailNews: detailNews
    })
  }
})