"use strict";

window.onload = function(){

    /*Header*/
    const header = document.querySelector('.header');
    const menu = document.querySelector('.menu_point');
    let scrollToMenu = menu.getBoundingClientRect().top;
    window.onscroll = function(){
        if(scrollToMenu < scrollY){
            header.classList.add('active');
        }
        else{
            header.classList.remove('active');
        }
    };

    /*Nav*/
    const navLinks = document.querySelectorAll('.nav_item[data-goto]');
    if(navLinks.length > 0){
        navLinks.forEach( function(item){
            item.addEventListener('click', onNavLink);
        });

        function onNavLink(e){
            const navLink = e.target;
            /*Поверяем существует ли дата-атрибут и есть ли в нём ссылка*/
            if(navLink.dataset.goto && document.querySelector(navLink.dataset.goto)){
                e.preventDefault();
                const goToBlock = document.querySelector(navLink.dataset.goto);
                const goToBlockValue = goToBlock.getBoundingClientRect().top + pageYOffset;

                window.scrollTo({
                    top: goToBlockValue,
                    behavior: 'smooth'
                });
            }
        }
    }

    /*Slider1 Затухающий*/
    const radio = document.querySelectorAll('.radio'),
          prev = document.getElementById('prev'),
          next = document.getElementById('next'),
          slides = document.querySelectorAll('.slide'),
          currentSlide = document.querySelector('.page_current');

    let position = 0,
        isReady = true;

    prev.addEventListener('click', () => {
        if(!isReady){
            return;
        }

        isReady = false;

        if(position === 0){
            slides[0].style.opacity = 0;
            setTimeout( () => {
                position = radio.length - 1;
                radio[position].checked = true;
                currentSlide.textContent = `0${position + 1}/`;
                setTimeout( () => {
                    slides[position].style.opacity = 1;
                    isReady = true;
                }, 200);
            }, 200);
        }
        else{
            slides[position].style.opacity = 0;
            setTimeout( () => {
                position--;
                radio[position].checked = true;
                currentSlide.textContent = `0${position + 1}/`;
                setTimeout( () => {
                    slides[position].style.opacity = 1;
                    isReady = true;
                }, 200);
            }, 200);
        }
    });


    next.addEventListener('click', () => {
        if(!isReady){
            return;
        }

        isReady = false;

        if(position === radio.length - 1){
            slides[radio.length - 1].style.opacity = 0;
            setTimeout( () => {
                position = 0;
                radio[position].checked = true;
                currentSlide.textContent = `0${position + 1}/`;
                setTimeout( () => {
                    slides[position].style.opacity = 1;
                    isReady = true;
                }, 300);
            }, 300);
        }
        else{
            slides[position].style.opacity = 0;
            setTimeout( () => {
                position++;
                radio[position].checked = true;
                currentSlide.textContent = `0${position + 1}/`;
                setTimeout( () => {
                    slides[position].style.opacity = 1;
                    isReady = true;
                }, 300);
            }, 300);
        }
    });
    /*Slider: add burger to basket*/
    const totalCost = document.querySelectorAll('.total_price'), // Общая сумма к оплате
          totalBurgers = document.querySelector('.order_info'), //Общее количество бургеров
          addToBasket = document.querySelector('.slider_tobasket'),
          sliderPrice = document.querySelectorAll('.slider_price'),
          sliderBurgerName = document.querySelectorAll('.slider_title');
    let isReadyBasket = true;

    addToBasket.addEventListener('click', () => {

        addNewBurger(sliderBurgerName[position], sliderPrice[position]);

        if(isNaN(parseInt(totalBurgers.textContent))){
            totalBurgers.textContent = `1 бургер`;
            totalCost.forEach(price => {
                price.textContent = `${parseInt(sliderPrice[position].textContent)} руб.`;
            });
            /*Анимируем корзину в хедаре*/
            if(isReadyBasket){
                isReadyBasket = false;
                let timerId = setTimeout(function call(){
                    document.querySelector('.shopping-basket').classList.toggle('active');
                    timerId = setTimeout(call, 4000);
                }, 500);
            }
            return;
        }

        if(parseInt(totalBurgers.textContent) > 0 && parseInt(totalBurgers.textContent) < 4){
            totalBurgers.textContent = `${parseInt(totalBurgers.textContent) + 1} бургера`;
        }
        else{
            totalBurgers.textContent = `${parseInt(totalBurgers.textContent) + 1} бургеров`;
        }
        totalCost.forEach(price => {
            price.textContent = `${parseInt(price.textContent) + parseInt(sliderPrice[position].textContent)} руб.`;
        });
    });



    /*Slider2 Затухающий*/
    const buttonMenu = document.querySelectorAll('.menu_button'),
          radioMenu = document.querySelectorAll('.radio_menu'),
          slidesMenu = document.querySelectorAll('.menu_slide');
    let currentSlideMenu = 0,
        isReady2 = true;

    slidesMenu[currentSlideMenu].style.opacity = 1;

    for(let i = 0; i < radioMenu.length; i++){
        while(i > radioMenu.length - 1){
            slidesMenu[i + 1].style.opacity = 0;
        }
        buttonMenu[i].addEventListener('click', () => {
            if( i === currentSlideMenu || isReady2 === false){
                return;
            }
            isReady2 = false;
            buttonMenu[currentSlideMenu].classList.remove('active');
            slidesMenu[currentSlideMenu].style.opacity = 0;
            setTimeout( () => {
                currentSlideMenu = i;
                buttonMenu[currentSlideMenu].classList.add('active');
                slidesMenu[currentSlideMenu].style.opacity = 1;
                radioMenu[currentSlideMenu].checked = true;
                isReady2 = true;
            }, 500);
        });
    }



    /*Menu amount*/
    const plus = document.querySelectorAll('.plus'),
          minus = document.querySelectorAll('.minus'),
          amount = document.querySelectorAll('.amount'),
          addMenu = document.querySelectorAll('.menu_price');

    for(let i = 0; i < plus.length; i++){
        plus[i].addEventListener('click', () => {
            ++amount[i].textContent;
        });
        minus[i].addEventListener('click', () => {
            if(Number(amount[i].textContent) === 1){
                return;
            }
            --amount[i].textContent;
        });
    }

    /*Menu more*/
    const more = document.getElementById('more'),
          moreBurgers = document.querySelectorAll('.menu_burgers--more'),
          menuBurgerNames = document.querySelectorAll('.menu_name');

    more.addEventListener('click', () => {
       more.classList.toggle('active');
       moreBurgers.forEach( moreSection => {
           moreSection.classList.toggle('active');
       });
    });

    /*Menu add burger to basket*/
    addMenu.forEach(function(button, index){
        button.addEventListener('click', () => {
            for(let i = 0; i < parseInt(amount[index].textContent); i++){
                addNewBurger(menuBurgerNames[index], addMenu[index]);
            }
            if(isNaN(parseInt(totalBurgers.textContent))){
                totalBurgers.textContent = `${amount[index].textContent} бургер`;

                totalCost.forEach( price => {
                    price.textContent = `${parseInt(addMenu[index].textContent) * parseInt(amount[index].textContent)} руб.`;
                });

                /*Анимируем корзину в хедаре*/
                if(isReadyBasket){
                    isReadyBasket = false;
                    let timerId = setTimeout(function call(){
                        document.querySelector('.shopping-basket').classList.toggle('active');
                        timerId = setTimeout(call, 4000);
                    }, 500);
                }
                return;
            }
            totalBurgers.textContent = `${parseInt(totalBurgers.textContent) + parseInt(amount[index].textContent)}`;

            if(parseInt(totalBurgers.textContent) > 1 && parseInt(totalBurgers.textContent) < 5){
                totalBurgers.textContent = `${totalBurgers.textContent} бургера`;
            }
            else{
                totalBurgers.textContent = `${totalBurgers.textContent} бургеров`
            }
            totalCost.forEach( price => {
                price.textContent = `${parseInt(price.textContent) + parseInt(addMenu[index].textContent) * parseInt(amount[index].textContent)} руб.`;
            });
        });
    });



    /*Map*/
    const mapSurf = document.querySelector('.map_surf');
    let mapTimer;

    mapSurf.addEventListener('mouseover', () => {
        mapTimer = setTimeout(() => mapSurf.classList.add('active'), 300);
    });
    mapSurf.addEventListener('mouseout', () => {
        clearTimeout(mapTimer);
        mapSurf.classList.remove('active');
    });





    /*Popup*/
    const popupLinks = document.querySelectorAll('.popup_js');
    const body = document.querySelector('body');/*Чтобы заблокать скролл*/
    const lockPadding = document.querySelectorAll('.lock-padding'); /*Для фиксированных объектов, таких как header*/
    const wrapper = document.querySelector('.wrapper');

    let unlock = true;/*Чтобы не было двойных нажатий*/

    const timeout = 600; /*Должно быть равно значению в transition*/

    if(popupLinks.length > 0){
        for(let i = 0; i < popupLinks.length; i++){
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function(e){
                const popupName = popupLink.getAttribute('href').replace('#','');
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault();/*Запрещаем перезагрузку страницы*/
            });
        }
    }

    const popupcloseIcon = document.querySelectorAll('.popup_close');
    if(popupcloseIcon.length > 0){
        for(let i = 0; i < popupcloseIcon.length; i++){
            const el = popupcloseIcon[i];
            el.addEventListener('click', function(e){
                popupClose(el.closest('.popup'));/*ближайший родитель с классом попап*/
                e.preventDefault();
            });
        }
    }


    function popupOpen(currentPopup){
        if(currentPopup && unlock){
            const popupActive = document.querySelector('.popup.open');
            if(popupActive){
                popupClose(popupActive, false);
            }else{
                bodyLock();
            }
            currentPopup.classList.add('open');


            /*Добавляем бургеры в список корзины*/
            const isBasketPopup = document.querySelector('.popup_basket.open') || false;
            if(isBasketPopup != false){
                foodDelete = document.querySelectorAll('.food_delete');
                foodItems = document.querySelectorAll('.food_item');
                foodCosts = document.querySelectorAll(`.food_cost`);
                requestBurgers();
            };

            /*Закрываем, если было нажатие по темной зоне*/
            currentPopup.addEventListener('click', function(e){
                if(!e.target.closest('.popup_content')){
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }


    function popupClose(popupActive, doUnlock = true){
        if(unlock){
            try{
                popupActive.classList.remove('open');
            }
            catch{
                return;
            }
            if(doUnlock){
                bodyUnLock();
            }
        }
    }


    /*Скрываем скролл и стабилизируем экран, чтобы не было сдвига контента*/
    function bodyLock(){
        const lockPaddingValue = window.innerWidth - wrapper.offsetWidth + 'px';

        wrapper.style.width = window.innerWidth + parseFloat(lockPaddingValue) + `px`;

        if(lockPadding.length > 0){
            /*Теперь фикс объекты не будут дергаться*/
            for(let i = 0; i < lockPadding.length; i++){
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingValue;
            }
        }

        /*Экран не будет дёргаться*/
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(() => {
            unlock = true;
        }, timeout);
    }


    function bodyUnLock(){
        setTimeout(() => {

            if(lockPadding.length > 0){
                for(let i = 0; i < lockPadding.length; i++){
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = `0px`;
            body.classList.remove('lock');
            }, timeout);

        unlock = false;
        wrapper.style.width = `100%`;
        setTimeout(() => {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function(e){
        if(e.which === 27){
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });

    /*Функции полифилы для старых браузеров*/

    (function () {
        if(!Element.prototype.closest){
            Element.prototype.closest = function(css){
                var node = this;
                while(node){
                    if(node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        }
    })();

    (function (){
        if(!Element.prototype.matches){
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector
                || Element.prototype.mozMAtchesSelector || Element.prototype.msMatchesSelector;
        }
    })();



    /*Popup form*/
    const phoneNumber = document.getElementById('phone_number');
    const popupName = document.getElementById('popup_name');
    //phoneNumber.value = phoneNumber.placeholder;
    const popupCallButton = document.getElementById('call_button');
    const popupErrors = document.querySelectorAll('.popup_error');
    let checkFirstInput = true;

    popupCallButton.addEventListener('click', (e) => {
        if(popupName.value.trim() === ''){
            popupErrors[0].classList.add('active');
            checkFirstInput = false;
            e.preventDefault();
            if(!phoneNumber.value.startsWith('+375') || phoneNumber.value.length != 13){
                popupErrors[1].classList.add('active');
                console.log(phoneNumber.value.length);
            }
            return;
        }
        if(!phoneNumber.value.startsWith('+375') || phoneNumber.value.length != 13){
            if(!checkFirstInput){
                checkFirstInput = true;
                popupErrors[0].classList.remove('active');
            }
            popupErrors[1].classList.add('active');
            e.preventDefault();
            return;
        }
        alert('Заявка принята');
        popupErrors[0].classList.remove('active');
        popupErrors[1].classList.remove('active');
        e.preventDefault();
        popupClose(document.querySelector('.popup'));
    });


    /*Basket*/
    const foodList = document.querySelector(`.popup_list`);
    const templateBasket = document.getElementById(`food-list`);
    const fragment = new DocumentFragment();

    let foodDelete = [],
        foodItems = [],
        foodCosts = [];

    let isEmptyBasket = true;

    function addNewBurger(name, price){
        if(isEmptyBasket){
            isEmptyBasket = false;
            foodList.innerHTML= '';
        }
        const el = templateBasket.content.cloneNode(true);
        el.querySelector(`.food_name`).textContent = name.textContent;
        el.querySelector(`.food_cost`).textContent = price.textContent;
        (el.querySelector('.food_delete')).registered = false;
        fragment.appendChild(el);
        foodList.appendChild(fragment);
    }


    function requestBurgers(){
        foodDelete.forEach(function(deleteButton, index){
                if(!deleteButton.registered){
                    deleteButton.addEventListener('click', () =>{
                        totalCost.forEach( price => {
                            price.textContent = `${parseInt(price.textContent) - parseInt(foodCosts[index].textContent)} руб.`;
                        });
                        let burgersAmount = parseInt(totalBurgers.textContent) - 1;

                        if(burgersAmount === 0){
                            isEmptyBasket = true;
                            foodList.innerHTML= 'На данный момент корзина пуста';
                            totalBurgers.textContent = 'Пусто';
                        }
                        if(burgersAmount > 4){
                            totalBurgers.textContent = `${burgersAmount} бургеров`;
                        }
                        if(burgersAmount < 5 && burgersAmount > 1){
                            totalBurgers.textContent = `${burgersAmount} бургера`;
                        }
                        if(burgersAmount === 1){
                            totalBurgers.textContent = `${burgersAmount} бургер`;
                        }

                        foodItems[index].remove();
                    });
                }
                deleteButton.registered = true;
        });
    }


    /*Burger*/
    const toggle = document.getElementById('toggle');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        header.classList.toggle('mobile');
        document.querySelector('html').classList.toggle('lock');
    });

}
