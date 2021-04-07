class Title{
    constructor(data){
        this.weatherData = data;
        this.cityName = this.weatherData['timezone'];
        this.date = '';
    }

    getFullDate (unix){                    // получаем  полную дату date
        function day(unix){
            let day = new Date(unix * 1000);
            return day.getDate();
        }
        function month(unix){
            let month = new Date(unix * 1000);
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
        function year(unix){
            let year = new Date(unix * 1000);
            return year.getFullYear();
        }
        let res = `${day(unix)} ${month(unix)} ${year(unix)}`;
        this.date = res;
        return this.date;
    }

    render(){
        let title = document.createElement('div');
        title.classList.add('title');
        let cityName = document.createElement('div');
        cityName.classList.add('city_name');
        cityName.innerHTML = this.cityName;
        title.append(cityName);
        let date = document.createElement('div');
        date.classList.add('date');
        date.innerHTML = this.date;
        title.append(date);
        document.querySelector('header .container').append(title);
    }
}