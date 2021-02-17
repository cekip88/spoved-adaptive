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

  glassesFormHandlers(){
    const _ = this;
    let form = document.querySelector('.glasses-form');
    if (form){
      form.querySelectorAll('button').forEach(function (button){
        button.addEventListener('click',function (e){
          _.glassesFormBtnClick(e)
        })
      })
    }
  }
  glassesFormBtnClick(e){
    const _ = this;
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
    input.value = btn.lastElementChild.textContent;
    cont.querySelectorAll('button').forEach(function (btn){
      if (btn.classList.contains('active')) btn.classList.remove('active');
    });
    btn.classList.add('active');
  }

  activeButtons(){
    if (window.pageYOffset > 0) document.querySelector('.buttons').classList.add('active');
    else document.querySelector('.buttons').classList.remove('active');
  }

  init() {
    const _ = this;
    if (document.querySelector('.buttons')) {
      _.activeButtons();
      window.addEventListener('scroll',_.activeButtons);
    }
    _.glassesFormHandlers();
  }

}
new Front();
