$(document).ready(function() {
  // Слайдер на главной
  $(".banner__slider").slick({
    dots: false
  });

  // Слайдер в карточке товара
  $(".pcard__slider-main").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".pcard__slider-nav"
  });
  $(".pcard__slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".pcard__slider-main",
    dots: false,
    focusOnSelect: true
  });

  // Слайдер отзывов

  $(".testimonials__list").slick({
    mobileFirst: true,
    // centerMode: true,
    // centerPadding: '60px',
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: "unslick"
      }
    ]
  });

  // Табы на странице новости
  const tabLinks = document.querySelectorAll(".tabs__tab"); // Вкладки
  const tabContent = document.querySelectorAll(".tabs__content"); // Содержимое
  // const tabLinkContainer = document.querySelector('.tabs__btns');

  if (tabLinks != null)
    tabLinks.forEach(tab => tab.addEventListener("click", switchTab));

  function switchTab(e) {
    e.preventDefault();

    const tab = e.currentTarget;
    tabLinks.forEach(link => {
      link.classList.remove("tabs__tab_active");
    });

    tab.classList.add("tabs__tab_active");

    tabContent.forEach(content => {
      content.classList.remove("tabs__content_active");
    });

    let activeTab = tab.getAttribute("href").slice(1);
    document.getElementById(activeTab).classList.add("tabs__content_active");
  }

  // Меню бургер

  const menuBtn = document.querySelector(".menu-btn"); // Кнопка меню
  const headerNav = document.querySelector(".nav"); // Блок с меню
  const headerMenu = document.querySelector(".nav__menu"); // Меню
  const lightBox = document.querySelector(".light-box"); // Лайтбокс (темный фон)

  let showMenu = false; // флаг

  menuBtn.addEventListener("click", toggleMenu);
  lightBox.addEventListener("click", closeMenu);

  function toggleMenu() {
    if (!showMenu) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    menuBtn.classList.add("close");
    headerNav.classList.add("show");
    headerMenu.classList.add("show");
    lightBox.classList.add("show");
    // menuItems.forEach(item => item.classList.add('show'));
    window.addEventListener("scroll", noScroll);
    showMenu = true;
  }

  function closeMenu() {
    menuBtn.classList.remove("close");
    headerNav.classList.remove("show");
    headerMenu.classList.remove("show");
    lightBox.classList.remove("show");
    // menuItems.forEach(item => item.classList.remove('show'));
    window.removeEventListener("scroll", noScroll);
    showMenu = false;
  }

  // Остановить скролл когда открыт меню
  function noScroll() {
    window.scroll(0, 0);
  }

  // Поле для поиска
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".search-input");
  const searchForm = document.querySelector(".search-form");
  searchBtn.addEventListener("click", e => {
    e.preventDefault();
    const focusedEl = document.activeElement;

    searchInput.value !== ""
      ? searchForm.submit()
      : searchInput !== focusedEl
      ? searchInput.focus()
      : void 0;
  });

  // Страница: Каталог -> Аккардеон

  const filtersList = document.querySelector(".filters__list"); // Аккардеон

  if (filtersList != null)
    filtersList.addEventListener("click", filterListToggler);

  function filterListToggler(e) {
    e.preventDefault();
    e.target.children[0].classList.toggle("filters__caret_collapse"); // стрелка
    e.target.nextElementSibling.classList.toggle("filters__details_opened"); // контент
  }

  // Страница: О нас -> Попперы

  const popperContainer = document.querySelector(".featured-block"); // Контейнер для поппера
  const popperCircleAll = document.querySelectorAll(".popper__circle");
  const popperInfoAll = document.querySelectorAll(".popper__info");

  if (popperContainer != null)
    popperContainer.addEventListener("click", createPopper);

  function removeClassFromElements(array, className) {
    // Удаляет класс у всех элементов массива
    // Аргументы: массив, название класса
    array.forEach(element => {
      element.classList.remove(className);
    });
  }

  function createPopper(e) {
    const clickedEl = e.target; // Кружочек с номером
    const popperInfo = clickedEl.nextElementSibling; // Соседний блок с инфо.

    if (
      !clickedEl.classList.contains("popper__circle_active") &&
      clickedEl.classList.contains("popper__circle") &&
      popperInfo != null
    ) {
      open(clickedEl, popperInfo);
    } else {
      close();
    }
  }

  function open(referenceElement, popperElement) {
    close(); // Закрывает все (остальные) открытые окна

    referenceElement.classList.add("popper__circle_active");
    popperElement.classList.add("popper__info_show");

    // Создание инфо блока
    new Popper(referenceElement, popperElement, {
      placement: "bottom-start",
      modifiers: {
        preventOverflow: {
          boundariesElement: popperContainer
        },
        flip: {
          behavior: ["left", "right", "bottom", "top"]
        },
        offset: {
          enabled: true,
          offset: "33"
        }
      }
    });
  }

  function close() {
    removeClassFromElements(popperInfoAll, "popper__info_show");
    removeClassFromElements(popperCircleAll, "popper__circle_active");
  }

  // Сраница: Корзина
  // Запрет ввода символов кроме цифр (страница Корзина -> количество товаров)
  // Restricts input for the given textbox to the given inputFilter.
  function setInputFilter(textboxes, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop"
    ].forEach(function(event) {
      textboxes.forEach(textbox => {
        textbox.oldValue = "";
        textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          }
        });
      });
    });
  }
  const input = document.querySelectorAll(".full-chars__quantity");
  // Restrict input to digits and '.' by using a regular expression filter.
  setInputFilter(input, function(value) {
    return /^\d*\.?\d*$/.test(value);
  });

  const quantity = document.querySelectorAll(".full-chars__quantity-wrapper");
  quantity.forEach(item => {
    item.addEventListener("click", quantityChanger);
  });

  function quantityChanger(e) {
    /* Функция менят значение поле с количеством товара */
    e.preventDefault();

    const incDecBtn = e.target.classList;
    const quantityInput = this.children[1];

    if (incDecBtn.contains("full-chars__decrementer")) {
      decrement(quantityInput);
    } else if (incDecBtn.contains("full-chars__incrementer")) {
      increment(quantityInput);
    }
  }

  function increment(quantityInput) {
    quantityInput.value++;
  }

  function decrement(quantityInput) {
    quantityInput.value >= 2 ? quantityInput.value-- : void 0;
  }

  const commentToggler = document.querySelector(".comment-toggler");
  if (commentToggler != null)
    commentToggler.addEventListener("click", cToggler);

  function cToggler(e) {
    e.preventDefault();
    const toggler = this.nextElementSibling.classList;
    if (toggler.contains("contact-form__comment")) {
      toggler.toggle("contact-form__comment_show");
    }
  }
});
