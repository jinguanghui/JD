window.onload=function(){
//	timeBack();
	searchEffect();
}

//头部搜索框效果
function searchEffect(){
	var search = document.querySelector(".jd_search");
	var banner = document.querySelector(".jd_banner");
	var bannerHeight = banner.offsetHeight;
//	console.log(h);
	window.onscroll=function(){
		var offsetTop =  document.body.scrollTop;
		console.log(offsetTop);
		if(offsetTop<bannerHeight){
			var opacity= offsetTop/bannerHeight;
			search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
		}
	}
}
//倒计时
//function timeBack(){
//	var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
//	var totaltime = 1*60*60;
//	setInterval(function(){
//		totaltime--;
//		var h = Math.floor(totaltime/3600);
//		var m = Math.floor(totaltime%3600/60);
//		var s = Math.floor(totaltime%60);
//		spans[0].innerHTML=Math.floor(h/10);
//		spans[1].innerHTML=Math.floor(h%10);
//		
//		spans[3].innerHTML=Math.floor(m/10);
//		spans[4].innerHTML=Math.floor(m%10);
//		
//		spans[6].innerHTML=Math.floor(s/10);
//		spans[7].innerHTML=Math.floor(s%10);
//	},1000);
//}
