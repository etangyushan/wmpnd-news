
Page({
  date: {
    id: '', //新闻ID
    detailNews:[],
    newsContent:[]
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      id: options.id,
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
        console.log(res)
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

    let newsContent = []
    let content = result.content
    let tmpdata ='';
    console.log(content.length);
    for (let i = 0; i < content.length; i += 1) {
      //三种类型：image, p, strong
      if (content[i].type == 'image') {
        tmpdata = content[i].src
      } else if (content[i].type == 'p') {
        tmpdata = content[i].text
      } else if (content[i].type == 'strong'){
        tmpdata = content[i].text
      }
      console.log(content[i].type);
      console.log(tmpdata);
      console.log(content[i].id);
      newsContent.push({
        type: content[i].type,
        data: tmpdata,
        id: content[i].id
      })

      this.setData({
        newsContent: newsContent
      })
    }
  }
})