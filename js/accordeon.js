function addClassList(){
    this.nextElementSibling.classList.toggle('active');   // ф-кция добавляет клас active к следующему элементу после  accordion_item_trigger
}

document.querySelectorAll('.accordion_item_trigger').forEach(item =>{   //вешаем на каждый accordion_item_trigger    событие 
    item.addEventListener('click', addClassList);
});
