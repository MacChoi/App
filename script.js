const list =[
  {title:"StarCraft",img:"StarCraft/assets/images/logo/1.png",url:"StarCraft/index.html"},
  {title:"PenguinKunWars",img:"PenguinKunWars/PenguinKunWars.PNG",url:"PenguinKunWars/index.html"},
  {title:"Outrun",img:"Outrun/Outrun.PNG",url:"Outrun/index.html"},
  {title:"SF2",img:"SF2/SF2.PNG",url:"SF2/index.html"},
  {title:"Piano",img:"Piano/Piano.PNG",url:"Piano/index.html"},
  {title:"Galaga",img:"Galaga/Galaga.PNG",url:"Galaga/index.html"},
  {title:"Kungfu",img:"Kungfu/Kungfu.PNG",url:"Kungfu/index.html"},
  {title:"Bubble Bobble",img:"BB/BB.PNG",url:"BB/index.html"},
  {title:"Pang",img:"Pang/Pang.PNG",url:"Pang/index.html"},
  {title:"Tetris",img:"Tetris/Tetris.PNG",url:"Tetris/index.html"},
  {title:"Omok",img:"Omok/Omok.PNG",url:"Omok/index.html"},
  {title:"Arkanoid",img:"Arkanoid/Arkanoid.png",url:"Arkanoid/index.html"},
  {title:"TimeTimer",img:"TimeTimer/TimeTimer.PNG",url:"TimeTimer/index.html"},
  {title:"Digital Clock",img:"DigitalClock/DigitalClock.png",url:"DigitalClock/index.html"},
  {title:"Analog Clock",img:"AnalogClock/AnalogClock.png",url:"AnalogClock/index.html"},
]

const img_loding = "URL(loading.gif)";
function main(){
  var top = $("#myTop");
  var ul_list = $("#main");

  const element_top = list[0];
  const text_top ='<div onclick=location.href="'+ element_top.url +'"; class="lazyload top_title hc" style="background-size:100% 100%;'+
  'background-image:"'+img_loding+'";background-repeat:no-repeat;" data-src='+list[0].img+ '>' +
  '<a href="#">'+ element_top.title +'</a></div>';
  top.append(text_top);
  
  for (let index = 1; index < list.length; index++) {
    const element = list[index];
    const text_add = '<li><div onclick=location.href="'+ element.url +'"; class="lazyload hero" style="background-size:100% 100%;'+
    'background-image:"'+img_loding+'";background-repeat:no-repeat; " data-src='+list[index].img+ '>'+ 
    '<a href="#">'+ element.title +'</a></div></li>';
    ul_list.append(text_add);
  }
  $("div.lazyload").lazyload();

  // const text_top ='<div onclick=location.href="'+ element_top.url +'"; class="top_title hc" style="background-size:100% 100%;'+
  // 'background-image:URL('+list[0].img+'); background-repeat:no-repeat;" data-src='+list[0].img+ ';>'+
  // '<a href="#">'+ element_top.title +'</a></div>';
  // top.append(text_top);
  
  // for (let index = 1; index < list.length; index++) {
  //   const element = list[index];
  //   const text_add = '<li><div onclick=location.href="'+ element.url +'"; class="lazyload hero" style="background-size:100% 100%;'+
  //   'background-image:URL('+list[index].img+'); background-repeat:no-repeat;" data-src='+list[index].img+ ';>'+ 
  //   '<a href="#">'+ element.title +'</a></div></li>';
  //   ul_list.append(text_add);
  // }
}

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    document.getElementById('count').innerHTML;
    // Loop through all list items, and hide those who don't match the search query
    var count = 0;
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        count++;
      } else {
        li[i].style.display = "none";
      }
    }

    document.getElementById('count').innerHTML= "Search for: "   + count + " found";
}