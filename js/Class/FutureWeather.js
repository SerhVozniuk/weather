class FutureWeather extends ToDayWeather{
    constructor(data){
        super(data);
        
    }
    render(){
        let accordionItem = ``;
        for(let i = 1; i < this.weatherData['daily'].length; i++){
            accordionItem += `<div class="accordion_item">`;
            accordionItem += `<div class="accordion_item_trigger">`;
            accordionItem += `<div class="row">`;
            accordionItem += `<div class="col-md-4 offset-md-1">`;
            accordionItem += `<div class="accordion_item_trigger_day">${super.getDay(this.weatherData['daily'][i]['dt'])}</div>`;
            accordionItem += `</div>`;
            accordionItem += `<div class="col-md-2 offset-md-1">`;
            accordionItem += `<div class="accordion_item_trigger_img"><img src="http://openweathermap.org/img/wn/${this.weatherData['daily'][i]['weather'][0]['icon']}@2x.png" alt=""></div>`;
            accordionItem += `</div>`;
            accordionItem += `<div class="col-md-2 offset-md-1">`;
            accordionItem += `<div class="accordion_item_trigger_temp">${super.convertToCels(this.weatherData['daily'][i]['temp']['day'])}&deg;</div>`;
            accordionItem += `</div>`;
            accordionItem += `</div>`;
            accordionItem += `</div>`;
            accordionItem += `<div class="accordion_item_content">`;
            accordionItem += `<div class="weather">`;
            accordionItem += `<div class="row">`;
            accordionItem += `<div class="col-md-4 offset-md-1">`;
            accordionItem += `<div class="weather_day">${super.getDay(this.weatherData['daily'][i]['dt'])}</div>`;
            accordionItem += `<div class="weather_humdity">humdity ${this.weatherData['daily'][i]['humidity']}%</div>`;
            accordionItem += `<div class="weather_temperature">${super.convertToCels(this.weatherData['daily'][i]['temp']['day'])}&deg;</div>`;
            accordionItem += `</div>`;
            accordionItem += `<div class="col-md-4 offset-md-2">`;
            accordionItem += `<img class="weather_img" src="http://openweathermap.org/img/wn/${this.weatherData['daily'][i]['weather'][0]['icon']}@2x.png" alt="">`;
            accordionItem += `<div class="weather_type">${this.weatherData['daily'][i]['weather'][0]['description']}</div>`;
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
    }
    





}




