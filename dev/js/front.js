class Front{
  constructor(){
    const _ = this;
    _.init();
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
    let value = select.firstElementChild.querySelector('strong').textContent.split(' ')[0];
    input.value = value;
    cont.classList.add('active');
    _.stringBuild(cont);
  }
  stringBuild(cont){
    let span = cont.querySelector('.block-info');
    let str = '';
    let labels = cont.querySelectorAll('label input');
    labels.forEach(function (input,index) {
      if (window.innerWidth < 952) str += input.value + 'mm' + ' ';
      else {
        if (index < labels.length - 1) str += input.value + '—';
        else str += input.value;
      }
    });
    if (window.innerWidth >= 952) str = '(' + str + ')';
    span.classList.add('active');
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
    span.classList.add('active');
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
          let span = block.querySelector('.block-info');
          block.querySelector('[type="hidden"]').value = label.querySelector('span').textContent;
          span.textContent = label.querySelector('span').textContent;
          span.classList.add('active');
        })
      })
    }
  }

  activeButtons(){
    if (window.pageYOffset > 0 && window.innerWidth < 768) document.querySelector('.buttons').classList.add('active');
    else document.querySelector('.buttons').classList.remove('active');
  }

  showSizePopup(button,content){
    const _ = this;
    let btn = document.querySelector(button);
    if (btn){
      btn.addEventListener('click',function (e) {
        _.showModal(content);
      })
    }
  }
  showModal(content){
    const _ = this;
    content = document.querySelector(content);
    content.classList.remove('dn');
    content.querySelector('.close').addEventListener('click',function () {
      _.closeModal(content);
    });
    content.querySelector('.bgc').addEventListener('click',function () {
      _.closeModal(content);
    })
  }
  closeModal(content){
    content.classList.add('dn')
  }

  mainSlider(){
    const _ = this;
    let slides = document.querySelectorAll('.product-photo .slider .slide');
    if (slides) {
      let dots = document.querySelectorAll('.product-photo .slider-dots .dot');
      let tabDots = document.querySelectorAll('.product-photo .slider-control .dot');
      _.dotHandler(dots,slides,tabDots);
      _.dotHandler(tabDots,slides,dots);
    }
  }
  dotHandler(dots,slides,tabDots){
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
        tabDots.forEach(function (dot) {
          if (dot.classList.contains('active')) dot.classList.remove('active');
          if (dot.getAttribute('data-name') === name) dot.classList.add('active');
        })
      })
    });
  }

  alsoSlider(slider){
    $(slider).slick({
      speed: 300,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 4,
      arrows: true,
      variableWidth: false,
      responsive:[
        {
          breakpoint: 950,
          settings: {
            arrows: false,
            variableWidth: true,
            dots: false
          }
        }
      ]
    });
  }
  viewSlider(){
    $('#view360').slick({
      arrows:false,
      slidesToShow:1,
      asNavFor: '.view360 .dots'
    });
    $('.view360 .dots').slick({
      asNavFor: '#view360',
      slidesToShow: 3,
      arrows: false,
      focusOnSelect: true
    })
  }

  descControl(){
    const _ = this;

    let blocks = document.querySelectorAll('.product-desc .block');
    if (blocks.length){
      let conts = document.querySelectorAll('.product-desc .block .content');
      let maxHeight = _.descContentGetHeight(conts);
      _.descSetMaxHeight(maxHeight);
      _.descMobileView(blocks);

      window.addEventListener('resize',function () {
        maxHeight = _.descContentGetHeight(conts);
        _.descSetMaxHeight(maxHeight);
        _.descMobileView(blocks);
      });

      _.descBtnsSetListeners(blocks);
    }
  }

  descContentGetHeight(conts){
    let maxHeight = 0;
    if (conts.length){
      conts.forEach(function (cont) {
        cont.removeAttribute('style');
        let height = cont.clientHeight;
        if (height > maxHeight) maxHeight = height;
        cont.setAttribute('data-height',`${height}`);
      })
    }
    return maxHeight;
  }
  descSetMaxHeight(maxHeight){
    let desc = document.querySelector('.product-desc');
    if (window.innerWidth >= 952) desc.setAttribute('style',`height:${maxHeight + 125}px`);
    else {
      desc.removeAttribute('style');
    }
  }
  descMobileView(blocks){
    blocks.forEach(function (block,index) {
      if (window.innerWidth < 952){
        block.querySelector('.content').setAttribute('style','height:0;');
        block.classList.remove('active');
      } else {
        block.querySelector('.content').removeAttribute('style');
        if (index === 0){
          block.classList.add('active');
        } else block.classList.remove('active');
      }
    })
  }
  descBtnsSetListeners(blocks){
    const _ = this;
    blocks.forEach(function (block,index) {
      let btn = block.querySelector('.label');
      btn.addEventListener('click',function () {
        _.descBlockShow(index,blocks);
      })
    })
  }
  descBlockShow(index,blocks){
    blocks.forEach(function (block,i) {
      let content = block.querySelector('.content');
      if (window.innerWidth < 952){
        if (block.classList.contains('active') || i !== index){
          block.classList.remove('active');
          content.setAttribute('style','height:0;')
        } else {
          block.classList.add('active');
          let height = content.getAttribute('data-height');
          content.setAttribute('style',`height:${parseInt(height) + 25}px;`)
        }
      } else {
        if (i !== index){
          block.classList.remove('active');
        } else {
          if (!block.classList.contains('active')) block.classList.add('active')
        }
      }
    })
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
    _.alsoSlider('#alsoSlider');
    _.alsoSlider('#recSlider');
    _.descControl();




    _.showSizePopup('.size-popup-show','.frame-size .popup');
    _.showSizePopup('.cool-cash-button','.frame-size .cool-cash');
    _.showSizePopup('.product-photo .view','.frame-size .view360');
    _.viewSlider();
  }

}
new Front();
