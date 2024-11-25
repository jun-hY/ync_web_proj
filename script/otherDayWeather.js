import { Names, Icons, Temps, Days } from './init_constant.js'

const names = new Names();
const icons = new Icons();
const temps = new Temps();
const days = new Days();
const DAY_TO_TIME = 86400000;
const BaseTime = [2, 5, 8, 11, 14, 17, 20, 23];

/** yyyymmdd 형태로 반환. Date객체를 인자로 함 */
function getDateOnFormat(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + month + day;
}

const TimeSet = () => {
    var Today = new Date();
    var time = [getDateOnFormat(Today), ''];
    var hours = ('0' + Today.getHours()).slice(-2);
    var minutes = ('0' + Today.getMinutes()).slice(-2);
    if (hours <= BaseTime[0] && minutes < 10) {
        var yesterday = new Date(Today.getTime - DAY_TO_TIME);
        time = [getDateOnFormat(yesterday), '2300'];
        return time;
    }
    for (var i = 0; i < BaseTime.length; i++) {
        if (hours >= BaseTime[i] && hours < BaseTime[i + 1]) {
            if (minutes < 10 && hours == BaseTime[i]) {
                time[1] = ('0' + BaseTime[i - 1] + '00').slice(-4);
                break;
            }
            time[1] = ('0' + BaseTime[i] + '00').slice(-4);
            break;
        }
    }
    return time;
}
const Time = TimeSet();

var day = new Date();
var fiveDays = [];
for (var i = 1; i <= 5; i++) {
    fiveDays.push(new Date(day.getTime() + (DAY_TO_TIME * i)));
}
days.setDays(fiveDays);
for (var i = 0; i < 5; i++) {
    fiveDays[i] = getDateOnFormat(fiveDays[i]);
}

const ServiceKey = `8pZx3zpwmiP6xng2EUvTlOz6qnesip%2BuYn70GCdXph%2FQek0Ws9N6r0YU4iLHZgputh87KbB8m6XsQGecpxiIaA%3D%3D`;
const OtherDayWeather = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${ServiceKey}&numOfRows=700&pageNo=1&dataType=JSON&base_date=${Time[0]}&base_time=${Time[1]}&nx=89&ny=90`;
const threeDaysLaterTemp = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&dataType=JSON&regId=11H10701&tmFc=202411250600`;
const threeDaysLaterSky = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&dataType=JSON&regId=11H10000&tmFc=202411250600`;

fetch(OtherDayWeather).then(res => res.json().then(data => {
    const OtherDayWeatherInfo = data.response.body.items.item;
    // console.log(OtherDayWeatherInfo);
    Object.keys(OtherDayWeatherInfo).forEach((i) => {
        var fcstTime = OtherDayWeatherInfo[i].fcstTime;
        var fcstDate = OtherDayWeatherInfo[i].fcstDate;
        var category = OtherDayWeatherInfo[i].category;
        var value = OtherDayWeatherInfo[i].fcstValue;

        if (Number(fcstDate) >= Number(fiveDays[2])) return;
        if (!fiveDays.includes(fcstDate)) return;
        if (fcstTime != '1200') return;

        if (category === 'TMP') {
            temps.setTemp(fiveDays.findIndex(e => e == fcstDate), value);
            return;
        }
        if (category == 'SKY') {
            icons.setIcon(fiveDays.findIndex(e => e == fcstDate), value);
            return;
        }
        if (category == 'PTY' && value != `0`) {
            icons.setRainIcon(fiveDays.findIndex(e => e == fcstDate), value);
        }
    });
}));

fetch(threeDaysLaterTemp).then(res => res.json().then(data => {
    const items = data.response.body.items.item[0]
    temps.setTemp(2, Math.round((items.taMax3 + items.taMin3) / 2));
    temps.setTemp(3, Math.round((items.taMax4 + items.taMin4) / 2));
    temps.setTemp(4, Math.round((items.taMax5 + items.taMin5) / 2));
}));

fetch(threeDaysLaterSky).then(res => res.json().then(data => {
    const items = data.response.body.items.item[0];
    var wf3Pm = (`` + items.wf3Am).split(' ');
    var wf4Pm = (`` + items.wf4Pm).split(' ');
    var wf5Pm = (`` + items.wf5Pm).split(' ');
    if (wf3Pm.length < 2) {
        wf3Pm[0].startsWith(`맑`) ? icons.setIcon(2, 1) : wf3Pm[0].startsWith(`구`) ? icons.setIcon(2, 3) : icons.setIcon(2, 4)
    } else {
        wf3Pm[1].startsWith(`눈`) ? icons.setRainIcon(2, 3) : wf3Pm[1].startsWith(`소나기`) ? icons.setRainIcon(2, 4) : icons.setRainIcon(2, 1)
    }
    if (wf4Pm.length < 2) {
        wf4Pm[0].startsWith(`맑`) ? icons.setIcon(3, 1) : wf4Pm[0].startsWith(`구`) ? icons.setIcon(3, 3) : icons.setIcon(3, 4)
    } else {
        wf4Pm[1].startsWith(`눈`) ? icons.setRainIcon(3, 3) : wf4Pm[1].startsWith(`소나기`) ? icons.setRainIcon(3, 4) : icons.setRainIcon(3, 1)
    }
    if (wf5Pm.length < 2) {
        wf5Pm[0].startsWith(`맑`) ? icons.setIcon(4, 1) : wf5Pm[0].startsWith(`구`) ? icons.setIcon(4, 3) : icons.setIcon(4, 4)
    } else {
        wf5Pm[1].startsWith(`눈`) ? icons.setRainIcon(4, 3) : wf5Pm[1].startsWith(`소나기`) ? icons.setRainIcon(4, 4) : icons.setRainIcon(4, 1)
    }
}));