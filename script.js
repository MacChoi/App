const list =[
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
  {title:"최신 업데이트",img:"http://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/s1600/howways-logo2-94x94.png",url:"http://daum.net"},
 
]

const img_loding = "URL(loading.gif)";
function main(){
  var top = $("#myTop");
  var ul_list = $("#main");

  const element_top = list[0];
  const text_top ='<div onclick=location.replace("'+ element_top.url +'"); class="lazyload top_title hc" style="background-size:cover;'+
  'background-image:'+img_loding+'; background-repeat:no-repeat;" data-src='+list[0].img+ ';>' +
  '<a href="#">'+ element_top.title +'</a></div>';
  top.append(text_top);
  
  for (let index = 1; index < list.length; index++) {
    const element = list[index];
    const text_add = '<li><div onclick=location.replace("'+ element.url +'"); class="lazyload hero" style="background-size:cover;'+
    'background-image:'+img_loding+'; background-repeat:no-repeat;" data-src='+list[index].img+ ';>'+ 
    '<a href="#">'+ element.title +'</a></div></li>';
    ul_list.append(text_add);
  }
  $("div.lazyload").lazyload();
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