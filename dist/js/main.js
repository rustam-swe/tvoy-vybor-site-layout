// Меню бургер

const menuBtn = document.querySelector('.menu-btn'); // Кнопка меню
const headerNav = document.querySelector('.nav'); // Блок с меню
const headerMenu = document.querySelector('.nav__menu'); // Меню
const lightBox = document.querySelector('.light-box'); // Лайтбокс (темный фон)

let showMenu = false; // флаг

menuBtn.addEventListener('click', toggleMenu);
lightBox.addEventListener('click', closeMenu);

function toggleMenu() {
  if (!showMenu) {
    openMenu();
  } else {
    closeMenu();
  }
}

function openMenu() {
  menuBtn.classList.add('close');
  headerNav.classList.add('show');
  headerMenu.classList.add('show');
  lightBox.classList.add('show');
  // menuItems.forEach(item => item.classList.add('show'));
  window.addEventListener('scroll', noScroll);
  showMenu = true;
}

function closeMenu() {
  menuBtn.classList.remove('close');
  headerNav.classList.remove('show');
  headerMenu.classList.remove('show');
  lightBox.classList.remove('show');
  // menuItems.forEach(item => item.classList.remove('show'));
  window.removeEventListener('scroll', noScroll);
  showMenu = false;
}

// Остановить скролл когда открыт меню
function noScroll() {
  window.scroll(0, 0);
}

// Поле для поиска
const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')
const searchForm = document.querySelector('.search-form')
searchBtn.addEventListener('click', e => {
  e.preventDefault()
  const focusedEl = document.activeElement;

  searchInput.value !== '' ? searchForm.submit() :
    searchInput !== focusedEl ? searchInput.focus() :
    void(0)

})

// Попперы
const popperContainer = document.querySelector('.popper')
const refEl = document.querySelector('.popper__circle');
const popEl = document.querySelector('.popper__info');

/*popperContainer.addEventListener('click', (e) => {
  new Popper(refEl, popEl, {
    placement: 'auto-start'
  });
  console.log(e, refEl, popEl)
  if (e.target != refEl || e.target != popEl) {
    popEl.classList.remove('popper__info_show');
  } else {
    popEl.classList.add('popper__info_show');
  }
})


// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
    textbox.oldValue = "";
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}
const input = document.querySelector('.full-chars__quantity');
// Restrict input to digits and '.' by using a regular expression filter.
setInputFilter(input, function (value) {
  return /^\d*\.?\d*$/.test(value);
});

const decrementBtn = document.querySelector('.full-chars__decrementer');
const incrementBtn = document.querySelector('.full-chars__incrementer');


function increment() {
  document.querySelector('.full-chars__quantity').value++
}

function decrement() {
  document.querySelector('.full-chars__quantity').value++
}

decrementBtn.addEventListener('click', decrement);
incrementBtn.addEventListener('click', increment);

// Аккардеон в каталоге

const filtersList = document.querySelector('.filters__list'); // Аккардеон

filtersList.addEventListener('click', e => {
  e.preventDefault();
  e.target.children[0].classList.toggle('filters__caret_collapse'); // стрелка
  e.target.nextElementSibling.classList.toggle('filters__details_opened'); // контент
});

*/
$(document).ready(function () {
  // Слайдер на главной
  $('.banner__slider').slick({
    dots: false
  });

  // Слайдер в карточке товара
  $('.pcard__slider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.pcard__slider-nav'
  });
  $('.pcard__slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.pcard__slider-main',
    dots: false,
    focusOnSelect: true
  });

  // Слайдер отзывов

  $('.testimonials__list').slick({
    mobileFirst: true,
    // centerMode: true,
    // centerPadding: '60px',
    slidesToShow: 1,
    responsive: [{
      breakpoint: 992,
      settings: "unslick"
    }]
  });

  // Табы на странице новости
  const tabLinks = document.querySelectorAll('.tabs__tab'); // Вкладки
  const tabContent = document.querySelectorAll('.tabs__content'); // Содержимое
  // const tabLinkContainer = document.querySelector('.tabs__btns');

  tabLinks.forEach(tab => tab.addEventListener('click', switchTab))

  function switchTab(e) {
    e.preventDefault()

    tabLinks.forEach(link => {
      link.classList.remove('tabs__tab_active');
    });

    e.target.classList.add('tabs__tab_active');

    tabContent.forEach(content => {
      content.classList.remove('tabs__content_active');
    });

    let activeTab = e.target.getAttribute('href').slice(1);
    document.getElementById(activeTab).classList.add('tabs__content_active')
  }

});