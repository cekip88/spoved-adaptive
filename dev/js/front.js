import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { Slider } from "./libs/slider.js";
import { Modaler } from "./libs/Modaler.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;

    //MainEventBus
  }


  selects(){
    const _ = this;
    let selects = document.querySelectorAll('.select');
    if (selects.length) {
      selects.forEach(function (select){
        let selectHead = select.firstElementChild;
        selectHead.addEventListener('click',function (e) {
          select.classList.toggle('active')
        });

        let selectBody = select.lastElementChild;
        let btns = selectBody.childNodes;
        btns.forEach(function (btn) {
          btn.addEventListener('click',function (e) {
            select.classList.remove('active');
            selectHead.querySelector('strong').textContent = btn.textContent;
            _.selectChoosen(select);
          });
        });
      })
    }
  }
  selectChoosen(select){
    const _ = this;
    let name = select.getAttribute('data-name');
    let cont = select.parentElement;
    while(!cont.classList.contains('block')){
      cont = cont.parentElement;
    }
    let input = cont.querySelector(`[name='${name}']`);
    let value = select.firstElementChild.querySelector('strong').textContent;
    input.value = value;
    _.stringBuild(cont);
  }
  stringBuild(cont){
    let span = cont.querySelector('.block-info');
    let str = '';
    cont.querySelectorAll('label input').forEach(function (input) {
      str += input.value + ' ';
    });
    span.textContent = str;
  }


  glassesFormHandlers(str){
    const _ = this;
    let colorBlock = document.querySelector(str);
    if (colorBlock){
      colorBlock.querySelectorAll('button').forEach(function (button){
        button.addEventListener('click',function (e){
          _.glassesFormBtnClick(e)
        })
      });
    }
  }
  glassesFormBtnClick(e){
    let btn = e.target;
    if (btn.tagName !== 'BUTTON'){
      while(btn.tagName !== 'BUTTON'){
        btn = btn.parentElement;
      }
    }
    let cont = btn.parentElement;
    while(cont.className !== 'content'){
      cont = cont.parentElement;
    }
    let input = cont.previousElementSibling.querySelector('input');
    let span = cont.previousElementSibling.querySelector('.block-info');
    input.value = btn.lastElementChild.textContent;
    span.textContent = btn.lastElementChild.textContent;
    cont.querySelectorAll('button').forEach(function (btn){
      if (btn.classList.contains('active')) btn.classList.remove('active');
    });
    btn.classList.add('active');
  }

  secondSizeMethod(){
    const _ = this;
    let block = document.querySelector('.size-details');
    if (block){
      block.querySelectorAll('.content label').forEach(function (label) {
        label.addEventListener('click',function () {
          block.querySelector('[type="hidden"]').value = label.querySelector('span').textContent;
          block.querySelector('.block-info').textContent = label.querySelector('span').textContent;
        })
      })
    }
  }

  activeButtons(){
    if (window.pageYOffset > 0) document.querySelector('.buttons').classList.add('active');
    else document.querySelector('.buttons').classList.remove('active');
  }

  showSizePopup(button,content){
    let btn = document.querySelector(button);
    if (btn){
      btn.addEventListener('click',function (e) {
        Modaler.showModal({
          content: content,
          closeBtn: false,
          responsive:{
            0:{
              'width':'100%',
              'height':'100%'
            }
          }
        })
      })
    }
  }

  mainSlider(){
    const _ = this;
    let slides = document.querySelectorAll('.product-photo .slider .slide');
    if (slides) {
      let dots = document.querySelectorAll('.product-photo .slider-dots .dot');
      dots.forEach(function (dot) {
        dot.addEventListener('click',function () {
          let name = dot.getAttribute('data-name');
          slides.forEach(function (slide) {
            if (slide.classList.contains('active')) slide.classList.remove('active');
            if (slide.getAttribute('data-name') === name) slide.classList.add('active');
          });
          dots.forEach(function (dot) {
            if (dot.classList.contains('active')) dot.classList.remove('active');
            if (dot.getAttribute('data-name') === name) dot.classList.add('active');
          });

        })
      })
    }
  }

  init() {
    const _ = this;
    if (document.querySelector('.buttons')) {
      _.activeButtons();
      window.addEventListener('scroll',_.activeButtons);
    }
    _.mainSlider();
    _.glassesFormHandlers('.product-info .color');
    _.glassesFormHandlers('.product-info .lens');
    _.selects();
    _.secondSizeMethod();
    _.showSizePopup('.size-popup-show','.frame-size .popup');
    _.showSizePopup('.cool-cash-button','.frame-size .cool-cash');
    _.showSizePopup('.product-photo .view','.frame-size .view360');
  }

}
new Front();
