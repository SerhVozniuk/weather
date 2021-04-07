class ToDayWeather extends Title {
    constructor(data){
        super(data);          // наследуемся и получаем this.weatherData
        this.day = '';                      // название дня
        this.humidity = this.weatherData['current']['humidity'];   //облачность
        this.temp = '';   //температура
        this.icon = this.weatherData['current']['weather'][0]['icon'];  //иконка  с openWeather
        this.descr  = this.weatherData['current']['weather'][0]['description'];  // разшифровка погоды
    }
    
    getDay(unix) {                        // получаем  название месяца
        let day = new Date (unix * 1000);           // переводит с unix в мс.
        let res = '';
        switch(day.getDay()) {                      
            case 0: res = 'sunday'; break;
            case 1: res = 'monday';  break;
            case 2: res = 'tuesday';  break;
            case 3: res = 'wednesday';  break;
            case 4: res = 'thursday';  break;
            case 5: res = 'friday';  break;
            case 6: res = 'saturday'; break;
        }
        this.day = res;
        return this.day;
    }

    convertToCels(kelvin){
        this.temp = Math.round(kelvin - 273.15);
        return this.temp;
    }
    render(){    // отрисовка  <div class="weather">
        let toDayWeather = '';
        toDayWeather += `<div class="row">`;
        toDayWeather += `<div class="col-md-4 offset-md-1">`;
        toDayWeather += `<div class="weather_day">${this.day}</div>`;
        toDayWeather += `<div class="weather_humdity">humidity ${this.humidity}%</div>`;
        toDayWeather += `<div class="weather_temperature">${this.temp}&deg;</div>`;
        toDayWeather += `</div>`;
        toDayWeather += `<div class="col-md-4 offset-md-2">`;
        toDayWeather += `<img class="weather_img" src="http://openweathermap.org/img/wn/${this.icon}@2x.png" alt="">`;
        toDayWeather += `<div class="weather_type">${this.descr}</div>`;
        toDayWeather += `</div>`;
        toDayWeather += `</div>`;
    let weatherBlock = document.createElement('div');
    weatherBlock.classList.add('weather');
    weatherBlock.innerHTML = toDayWeather;
    document.querySelector('header .container').append(weatherBlock);
    }
}