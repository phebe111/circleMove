  
	function runCircle(){
		var settings = {
			obj: 'canvasThree2',
			percent: 1
		}
		 var defaultSetting={ 
			url:'images/fire1.png',   //飞机小图地址
			obj:'',                  //场景添加的canvas id 名
			percent:1,               //圆环转动的百分比  0-1 
			 outerColor:'#61b2f0',  //外部圆环 渐变色

		  }; 
         var option=$.extend({},defaultSetting,settings); 
		
		 var imageUrl=option.url;
		 var obj=option.obj;
		 var percent=option.percent;
		 var outerColor=option.outerColor;

		 
		 var preA=Math.PI/180;
		
		var canvasC=document.getElementById(obj);
		/*控制运动*/
		var context=canvasC.getContext('2d');
		var windowW=parseInt($(canvasC).parent().width());//根据canvas父元素的宽度来设置圆圈的宽度
		var lineW0=5;
		var R0;
		var canvasW=windowW*1.5;//控制圈圈的宽度
		R0=parseInt(canvasW/2-lineW0-4);
		var ra=parseInt(canvasW/2-lineW0/2-5);
		var canvasH=canvasW;
		var rotateAngle=percent*360;

		var rotataRadians=preA*rotateAngle;
		canvasC.width = canvasW;
		canvasC.height = canvasH;

		var x=canvasC.width/2;
		var y=canvasC.height/2;
		var startAa=-Math.PI/2;
		var startA=0;
		var Timer;
		var imageAir=new Image();
		imageAir.src=imageUrl;
		imageAir.onload=CanvasApp;
		

		function CanvasApp(){

			var imgWidth=option.imgWidth||imageAir.width/2;
			var imgHeight=option.imgHeight||imageAir.height/2;
			console.log(imgWidth)
			var imgX=-imgWidth/2-2;
			 var imgY=-imgHeight/2;
			function drawScreen(){
				if(startA<rotataRadians){
					startA+=0.1;
				}

				context.setTransform(1,0,0,1,0,0);
				context.fillStyle="#ffffff";//背景颜色
				context.fillRect(0,0,canvasC.width,canvasC.height);
				context.translate(x,y);
				context.rotate(-Math.PI/2);
				//外环
				context.beginPath();
				//50,50,25,100,100,100

				context.strokeStyle = outerColor;
				context.lineWidth=lineW0;
				context.arc(0,0,R0,0,startA,false);
				context.stroke();
				context.closePath();		
			
				//画图
				if(startAa<rotataRadians-Math.PI/2){
					startAa+=0.1;
					canvasC.setAttribute("data-run","1")
				}else{
					clearInterval(Timer);
					canvasC.setAttribute("data-run","0")
				}
				context.save();
				context.setTransform(1,0,0,1,0,0);
				var ax=ra*Math.cos(startAa) ;
				var ay=ra*Math.sin(startAa) ;
				context.translate(x+ax,y+ay);
				context.rotate(startAa);
				context.drawImage(imageAir,imgX,imgY,imgWidth,imgHeight)
				context.restore();
       
			  
			}
			drawScreen();
			Timer=setInterval(drawScreen,10)//控制转圈速度的
			
			
		}
	}