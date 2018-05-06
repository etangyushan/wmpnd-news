const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: "",
    forecast:[]
  },
  onLoad(){
    this.getNow()
  },
  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh()
    })
  },

  getNow(callback){
    console.log("Hello World")
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //接口地址
      data: {
        city: '乌鲁木齐'
      },
      success: res=> {
        console.log(res.data)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        //console.log(temp, weather)
        this.setData({
          nowTemp: temp +'°',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/'+weather+'-bg.png'
          
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })

        //set forecast
        let forecast = []
        let nowHour = new Date().getHours()
        for (let i = 0; i < 24; i += 3){
          forecast.push({
            time: (i + nowHour) % 24 + "时",
            iconPath:'/images/sunny-icon.png',
            temp: "12°"
          })
        }
        forecast[0].time = '现在'
        this.setData({ 
          forecast:forecast
        })
        console.log(this.data.nowWeatherBackground)
      },
      complete: () => {
        callback && callback()
      }
      
    })
  }


})
