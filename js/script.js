function Scroller(outer,inner){
  this.outer = outer;
  this.inner = inner;
  this.ease = Power2.easeOut;

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
        this.progressCopy = this.progress.value>1?1:this.progress.value;
        this.progressCopy = this.progress.value<0?0:this.progress.value;
        TweenLite.set(this.inner, { 
          y: -this.progressCopy*(this.height-this.screenHeight)
        });
        this.speed = this.lastSpeed-this.progressCopy;
        this.lastSpeed = this.progressCopy;
        console.log(this.speed);
      }.bind(this),
      ease: this.ease,
      overwrite: true
    });
}

Scroller.prototype.destroy = function(){
  $(window).off("resize");
  $(window).off("scroll");
}

var scroller = new Scroller('#scrollContainer','#scrollInner');
scroller.mount();


/*Scroller.prototype.onScroll = function(){
  if (this.resizeQueue>0) {
    this.onResize();
    this.resizeQueue--;
  }

  this.y_true = window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;
  this.y += (this.y_true - this.y) * this.ease;
  console.log(this.y_true);

  if (Math.abs(this.y_true - this.y) < 0.05 || this.resizeQueue>0) {
      this.y = this.y_true;
      this.scrollQueue = 0;
  }


  this.progress = this.y/(this.height-this.screenHeight);
  this.progress = this.progress>1?1:this.progress;
  this.progress = this.progress<0?0:this.progress;

  this.speed = -300*(this.lastSpeed-this.progress);
  this.lastSpeed = this.speed;

  TweenLite.set(this.inner, { 
    y: -this.y
  });

  this.requestId = (this.scrollQueue > 0) ? requestAnimationFrame(this.onScroll.bind(this)) : null;
}*/
/*
        var html = document.documentElement;
        var body = document.body;
        var scrollWrapper = $('#scroll-container');
        var projectsBlock = $('#projects');

        projectsHeight = projectsBlock.innerHeight();
        scrollWrapper.css('height',projectsHeight);

        var scroller = {
          target: projectsBlock,
          ease: 0.05, // <= scroll speed
          endY: 0,
          y: 0,
          resizeRequest: 0,
          scrollRequest: 0,
        };

        var requestId = null;

        updateScroller();  
        $(window).on("resize", onResize);
        $(document).on("scroll", onScroll); 

        function updateScroller() {
          var resized = scroller.resizeRequest > 0;
          if (resized) {
            h = $(window).height();
            w = $(window).innerWidth();    
            projectsHeight = projectsBlock.innerHeight();
            scrollWrapper.css('height',projectsHeight);
            scroller.resizeRequest = 0;
          }
          
          var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
          scroller.endY = scrollY;
          scroller.y += (scrollY - scroller.y) * scroller.ease;

          if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
            scroller.y = scrollY;
            scroller.scrollRequest = 0;
          }
          let progress = scroller.y/(projectsHeight-h);
          progress = progress>1?1:progress;
          progress = progress<0?0:progress;

          let speed = -300*(projectLastProgress-progress);
          skew = Math.abs(skew)<1?0:speed;
          speed = Math.abs(skew)>50?(speed/-speed)*50:speed;

          TweenLite.set(scroller.target, { 
            y: -scroller.y,
            skewY: skew
          });

          projectLastProgress = progress;
          requestId = (scrollActive && scroller.scrollRequest > 0) ? requestAnimationFrame(updateScroller) : null;
        }

        function onScroll() {
          scroller.scrollRequest++;
          if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
          }
        }

        function onResize() {
          scroller.resizeRequest++;
          if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
          }
        }*/