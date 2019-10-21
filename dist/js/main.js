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
  });

  // Табы

  /* 
    $('.tabs__container > section').hide();
      $('.tabs__container > section:first-of-type').show();
      $('.tabs__btns a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
          tabgroup = '#' + $this.parents('.tabs__btns').data('tabgroup'),
          others = $this.closest('li').siblings().children('a'),
          target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

      })
    */

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


// Аккардеон в каталоге

const filtersList = document.querySelector('.filters__list'); // Аккардеон

filtersList.addEventListener('click', e => {
  e.preventDefault();
  e.target.children[0].classList.toggle('filters__caret_collapse'); // стрелка
  e.target.nextElementSibling.classList.toggle('filters__details_opened'); // контент
})