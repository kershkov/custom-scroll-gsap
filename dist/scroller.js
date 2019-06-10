/*function Scroller(outer,inner , onUpdate){
  this.outer = outer;
  this.inner = inner;
  this.ease = Power2.easeOut;

  this.onUpdate = onUpdate?onUpdate:function(){};

  this.y = 0;

  this.height = 0;
  this.screenHeight = 0;

  this.speed = 0;
  this.lastSpeed = 0;

  this.progress = {};
  this.progress.value = 0;
  this.progressCopy = 0;

  this.html = document.documentElement;
  this.body = document.body;
}

Scroller.prototype.mount = function(){
  this.outer = $(this.outer);
  this.inner = $(this.inner);

  this.y =  window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;

  this.screenHeight = $(window).height();
  this.height = this.inner.innerHeight();
  this.outer.css('height',this.height);

  $(window).on("resize", this.onResize.bind(this));
  $(window).on("scroll", this.onScroll.bind(this));
}

Scroller.prototype.onResize = function(){
  this.screenHeight = $(window).height();
  this.height = this.inner.innerHeight();
  this.outer.css('height',this.height);
}

Scroller.prototype.onScroll = function(){
    this.y = window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;
    TweenMax.to(this.progress, 1.5, { 
      value:  this.y/(this.height-this.screenHeight),
      onUpdate: function(){
        TweenLite.set(this.inner, { 
          y: -this.progress.value*(this.height-this.screenHeight)
        });
        this.speed = this.lastSpeed-this.progress.value;

        this.onUpdate(this.progress.value,this.speed);

        this.lastSpeed = this.progress.value;
      }.bind(this),
      ease: this.ease
    });
}

Scroller.prototype.destroy = function(){
  $(window).off("resize");
  $(window).off("scroll");
}*/


class Scroller{
  constructor(outer,inner,options,onUpdate){
    this.outer = outer;
    this.inner = inner;
    
    this.ease = options.ease?options.ease:Power2.easeOut;
    this.speed = options.speed?options.speed:1.5;


    this.onUpdate = onUpdate?onUpdate:()=>{};

    this.y = 0;

    this.height = 0;
    this.screenHeight = 0;

    this.speed = 0;
    this.lastProgress = 0;

    this.progress = {};
    this.progress.value = 0;
    this.progressCopy = 0;

    this.html = document.documentElement;
    this.body = document.body;    

    this.build();
  }

  build(){
    this.outer = $(this.outer);
    this.inner = $(this.inner);

    this.y =  window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;

    this.screenHeight = $(window).height();
    this.height = this.inner.innerHeight();
    this.outer.css('height',this.height);

    $(window).on("resize", this.onResize.bind(this));
    $(window).on("scroll", this.onScroll.bind(this));
  }

  onResize(){
    this.screenHeight = $(window).height();
    this.height = this.inner.innerHeight();
    this.outer.css('height',this.height);
  }

  onScroll(){
    this.y = window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;
    TweenMax.to(this.progress, 1.5, { 
      value:  this.y/(this.height-this.screenHeight),
      onUpdate: ()=>{
        TweenLite.set(this.inner, { 
          y: -this.progress.value*(this.height-this.screenHeight)
        });
        this.speed = this.lastSpeed-this.progress.value;

        this.onUpdate(this.progress.value,this.speed);

        this.lastProgress = this.progress.value;
      },
      ease: this.ease
    });
  }

  destroy(){
    $(window).off("resize");
    $(window).off("scroll");
  }
}
