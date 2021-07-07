import 'lazysizes';
lazySizes.cfg.preloadAfterLoad = true;
import {gsap} from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
gsap.defaults({
  ease: "power2.inOut", 
  duration: 1
});

import SwipeListener from 'swipe-listener';

const Dev = false;
const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}
const $screens = document.querySelectorAll('.screen');
const $main = document.querySelector('.main');

function getCenter($el) {
  let y = $el.getBoundingClientRect().y,
      x = $el.getBoundingClientRect().x,
      h = $el.getBoundingClientRect().height,
      w = $el.getBoundingClientRect().width;
  
  return {y: y + h / 2, x: x + w / 2};
}

window.CustomInteractionEvents = Object.create({
  targets: {
    value: 'a, button, [data-custom-interaction]'
  },
  touchEndDelay: {
    value: 100
  }, 
  init() {
    this.events = (event) => {
      let $targets = [];
      $targets[0] = event.target!==document?event.target.closest(this.targets.value):null;
      let $element = $targets[0], i = 0;
  
      while($targets[0]) {
        $element = $element.parentNode;
        if($element!==document) {
          if($element.matches(this.targets.value)) {
            i++;
            $targets[i] = $element;
          }
        } 
        else {
          break;
        }
      }
  
      //touchstart
      if(event.type=='touchstart') {
        this.touched = true;
        if(this.timeout) clearTimeout(this.timeout);
        if($targets[0]) {
          for(let $target of $targets) $target.setAttribute('data-touch', '');
        }
      } 
      //touchend
      else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
        this.timeout = setTimeout(() => {this.touched = false}, 500);
        if($targets[0]) {
          setTimeout(()=>{
            for(let $target of $targets) {
              $target.removeAttribute('data-touch');
            }
          }, this.touchEndDelay.value)
        }
      } 
      //mouseenter
      if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
        $targets[0].setAttribute('data-hover', '');
      }
      //mouseleave
      else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
        $targets[0].removeAttribute('data-click');
        $targets[0].removeAttribute('data-hover');
      }
      //mousedown
      if(event.type=='mousedown' && !this.touched && $targets[0]) {
        $targets[0].setAttribute('data-click', '');
      } 
      //mouseup
      else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
        $targets[0].removeAttribute('data-click');
      }
    }
    document.addEventListener('touchstart',  this.events);
    document.addEventListener('touchend',    this.events);
    document.addEventListener('mouseenter',  this.events, true);
    document.addEventListener('mouseleave',  this.events, true);
    document.addEventListener('mousedown',   this.events);
    document.addEventListener('mouseup',     this.events);
    document.addEventListener('contextmenu', this.events);
  },
  destroy() {
    document.removeEventListener('touchstart',  this.events);
    document.removeEventListener('touchend',    this.events);
    document.removeEventListener('mouseenter',  this.events, true);
    document.removeEventListener('mouseleave',  this.events, true);
    document.removeEventListener('mousedown',   this.events);
    document.removeEventListener('mouseup',     this.events);
    document.removeEventListener('contextmenu', this.events);
    
    for(let key in this) {
      if(this.hasOwnProperty(key)) delete this[key];
    }
  }
})

window.StaticAnimations = Object.create({
  init() {

    gsap.registerEffect({
      name: "bounce",
      effect: ($element) => {
        return gsap.timeline({paused: true})
          .to($element, {yPercent:-10, ease:'power1.inOut'})
          .to($element, {yPercent:0, ease:'power1.inOut'})
      },
      extendTimeline: true
    });

    this.animations = {};

    let $screen_2_refresh = document.querySelectorAll('.screen-2__refresh');
    this.animations['screen_2_refresh'] = gsap.timeline({repeat:-1})
      .fromTo($screen_2_refresh, {rotatation:0}, {rotation:-360, ease:'none', duration:2})

    let $screen_2_arrows = document.querySelectorAll('.screen-2__arrow');
    this.animations['screen_2_arrows'] = gsap.timeline({repeat:-1})
      .fromTo($screen_2_arrows[0], {css:{color:'#fff'}}, {css:{color:'#5F74BE'}, duration:0.5})

      .fromTo([$screen_2_arrows[1], $screen_2_arrows[2]], 
        {css:{color:'#5F74BE'}}, {css:{color:'#fff'}, duration:0.5, stagger:{each:0.5}}, '-=0.5')

      .to([$screen_2_arrows[1], $screen_2_arrows[2]], 
        {css:{color:'#5F74BE'}, duration:0.5, stagger:{each:0.5}}, '-=0.5')

      .to($screen_2_arrows[0], {css:{color:'#fff'}, duration:0.5}, '-=0.5')

    let $screen_5_arrows = document.querySelectorAll('.screen-5__box .icon');
    this.animations['screen_5_arrows'] = gsap.timeline({repeat:-1})
      .fromTo($screen_5_arrows[0], {css:{color:'#fff'}}, {css:{color:'#5F74BE'}, duration:0.5})
      .fromTo([$screen_5_arrows[1], $screen_5_arrows[2], $screen_5_arrows[3], $screen_5_arrows[4]], 
        {css:{color:'#5F74BE'}}, {css:{color:'#fff'}, duration:0.5, stagger:{each:0.5}}, '-=0.5')
      .to([$screen_5_arrows[1], $screen_5_arrows[2], $screen_5_arrows[3], $screen_5_arrows[4]], 
        {css:{color:'#5F74BE'}, duration:0.5, stagger:{each:0.5}}, '-=1.5')
      .to($screen_5_arrows[0], {css:{color:'#fff'}, duration:0.5}, '-=0.5')


    let $screen_6_arrows = document.querySelectorAll('.screen-6__pyramid-arrow .icon'),
        $screen_7_arrows = document.querySelectorAll('.screen-7__item .icon');

    this.animations['screen_5_arrows'] = gsap.timeline({repeat:-1})
      .fromTo([$screen_6_arrows[0], $screen_7_arrows[0]], {css:{color:'#fff'}}, {css:{color:'#5F74BE'}, duration:0.5})
      .fromTo([$screen_6_arrows[1], $screen_7_arrows[1]], {css:{color:'#5F74BE'}}, {css:{color:'#fff'}, duration:0.5}, '-=0.5')
      .to([$screen_6_arrows[0], $screen_7_arrows[0]], {css:{color:'#fff'}, duration:0.5})
      .to([$screen_6_arrows[1], $screen_7_arrows[1]], {css:{color:'#5F74BE'}, duration:0.5}, '-=0.5')


    //bounce monet
    let $monet_1_inner = document.querySelector('.screen-1__monet-inner');
    this.animations['monet_1_inner'] = gsap.effects.bounce($monet_1_inner);
    this.animations['monet_1_inner'].play().eventCallback('onComplete', () => {
      this.animations['monet_1_inner'].play(0);
    });

    //gold
    let $screen_3_gold = document.querySelectorAll('.screen-3__gold');
    this.animations['screen_3_gold_bounce'] = gsap.effects.bounce($screen_3_gold);
    this.animations['screen_3_gold_bounce'].repeat(-1).play();

    //screen 4
    let $screen_4_arrow = document.querySelector('.screen-4__arrow');
    this.animations['screen_4_arrow'] = gsap.timeline({repeat:-1})
      .fromTo($screen_4_arrow, {css:{color:'#5F74BE'}}, {css:{color:'#fff'}, duration:0.75})
      .to($screen_4_arrow, {css:{color:'#5F74BE'}, duration:0.75})
  },

  destroy() {
    for(let key in this.animations) {
      this.animations[key].kill();
    }
    for(let key in this) {
      if(this.hasOwnProperty(key)) delete this[key];
    }
  }
})

window.PageSlider = Object.create({
  create() {
    this.check = () => {
      if(window.innerWidth >= brakepoints.xl) {
        if(!this.initialized) this.init();
      } else if(this.initialized) {
        this.kill();
      }
    }
    this.check();
    window.addEventListener('resize', this.check);
  },

  init() {

    document.body.style.overflow = 'hidden';

    this.scrollTo = (index, speed = 1) => {
      if(speed > 0) this.inScroll = true;

      if(index=='closest') {
        let y = window.pageYOffset,
            h = window.innerHeight;
        index = Math.round(y / h) > $screens.length - 1 ? $screens.length - 1 : Math.round(y / h);
      } 

      if(speed > 0) {
        gsap.to(window, {scrollTo: $screens[index], duration:speed, onComplete: () => {
          setTimeout(() => { this.inScroll = false; }, 100);
        }});
      } else {
        gsap.set(window, {scrollTo: $screens[index]})
      }

      if(this.index !== undefined && index !== this.index) $screens[this.index].dispatchEvent(new CustomEvent("leave"));
      if(index !== this.index) {
        $screens[index].dispatchEvent(new CustomEvent("enter"));
      }

      this.index = index;
      localStorage.setItem('index', this.index);
    }

    if(Dev && localStorage.getItem('index')) {
      this.scrollTo(+localStorage.getItem('index'), 0);
    }

    this.fixScreenEvent = () => {
      this.scrollTo('closest', 0);
    }

    this.scrollEvent = (event) => {
      if(this.inScroll) return;

      let index = this.index ? this.index : 0;

      if(event.deltaY > 0) {
        if(index < $screens.length - 1) this.scrollTo(index + 1);
      } else if(event.deltaY < 0) {
        if(index > 0) this.scrollTo(index - 1);
      }
    }
    
    this.swipeEvent = (event) => {
      if(this.inScroll) return;

      let dir = event.detail.directions,
          index = this.index ? this.index : 0;

      if(dir.top && index < $screens.length - 1) this.scrollTo(index + 1);
      else if(dir.bottom && index > 0) this.scrollTo(index - 1);
    }
    
    //add swipe events
    SwipeListener($main);
    $main.addEventListener('swipe', this.swipeEvent);
    window.addEventListener('wheel', this.scrollEvent);
    window.addEventListener('resize', this.fixScreenEvent);

    this.initialized = true;
  },

  kill() {
    document.body.style.overflow = 'visible';

    $main.removeEventListener('swipe', this.swipeEvent);
    window.removeEventListener('wheel', this.scrollEvent);
    window.removeEventListener('resize', this.fixScreenEvent);
    for(let key in this) {
      if(this.hasOwnProperty(key)) delete this[key];
    }
  },

  destroy() {
    window.removeEventListener('resize', this.check);
    if(this.initialized) this.kill();
  }
})

window.onScrollAnimations = Object.create({
  create() {
    this.check = () => {
      if(window.innerWidth >= brakepoints.xl) {
        if(!this.initialized) this.init();
      } else if(this.initialized) {
        this.kill();
      }
    }
    this.check();
    window.addEventListener('resize', this.check);
  },

  init() {

    this.dynamicAnimations = {};
    this.staticAnimations = {};

    let $sky =  document.querySelector('.sky'),
        $screen_1_scene = document.querySelector('.screen-1__scene'),
        $monet_1 = document.querySelector('.screen-1__monet'),
        $monet_1_img = $monet_1.querySelector('.image'),
        $monet_2 = document.querySelector('.screen-2__monet'),
        $monet_2_img = $monet_2.querySelector('.image'),
        $monet_3 = document.querySelector('.screen-3__monet'),
        $monet_3_img = $monet_3.querySelector('.image'),
        $monet_4 = document.querySelector('.screen-4__monet'),
        $monet_4_img = $monet_4.querySelector('.image'),
        $monet_5 = document.querySelector('.screen-5__monet'),
        $monet_5_img = $monet_5.querySelector('.image'),
        $documents_1 = document.querySelectorAll('.screen-1__documents .documents__element'),
        $documents_1_img = document.querySelectorAll('.screen-1__documents .image'),
        $documents_2 = document.querySelectorAll('.screen-2__documents .documents__element'),
        $documents_2_img = document.querySelectorAll('.screen-2__documents .image'),
        $documents_3 = document.querySelectorAll('.screen-3__documents .documents__element'),
        $documents_3_img = document.querySelectorAll('.screen-3__documents .image'),
        //else
        $screen_2_images = document.querySelectorAll('.screen-2__bot, .screen-2__money'),
        $screen_3_background = document.querySelector('.screen-3__background'),
        $screen_7_background = document.querySelector('.screen-7__background'),
        $screen_7_dreams = document.querySelectorAll('.screen-7__dream');

    this.resetDynamicStyles = () => {
      gsap.set([$monet_1, $monet_1_img, $monet_2, $monet_2_img, $monet_3, $monet_3_img, $monet_4, $monet_4_img, $monet_5, $monet_5_img,
        $documents_1, $documents_1_img, $documents_2, $documents_2_img, $documents_3, $documents_3_img,
        ], {clearProps:'all'})

      gsap.set($sky, {clearProps:'x, y'})
    }

    this.resetStaticStyles = () => {
      gsap.set([$screen_1_scene, $screen_2_images, $screen_3_background, $screen_7_dreams], {clearProps:'all'})
    }

    this.createStaticAnimations = () => {
      this.staticAnimations['screen_2_images'] = gsap.timeline({paused:true})
        .fromTo($screen_2_images, 
          {autoAlpha:0, scale:0.7}, 
          {autoAlpha:1, scale:1, ease:'power2.out', duration:0.85, stagger:{amount:0.15}}, '+=0.5')
      
      this.staticAnimations['screen_3_background'] = gsap.timeline({paused:true})
        .fromTo($screen_3_background, {autoAlpha:0}, {autoAlpha:1})

      this.staticAnimations['screen_7_background'] = gsap.timeline({paused:true})
        .fromTo($screen_7_background, {autoAlpha:0}, {autoAlpha:1})

      this.staticAnimations['screen_7_dreams'] = gsap.timeline({paused:true})
        .fromTo($screen_7_dreams, {autoAlpha:0, scale:0.7}, {autoAlpha:1, scale:1, ease:'power2.out', stagger:{amount:0.2}}, '+=0.5')
    }

    this.createDynamicAnimations = () => {

      console.log('createDynamicAnimations created');

      this.resetDynamicStyles();

      this.dynamicAnimations['sky'] = gsap.timeline({paused:true})
        .fromTo($sky, {y:0}, {
          y: () => {
            return (window.innerHeight * 7) - $sky.getBoundingClientRect().height;
          }, ease:'none'})

      this.dynamicAnimations['screen_1'] = gsap.timeline({paused:true})
        .set([$documents_2, $monet_2, $monet_3], {autoAlpha:0})
        //monet
        .fromTo($monet_1_img, {y:0, x:0, scale:1}, {
          y: () => { return getCenter($monet_2).y - getCenter($monet_1).y },
          x: () => { return getCenter($monet_2).x - getCenter($monet_1).x }, 
          scale: () => { return $monet_2.getBoundingClientRect().width / $monet_1.getBoundingClientRect().width},
          ease:'none'
        })
        //docs
        .fromTo($documents_1_img, {y:0, x:0, scale:1}, {
          y: (index) => {
            return getCenter($documents_2[index]).y - getCenter($documents_1[index]).y
          },
          x: (index) => {
            return getCenter($documents_2[index]).x - getCenter($documents_1[index]).x
          },
          scale: (index) => {
            return $documents_2[index].getBoundingClientRect().width / $documents_1[index].getBoundingClientRect().width
          },
          ease: 'none', duration: 0.7, stagger: { amount:0.3 }
        }, '-=1')
        //bg
        .fromTo($screen_1_scene, {yPercent:0, autoAlpha:1}, {yPercent:150, autoAlpha:0, ease:'none'}, '-=1')

      this.dynamicAnimations['screen_2'] = gsap.timeline({paused:true})
        .set([$documents_2, $monet_2], {autoAlpha:1}, '+=0.01')
        .set([$documents_1, $monet_1, $documents_3], {autoAlpha:0})
        //monet
        .fromTo($monet_2_img, {y:0, x:0, scale:1}, {
          y: () => { return getCenter($monet_3).y - getCenter($monet_2).y },
          x: () => { return getCenter($monet_3).x - getCenter($monet_2).x }, 
          scale: () => { return $monet_3.getBoundingClientRect().width / $monet_2.getBoundingClientRect().width},
          ease:'none'
        })
        //docs
        .fromTo($documents_2_img, {y:0, x:0, scale:1}, {
          y: (index) => {
            return getCenter($documents_3[index]).y - getCenter($documents_2[index]).y
          },
          x: (index) => {
            return getCenter($documents_3[index]).x - getCenter($documents_2[index]).x
          },
          scale: (index) => {
            return $documents_3[index].getBoundingClientRect().width / $documents_2[index].getBoundingClientRect().width
          },
          ease: 'none', duration: 0.7, stagger: { amount:0.3 }
        }, '-=1')

      this.dynamicAnimations['screen_3'] = gsap.timeline({paused:true})
        .set([$monet_3], {autoAlpha:1}, '+=0.01')
        .set([$monet_2, $monet_4], {autoAlpha:0})
        //monet
        .fromTo($monet_3_img, {y:0, x:0, scale:1}, {
          y: () => { return getCenter($monet_4).y - getCenter($monet_3).y },
          x: () => { return getCenter($monet_4).x - getCenter($monet_3).x }, 
          scale: () => { return $monet_4.getBoundingClientRect().width / $monet_3.getBoundingClientRect().width},
          ease:'none'
        })

      this.dynamicAnimations['screen_4'] = gsap.timeline({paused:true})
        .set($monet_4, {autoAlpha:1}, '+=0.01')
        .set([$monet_3, $monet_5], {autoAlpha:0})
        //monet
        .fromTo($monet_4_img, {y:0, x:0, scale:1}, {
          y: () => { return getCenter($monet_5).y - getCenter($monet_4).y },
          x: () => { return getCenter($monet_5).x - getCenter($monet_4).x }, 
          scale: () => { return $monet_5.getBoundingClientRect().width / $monet_4.getBoundingClientRect().width},
          ease:'none'
        })
      
      //update ScrollTrigger
      ScrollTrigger.refresh();
    }

    this.createStaticAnimations();
    this.createDynamicAnimations();
    window.addEventListener('resize', this.createDynamicAnimations);

    this.triggers = [];

    this.triggers.push(ScrollTrigger.create({
      trigger: $main,
      start: "top top",
      end: () => { return `+=${window.innerHeight * 6} top`; },
      onUpdate: self => {
        this.dynamicAnimations['sky'].progress(self.progress);
      },
      onRefresh: self => {
        this.dynamicAnimations['sky'].progress(self.progress);
      }
    }))

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[0],
      start: "top top",
      end: "bottom top",
      onUpdate: self => {
        this.dynamicAnimations['screen_1'].progress(self.progress);
      },
      onRefresh: self => {
        this.dynamicAnimations['screen_1'].progress(self.progress);
      }
    }))

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[1],
      start: "top top",
      end: "bottom top",
      onUpdate: self => {
        this.dynamicAnimations['screen_2'].progress(self.progress);
      },
      onRefresh: self => {
        this.dynamicAnimations['screen_2'].progress(self.progress);
      }
    }))

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[2],
      start: "top top",
      end: "bottom top",
      onUpdate: self => {
        this.dynamicAnimations['screen_3'].progress(self.progress);
      },
      onRefresh: self => {
        this.dynamicAnimations['screen_3'].progress(self.progress);
      }
    }))

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[3],
      start: "top top",
      end: "bottom top",
      onUpdate: self => {
        this.dynamicAnimations['screen_4'].progress(self.progress);
      },
      onRefresh: self => {
        this.dynamicAnimations['screen_4'].progress(self.progress);
      }
    }))

    this.enterEvents = {};
    this.leaveEvents = {};

    this.enterEvents[0] = () => {
      StaticAnimations.animations['monet_1_inner'].timeScale(1).play();
    }

    this.enterEvents[1] = () => {
      StaticAnimations.animations['monet_1_inner'].timeScale(2).reverse();
      this.staticAnimations['screen_2_images'].play(0);

      new Meteorite({type: 1, speed: 2, position: 0.48, delay: 0.51});
      new Meteorite({type: 2, speed: 2.3, position: 0.72, delay: 0.4});
      new Meteorite({type: 3, speed: 3, position: 0.3, delay: 0.52});
      new Meteorite({type: 2, speed: 2.3, position: 0.8, delay: 0.5});
      new Meteorite({type: 3, speed: 3, position: 0.75, delay: 0.42});
      new Meteorite({type: 3, speed: 3.7, position: 0.56, delay: 0.9});
    }
    this.enterEvents[2] = () => {
      this.staticAnimations['screen_3_background'].play();
    }
    this.leaveEvents[2] = () => {
      this.staticAnimations['screen_3_background'].reverse();
    }
    this.enterEvents[3] = () => {
      new Meteorite({type: 1, speed: 2, position: 0.5, delay: 0.5});
      new Meteorite({type: 3, speed: 3.5, position: 0.6, delay: 0.7});
    }
    this.enterEvents[4] = () => {
      new Meteorite({type: 1, speed: 2, position: 0.55, delay: 0.5});
      new Meteorite({type: 2, speed: 2.3, position: 0.7, delay: 0.4});
      new Meteorite({type: 2, speed: 2.5, position: 0.4, delay: 0.5});
      new Meteorite({type: 2, speed: 2.6, position: 0.9, delay: 0.5});
      new Meteorite({type: 2, speed: 3, position: 0.7, delay: 0.5});
      new Meteorite({type: 3, speed: 3.4, position: 0.5, delay: 1});
    }

    this.enterEvents[6] = () => {
      this.staticAnimations['screen_7_dreams'].play(0);
      this.staticAnimations['screen_7_background'].play();
    }
    this.leaveEvents[6] = () => {
      this.staticAnimations['screen_7_background'].reverse();
    }

    //events
    $screens[0].addEventListener('enter', this.enterEvents[0]);

    $screens[1].addEventListener('enter', this.enterEvents[1]);

    $screens[2].addEventListener('enter', this.enterEvents[2]);
    $screens[2].addEventListener('leave', this.leaveEvents[2]);

    $screens[3].addEventListener('enter', this.enterEvents[3]);

    $screens[4].addEventListener('enter', this.enterEvents[4]);

    $screens[6].addEventListener('enter', this.enterEvents[6]);
    $screens[6].addEventListener('leave', this.leaveEvents[6]);

    this.initialized = true;
  },

  kill() {
    window.removeEventListener('resize', this.createDynamicAnimations);

    if(StaticAnimations.animations && !StaticAnimations.animations['monet_1_inner'].isActive()) {
      StaticAnimations.animations['monet_1_inner'].timeScale(1).play();
    }

    $screens.forEach(($screen, index) => {
      if(this.enterEvents[index]) {
        $screen.removeEventListener('enter', this.enterEvents[index]);
      }
      if(this.leaveEvents[index]) {
        $screen.removeEventListener('enter', this.leaveEvents[index])
      }
    })
    
    for(let trigger of this.triggers) {
      trigger.kill();
    }

    for(let key in this.dynamicAnimations) {
      this.dynamicAnimations[key].kill();
    }

    this.resetStaticStyles();
    this.resetDynamicStyles();

    for(let key in this) {
      if(this.hasOwnProperty(key)) delete this[key];
    }
  },

  destroy() {
    window.removeEventListener('resize', this.check);
    if(this.initialized) this.kill();
  }
})

window.MobileMeteorsAnimation = Object.create({
  create() {
    this.check = () => {
      if(window.innerWidth < brakepoints.xl) {
        if(!this.initialized) this.init();
      } else if(this.initialized) {
        this.kill();
      }
    }
    this.check();
    window.addEventListener('resize', this.check);
  },

  init() {
    this.createMeteors_1 = () => {
      new Meteorite({type: 1, speed: 2, position: 0.5, delay: 0.5});
      new Meteorite({type: 3, speed: 3.5, position: 0.6, delay: 0.7});
    }
    
    this.createMeteors_2 = () => {
      new Meteorite({type: 1, speed: 2, position: 0.55, delay: 0.5});
      new Meteorite({type: 2, speed: 2.3, position: 0.7, delay: 0.4});
      new Meteorite({type: 2, speed: 2.5, position: 0.4, delay: 0.5});
      new Meteorite({type: 2, speed: 2.6, position: 0.9, delay: 0.5});
      new Meteorite({type: 2, speed: 3, position: 0.7, delay: 0.5});
      new Meteorite({type: 3, speed: 3.4, position: 0.5, delay: 1});
    }

    this.createMeteors_3 = () => {
      new Meteorite({type: 1, speed: 2, position: 0.48, delay: 0.51});
      new Meteorite({type: 2, speed: 2.3, position: 0.72, delay: 0.4});
      new Meteorite({type: 3, speed: 3, position: 0.3, delay: 0.52});
      new Meteorite({type: 2, speed: 2.3, position: 0.8, delay: 0.5});
      new Meteorite({type: 3, speed: 3, position: 0.75, delay: 0.42});
      new Meteorite({type: 3, speed: 3.7, position: 0.56, delay: 0.9});
    }

    this.triggers = [];

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[3],
      start: "center bottom",
      end: "center top",
      onEnter: () => {
        this.createMeteors_1();
      },
      onEnterBack: () => {
        this.createMeteors_1();
      }
    }))

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[4],
      start: "center bottom",
      end: "center top",
      onEnter: () => {
        this.createMeteors_2();
      },
      onEnterBack: () => {
        this.createMeteors_2();
      }
    }))

    this.triggers.push(ScrollTrigger.create({
      trigger: $screens[1],
      start: "center bottom",
      end: "center top",
      onEnter: () => {
        this.createMeteors_3();
      },
      onEnterBack: () => {
        this.createMeteors_3();
      }
    }))

    this.initialized = true;
  },

  kill() {
    for(let trigger of this.triggers) {
      trigger.kill();
    }
    for(let key in this) {
      if(this.hasOwnProperty(key)) delete this[key];
    }
  },

  destroy() {
    window.removeEventListener('resize', this.check);
    if(this.initialized) this.kill();
  }
})

class Meteorite {
  constructor(options) {
    this.type = options.type;
    this.speed = options.speed;
    this.position = options.position;
    this.delay = options.delay;

    setTimeout(() => {
      this.start();
    }, this.delay * 1000);
  }

  start() {
    this.$parent = document.querySelector('.sky');
    this.vector = `<svg width="300" height="245" viewBox="0 0 300 245" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path style="mix-blend-mode:screen" d="M10.9313 243.012L299.62 0.87207L2.43934 235.332C-0.490623 237.592 -0.664456 240.872 1.71925 242.912C4.20227 245.392 8.01375 245.202 10.8444 243.302L10.9313 243.012Z" fill="url(#paint0_linear)"/>
      <defs>
      <linearGradient id="paint0_linear" x1="161.828" y1="170735" x2="69306.3" y2="170735" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8788E8"/>
      <stop offset="0.12" stop-color="#7273C4"/>
      <stop offset="0.36" stop-color="#4A4A7F"/>
      <stop offset="0.57" stop-color="#2A2A48"/>
      <stop offset="0.76" stop-color="#131321"/>
      <stop offset="0.91" stop-color="#050509"/>
      <stop offset="1"/>
      </linearGradient>
      </defs>
    </svg>`

    this.$meteorite = document.createElement('div');
    this.$meteorite.classList.add('meteorite', `meteorite_type-${this.type}`);
    this.$meteorite.insertAdjacentHTML('afterbegin', this.vector);
    this.$parent.insertAdjacentElement('afterbegin', this.$meteorite);

    this.h = this.$meteorite.getBoundingClientRect().height;
    this.w = this.$meteorite.getBoundingClientRect().width;

    let x_start = (window.innerWidth + window.innerHeight) * this.position,
        y_start = Math.abs(this.$parent.getBoundingClientRect().y) - this.$meteorite.getBoundingClientRect().height;
    
    this.$meteorite.style.top = `${y_start}px`;
    this.$meteorite.style.left = `${x_start}px`;

    let y_index = Math.ceil(((window.innerHeight * 2) + this.h) / this.h),
        x_index = Math.ceil((x_start + this.w) / this.w),
        index = Math.max(y_index, x_index),
        y_end = this.h * index,
        x_end = this.w * -index;

    this.animation = gsap.timeline()
      .to(this.$meteorite, {x: x_end, y: y_end, duration: this.speed, ease:'none'})
      .eventCallback('onComplete', () => {
        this.destroy();
      })
  }

  destroy() {
    this.$meteorite.remove();
    this.animation.kill();
    for(let child in this) delete this[child];
  }
}

