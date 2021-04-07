document.addEventListener('DDOMContentLoaded', () => {




});
let weatherPromis = new Promise ((resolve, reject) => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=50.433334&lon=30.516666&exclude=minutely,hourly,alerts&appid=a696a0c8ecdc20d50ae0ceb393b2e9ac')
        .then(response =>{
            if(response.status === 200 && response.ok === true){
                resolve (response.json());
            }
            reject (new Error(`${response.status} - ${response.ok}`));
        });
});

weatherPromis.then(data =>{
    console.log(data);

    function getFullDate (unix){                    // получаем  название месяца
        function day(unix){
            let day = new Date(unix * 1000);
            return day.getDate();
        }
        function month(unix){
            let month = new Date(unix * 1000);
            switch(month.getMonth()) {                      // {getMonth(data['daily'][i]['dt'])
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
        function year(unix){
            let year = new Date(unix * 1000);
            return year.getFullYear();
        }
        
        return `${day(unix)} ${month(unix)} ${year(unix)}`;
    }

    function getDay(unix) {                        // получаем  название месяца
        let day = new Date (unix * 1000);           // переводит с unix в мс.
        switch(day.getDay()) {                      
            case 0: return 'sunday'; 
            case 1: return 'monday'; 
            case 2: return 'tuesday'; 
            case 3: return 'wednesday'; 
            case 4: return 'thursday'; 
            case 5: return 'friday'; 
            case 6: return 'saturday';
        }
    }

    let title = document.createElement('div');
    title.classList.add('title');
    let cityName = document.createElement('div');
    cityName.classList.add('city_name');
    cityName.innerHTML = data['timezone'];
    title.append(cityName);
    let date = document.createElement('div');
    date.classList.add('date');
    date.innerHTML = getFullDate(data['current']['dt']);
    title.append(date);
    document.querySelector('header .container').append(title);

    let weather = '';
        weather += `<div class="row">`;
        weather += `<div class="col-md-4 offset-md-1">`;
        weather += `<div class="weather_day">${getDay(data['current']['dt'])}</div>`;
        weather += `<div class="weather_humdity">humidity ${data['current']['humidity']}%</div>`;
        weather += `<div class="weather_temperature">${data['current']['temp']}&deg;</div>`;
        weather += `</div>`;
        weather += `<div class="col-md-4 offset-md-2">`;
        weather += `<img class="weather_img" src="http://openweathermap.org/img/wn/${data['current']['weather'][0]['icon']}@2x.png" alt="">`;
        weather += `<div class="weather_type">${data['current']['weather'][0]['description']}</div>`;
        weather += `</div>`;
        weather += `</div>`;
    let weatherBlock = document.createElement('div');
    weatherBlock.classList.add('weather');
    weatherBlock.innerHTML = weather;
    document.querySelector('header .container').append(weatherBlock);

    let accordionItem = ``;
    for(let i = 1; i < data['daily'].length; i++){
        accordionItem += `<div class="accordion_item">`;
        accordionItem += `<div class="accordion_item_trigger">`;
        accordionItem += `<div class="row">`;
        accordionItem += `<div class="col-md-4 offset-md-1">`;
        accordionItem += `<div class="accordion_item_trigger_day">${getDay(data['daily'][i]['dt'])}</div>`;
        accordionItem += `</div>`;
        accordionItem += `<div class="col-md-2 offset-md-1">`;
        accordionItem += `<div class="accordion_item_trigger_img"><img src="http://openweathermap.org/img/wn/${data['daily'][i]['weather'][0]['icon']}@2x.png" alt=""></div>`;
        accordionItem += `</div>`;
        accordionItem += `<div class="col-md-2 offset-md-1">`;
        accordionItem += `<div class="accordion_item_trigger_temp">${data['daily'][i]['temp']['day']}20&deg;</div>`;
        accordionItem += `</div>`;
        accordionItem += `</div>`;
        accordionItem += `</div>`;
        accordionItem += `<div class="accordion_item_content">`;
        accordionItem += `<div class="weather">`;
        accordionItem += `<div class="row">`;
        accordionItem += `<div class="col-md-4 offset-md-1">`;
        accordionItem += `<div class="weather_day">${getDay(data['daily'][i]['dt'])}</div>`;
        accordionItem += `<div class="weather_humdity">humdity ${data['daily'][i]['humidity']}%</div>`;
        accordionItem += `<div class="weather_temperature">${data['daily'][i]['temp']['day']}20&deg;</div>`;
        accordionItem += `</div>`;
        accordionItem += `<div class="col-md-4 offset-md-2">`;
        accordionItem += `<img class="weather_img" src="http://openweathermap.org/img/wn/${data['daily'][i]['weather'][0]['icon']}@2x.png" alt="">`;
        accordionItem += `<div class="weather_type">${data['daily'][i]['weather'][0]['description']}</div>`;
        accordionItem += `</div>`;
        accordionItem += `</div>`;
        accordionItem += `</div>`;
        accordionItem += `</div>`;
        accordionItem += `</div>`;
    }   
    let accord = document.createElement('div');
    accord.classList.add('accordion');
    accord.innerHTML  = accordionItem;
    document.querySelector('header .container').append(accord);
    
    
    function addClassList(){
        this.nextElementSibling.classList.toggle('active');   // ф-кция добавляет клас active к следующему элементу после  accordion_item_trigger
    }
    document.querySelectorAll('.accordion_item_trigger').forEach(item =>{   //вешаем на каждый accordion_item_trigger    событие 
        item.addEventListener('click', addClassList);
    });
    
});


