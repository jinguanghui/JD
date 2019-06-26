window.onload=function(){
	timeBack();
	searchEffect();
	bannerEffect();
}

//头部搜索框效果
function searchEffect(){
	var search = document.querySelector(".jd_search");
	var banner = document.querySelector(".jd_banner");
	var bannerHeight = banner.offsetHeight;
	bannerHeight = bannerHeight/10;
	console.log(bannerHeight);
	window.onscroll=function(){
		var offTop = document.body.scrollTop+document.documentElement.scrollTop;
		console.log(offTop);
		var opacity=0;
		console.log(bannerHeight);
		if(offTop<(bannerHeight)){
		
			opacity= offTop/bannerHeight;
			search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
		}else{
			
		}
	}
}
//倒计时
function timeBack(){
	var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
	var totaltime = 4200;
	setInterval(function(){
		totaltime--;
		var h = Math.floor(totaltime/3600);
		var m = Math.floor(totaltime%3600/60);
		var s = Math.floor(totaltime%60);
		spans[0].innerHTML=Math.floor(h/10);
		spans[1].innerHTML=Math.floor(h%10);
		
		spans[3].innerHTML=Math.floor(m/10);
		spans[4].innerHTML=Math.floor(m%10);
		
		spans[6].innerHTML=Math.floor(s/10);
		spans[7].innerHTML=Math.floor(s%10);
	},1000);
}

//轮播图
function bannerEffect(){
	var banner = document.querySelector(".jd_banner");
	var imageBox = banner.querySelector(".jd_bannerImg");
//	var imgBox=banner.querySelector("ul:first-of-type");
	var first = imageBox.querySelector("li:first-of-type");
	var last = imageBox.querySelector("li:last-of-type");
	imageBox.appendChild(first.cloneNode(true));
	imageBox.insertBefore(first.cloneNode(true),imageBox.firstChild);
	
//	设置样式
//获取所有的li
	var lis = imageBox.querySelectorAll("li");
//	获取li的个数
	var count = lis.length;
//	获取banner的宽度
	var bannerWidth = banner.offsetWidth;
	imageBox.style.width = count*bannerWidth+"px";
	for (var i = 0;i<lis.length;i++) {
		lis[i].style.width = bannerWidth + "px";
	}
	
	/*定义图片索引:图片已经有一个宽度的默认偏移*/
    var index=1;
    
//	设置默认的偏移
	imageBox.style.left = -bannerWidth + "px";
	
	window.onresize = function(){
		 /*4.1.获取banner的宽度,覆盖全局的宽度值*/
		bannerWidth = banner.offsetWidth;
		imageBox.style.width = count*bannerWidth+"px";
		for (var i = 0;i<lis.length;i++) {
			lis[i].style.width = bannerWidth + "px";
		}
		imageBox.style.left = -index*bannerWidth + "px";
	}
	setInterval(function(){
		 /*5.1 变换索引*/
            index++;
            /*5.2.添加过渡效果*/
            imageBox.style.transition="left 0.5s ease-in-out";
            /*5.3 设置偏移*/
            imageBox.style.left=(-index*bannerWidth)+"px";
            setTimeout(function(){
            	if(index==count-1){
                    console.log(index);
                    index=1;
                    /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                    /*关闭过渡效果*/
                    imageBox.style.transition="none";
                    /*偏移到指定的位置*/
                    imageBox.style.left=(-index*bannerWidth)+"px";
                }
            },500);
	},2000);
}
