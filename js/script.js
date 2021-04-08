let arrayCountry = [
    {
        "id": 5128638,
        "name": "New York",
        "state": "NY",
        "country": "US",
        "coord": {
            "lon": -75.499901,
            "lat": 43.000351
        }
    },
    {
        "id": 5368361,
        "name": "Los Angeles",
        "state": "CA",
        "country": "US",
        "coord": {
            "lon": -118.243683,
            "lat": 34.052231
        }
    },
    {
        "id": 4887398,
        "name": "Chicago",
        "state": "IL",
        "country": "US",
        "coord": {
            "lon": -87.650047,
            "lat": 41.850029
        }
    },
    {
        "id": 2643743,
        "name": "London",
        "state": "",
        "country": "GB",
        "coord": {
            "lon": -0.12574,
            "lat": 51.50853
        }
    },
    {
        "id": 2968815,
        "name": "Paris",
        "state": "",
        "country": "FR",
        "coord": {
            "lon": 2.3486,
            "lat": 48.853401
        }
    },
    {
        "id": 3169070,
        "name": "Rome",
        "state": "",
        "country": "IT",
        "coord": {
            "lon": 12.4839,
            "lat": 41.894741
        }
    },
    {
        "id": 745044,
        "name": "Istanbul",
        "state": "",
        "country": "TR",
        "coord": {
            "lon": 28.949659,
            "lat": 41.01384
        }
    },
    {
        "id": 703448,
        "name": "Kyiv",
        "state": "",
        "country": "UA",
        "coord": {
            "lon": 30.516666,
            "lat": 50.433334
        }
    },
    {
        "id": 1138958,
        "name": "Kabul",
        "state": "",
        "country": "AF",
        "coord": {
            "lon": 69.172333,
            "lat": 34.52813
        }
    },
    {
        "id": 1835847,
        "name": "Seoul",
        "state": "",
        "country": "KR",
        "coord": {
            "lon": 127.0,
            "lat": 37.583328
        }
    }
];

document.querySelector('.choose_select').addEventListener('change', getCoord);   //слушаем собития выбора в select

function getCoord(){
    let selectIndex = document.querySelector('.choose_select').selectedIndex;         //получам индекс выбраной страны
    let selectValue = document.querySelector('.choose_select').options[selectIndex].value;  // получаем значение выбраной страны
    let res = '';
    arrayCountry.forEach(item =>{                                  //перебираем масив стран и ищем  страну  которую выбрали
        if(selectValue === item.name){
            res = `lat=${item.coord.lat}&lon=${item.coord.lon}`;  /////получаем координаты выбраной страны
        }
    });
    return res;
}

function getFullDate(unix){      // getFullDate  получаем  полную дату date
    function day(unix){              //получаем день
        let day = new Date(unix * 1000);    // переводит с unix в мс.
        return day.getDate();
    }
    function month(unix){       //получаем месяц
        let month = new Date(unix * 1000);   // переводит с unix в мс.
        switch(month.getMonth()) {                      
            case 0: return 'Январь'; 
            case 1: return 'Февраль'; 
            case 2: return 'Март'; 
            case 3: return 'Апрель'; 
            case 4: return 'Май'; 
            case 5: return 'Июнь'; 
            case 6: return 'Июль';
            case 7: return 'Август'; 
            case 8: return 'Сентябрь'; 
            case 9: return 'Октябрь'; 
            case 10: return 'Ноябрь'; 
            case 11: return 'Декабрь';
        }
    }
    function year (unix){                //получаем год
        let year = new Date(unix * 1000);  // переводит с unix в мс.
        return year.getFullYear();
    }
    let res = `${day(unix)} ${month(unix)} ${year(unix)}`;  
    return res;
}

function getDay(unix) {     //getDay  получаем  название месяца
    let day = new Date (unix * 1000); // переводит с unix в мс.
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
    return res;
}

function convertToCels(kelvin){   //конвертируем  кельвин в цельсий
    return Math.round(kelvin - 273.15);
}

document.querySelector('.choose_btn').addEventListener('click', () =>{   //вешаем обработчик на кнопку , при клике обновляется информация

    let weatherPromis = new Promise ((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?${getCoord()}&exclude=minutely,hourly,alerts&appid=a696a0c8ecdc20d50ae0ceb393b2e9ac`)
            .then(response =>{
                if(response.status === 200 && response.ok === true){
                    resolve (response.json());
                }
                reject (new Error(`${response.status} - ${response.ok}`));
            });
    });
    
    weatherPromis.then(data =>{
        console.log(data);
        //получаем данніе для title
        document.querySelector('.title_cityName').innerHTML = data.timezone;
        document.querySelector('.title_date').innerHTML = getFullDate(data.current.dt);
        //получаем данніе для weather  (today)
        document.querySelector('.weather_day').innerHTML = getDay(data.current.dt);
        document.querySelector('.weather_humdity').innerHTML = `${data.current.humidity}%`;
        document.querySelector('.weather_temperature').innerHTML = `${convertToCels(data.current.temp)}&deg;`;
        document.querySelector('.weather_img').src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        document.querySelector('.weather_type').innerHTML = data.current.weather[0].description;
        // получаем данніе на 7 дней
        for(let i = 0; i < data.daily.length; i++){
            document.querySelectorAll('.accordion_item_trigger_day')[i].innerHTML = getDay(data.daily[i].dt);      
            document.querySelectorAll('.accordion_item_trigger_img')[i].src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
            document.querySelectorAll('.accordion_item_trigger_temp')[i].innerHTML = `${convertToCels(data.daily[i].temp.day)}&deg;`;
            document.querySelectorAll('.accordion_item_content .weather_day')[i].innerHTML = getDay(data.daily[i].dt);
            document.querySelectorAll('.accordion_item_content .weather_humdity')[i].innerHTML = `${data.daily[i].humidity}%`;
            document.querySelectorAll('.accordion_item_content .weather_temperature')[i].innerHTML = `${convertToCels(data.daily[i].temp.day)}&deg;`;
            document.querySelectorAll('.accordion_item_content .weather_img')[i].src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
            document.querySelectorAll('.accordion_item_content .weather_type')[i].innerHTML = data.daily[i].weather[0].description;
        }
    });
});

function addClassList(){
    this.nextElementSibling.classList.toggle('active');   // ф-кция добавляет клас active к следующему элементу после  accordion_item_trigger
}
document.querySelectorAll('.accordion_item_trigger').forEach(item =>{   //вешаем на каждый accordion_item_trigger    событие 
    item.addEventListener('click', addClassList);
}); 