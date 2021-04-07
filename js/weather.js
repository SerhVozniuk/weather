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
    //console.log(data);

    let title = new Title(data);
    title.getFullDate(data['current']['dt']);
    title.render();
    
    let toDayWeather = new ToDayWeather(data);
    toDayWeather.getDay(data['current']['dt']);
    toDayWeather.convertToCels(data['current']['temp']);
    toDayWeather.render();

    let futureWeather = new FutureWeather(data);
    futureWeather.render();

    function addClassList(){
        this.nextElementSibling.classList.toggle('active');   // ф-кция добавляет клас active к следующему элементу после  accordion_item_trigger
    }
    document.querySelectorAll('.accordion_item_trigger').forEach(item =>{   //вешаем на каждый accordion_item_trigger    событие 
        item.addEventListener('click', addClassList);
    }); 
    
});


