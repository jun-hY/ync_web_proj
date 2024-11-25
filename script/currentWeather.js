const CurrentTemp = document.querySelector(".current-weather .temperature");
const CurrentHumidity = document.querySelector(".weather-details .humidity-value");
const CurrentWind = document.querySelector(".weather-details .wind-value");
const CurrentSkyIcon = document.querySelector(".current-weather .icon");
const CurrentSkyDescription = document.querySelector(".current-weather .description");
const CurrentWindDirection = document.querySelector(".weather-details .direction-value");
const DAY_TO_TIME = 86400000;

var date = new Date();

var year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);

var hours = ('0' + date.getHours()).slice(-2);
var minutes = ('0' + date.getMinutes()).slice(-2);
const IS_OVER_45_MINUTES = Number(minutes) >= 45;
const CAN_WE_GET_TODAY_API = hours <= 0 && !IS_OVER_45_MINUTES;

const Today = CAN_WE_GET_TODAY_API ? `${(yesterday) => {
    yesterday = new Date(date.getTime() - DAY_TO_TIME);
    var year = yesterday.getFullYear();
    var month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
    var day = ('0' + yesterday.getDate()).slice(-2);
    return year + month + day;
}}` : year + month + day;

const Time = IS_OVER_45_MINUTES ? `${hours}30` : `0${Number(hours) - 1}30`.slice(-4);

// 초단기 실황 조회 api
// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${ServiceKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

// 단기 예보 api
// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D&numOfRows=50&pageNo=1&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

// 초단기 예보 api
// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${ServiceKey}&numOfRows=10&pageNo=1&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const CurrnetWeather = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&dataType=JSON&base_date=${Today}&base_time=${Time}&nx=89&ny=90`

fetch(CurrnetWeather).then(res => res.json().then(data => {
    const CurrentWeatherInfo = data.response.body.items.item;
    // Object.keys(CurrentWeatherInfo).forEach((i) => {
    //     console.log(CurrentWeatherInfo[i])
    // });
    Object.keys(CurrentWeatherInfo).forEach((i) => {
        var isCurrentTemp = CurrentWeatherInfo[i].category == `T1H` && CurrentWeatherInfo[i].fcstTime == `0${Number(hours) + 1}00`.slice(-4)
        var isCurrentHumidity = CurrentWeatherInfo[i].category == `REH` && CurrentWeatherInfo[i].fcstTime == `0${Number(hours) + 1}00`.slice(-4)
        var isCurrentWind = CurrentWeatherInfo[i].category == `WSD` && CurrentWeatherInfo[i].fcstTime == `0${Number(hours) + 1}00`.slice(-4)
        var isCurrentSky = CurrentWeatherInfo[i].category == `SKY` && CurrentWeatherInfo[i].fcstTime == `0${Number(hours) + 1}00`.slice(-4)
        var isCurrentWindDir = CurrentWeatherInfo[i].category == `VEC` && CurrentWeatherInfo[i].fcstTime == `0${Number(hours) + 1}00`.slice(-4)
        var isCurrentRain = CurrentWeatherInfo[i].category == `PTY` && CurrentWeatherInfo[i].fcstTime == `0${Number(hours) + 1}00`.slice(-4)
        var value = CurrentWeatherInfo[i].fcstValue;
        if (isCurrentTemp) {
            CurrentTemp.innerText = `${value}°C`;
            return;
        }
        if (isCurrentHumidity) {
            CurrentHumidity.innerText = `${value}%`;
            return;
        }
        if (isCurrentWind) {
            CurrentWind.innerText = `${value} m/s`;
            return;
        }
        if (isCurrentSky) {
            CurrentSkyIcon.innerText = `${value < 3 ? `☀️` : value < 4 ? `🌤️` : `☁️`}`;
            CurrentSkyDescription.innerText = `${value < 3 ? `맑음` : value < 4 ? `구름많음` : `흐림`}`;
            return;
        }
        if (isCurrentWindDir) {
            var direction = ``;
            if (value > 337 || value <= 22) direction = `⬇`;
            else if (value <= 67) direction = `⬋`;
            else if (value <= 112) direction = `⬅`;
            else if (value <= 157) direction = `⬉`;
            else if (value <= 202) direction = `⬆`;
            else if (value <= 247) direction = `⬈`;
            else if (value <= 292) direction = `⮕`;
            else if (value <= 337) direction = `⬊`;

            CurrentWindDirection.innerText = `${direction}`
            return;
        }
        if (isCurrentRain && value != `0`) {
            if (Number(value) > 5) {
                CurrentSkyIcon.innerText = `🌨️`;
                CurrentSkyDescription.innerText = `눈날림`;
            } else if (Number(value) > 4) {
                CurrentSkyIcon.innerText = `🌧️`;
                CurrentSkyDescription.innerText = `비`;
            } else if (Number(value) > 2) {
                CurrentSkyIcon.innerText = `☃️`;
                CurrentSkyDescription.innerText = `눈`;
            } else if (Number(value) > 0) {
                CurrentSkyIcon.innerText = `🌧️`;
                CurrentSkyDescription.innerText = `비`;
            }
        }
    });
}));