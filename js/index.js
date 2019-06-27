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
//	console.log(bannerHeight);
	window.onscroll=function(){
		var offTop = document.body.scrollTop+document.documentElement.scrollTop;
//		console.log(offTop);
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
	imageBox.insertBefore(last.cloneNode(true),imageBox.firstChild);
	
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
	
	 /*实现点标记*/
   var setIndicator=function(index){
       var indicators=banner.querySelector(".jd_bannerIndicator").querySelectorAll("li");
       /*先清除其它li元素的active样式*/
       for(var i=0;i<indicators.length;i++){
           indicators[i].classList.remove("active");
       }
       /*为当前li元素添加active样式*/
       indicators[index-1].classList.add("active");
   }
   var timerId ;
	var startTime = function(){
		timerId = setInterval(function(){
		 /*5.1 变换索引*/
            index++;
            /*5.2.添加过渡效果*/
            imageBox.style.transition="left 0.5s ease-in-out";
            /*5.3 设置偏移*/
            imageBox.style.left=(-index*bannerWidth)+"px";
            setTimeout(function(){
            	if(index==count-1){
//                  console.log(index);
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
	
	 startTime();
	
//	手动轮播
	var startX,moveX,distenceX;
	/*标记当前过渡效果是否已经执行完毕*/
    var isEnd=true;
	imageBox.addEventListener("touchstart",function(e){
//		console.log(e);
		clearInterval(timerId);
		startX = e.targetTouches[0].clientX;
		
	});
	imageBox.addEventListener("touchmove",function(e){
		if(isEnd=true){
			moveX = e.targetTouches[0].clientX;
			distenceX = moveX - startX;
			imageBox.style.transition = null;
			imageBox.style.left = (-index*bannerWidth + distenceX) +"px";
		}
		
	});
//	松开手指促发
	imageBox.addEventListener("touchend",function(){
		/*松开手指，标记当前过渡效果正在执行*/
        isEnd=false;
//		判断滑动的距离如果大于100像素实现翻页
		if(Math.abs(distenceX)>100){
//			console.log(distenceX);
//			向右滑动索引减一
			if(distenceX>0){
				index--;
			}else{
				index++;
			}
//			翻页,并且实现过度效果
			imageBox.style.transition="left 0.5s ease-in-out";
			imageBox.style.left = -index*bannerWidth + "px";
		}else if(Math.abs(distenceX)>0){//要保证至少有滑动
//			回弹
			imageBox.style.transition="left 0.5s ease-in-out";
			imageBox.style.left = -index*bannerWidth + "px";
		}
		startX=0;
		moveX=0;
		distenceX=0;
		startTime();
	});
	 /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
	imageBox.addEventListener("webkitTransitionEnd",function(){
//		console.log("webkitTransitionEnd"); 
		 /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
		if(index==count-1){
			index=1;
			 /*清除过渡*/
            imageBox.style.transition="none";
            /*设置偏移*/
            imageBox.style.left=-index*bannerWidth+"px";
		} else if(index==0){
            index=count-2;
            /*清除过渡*/
            imageBox.style.transition="none";
            /*设置偏移*/
            imageBox.style.left=-index*bannerWidth+"px";
        }
		 /*设置标记*/
        setIndicator(index);
		setTimeout(function(){
			isEnd=true;
			clearInterval(timerId);
			startTime();
		},2000);
	});
}
