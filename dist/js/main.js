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

/*
// Плавная прокрутка к секциям

headerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (showMenu) toggleMenu();
  let targetSection = e.target.getAttribute('href');
  document.querySelector(targetSection).scrollIntoView({
    behavior: 'smooth'
  })
})
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
  })
});


// Аккардеон в каталоге

const filtersList = document.querySelector('.filters__list'); // Аккардеон

filtersList.addEventListener('click', e => {
  e.preventDefault();
  e.target.children[0].classList.toggle('filters__caret_collapse'); // стрелка
  e.target.nextElementSibling.classList.toggle('filters__details_opened'); // контент
})