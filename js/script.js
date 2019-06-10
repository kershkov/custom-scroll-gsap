$(window).on('load',()=>{

  function scrollUpdate(p,s){
    console.log(p);
  }

  const scroller = new Scroller('#scrollContainer','#scrollInner', { speed : 2. }, scrollUpdate);
  
});