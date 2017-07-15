(function(){
	var datepicker={};
	var monthDate=0;
	var $wrapper=null;
	datepicker.getMonthData = function(year , month){
		var ret =[];
		if( !year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		var firstDay=new Date(year , month-1 ,1);
		var firstDayWeekDay=firstDay.getDay();
		year = firstDay.getFullYear();
		month = firstDay.getMonth()+1;

		if(firstDayWeekDay === 0){firstDayWeekDay=7}
		var lastDayOfLastMonth = new Date(year,month-1,0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		var preMonthDayCount = firstDayWeekDay -1;
		var lastDay=new Date(year,month,0);
		var lastDate= lastDay.getDate();

		for(var i=0;i<7*6;i++){
			var date = i+1 - preMonthDayCount;
			var showDate = date;
			var thisMonth =month;
			//上一月
			if(date <= 0){
				thisMonth = month-1;
				showDate=lastDateOfLastMonth +date;
			}else if(date>lastDate){
				/*下一月*/
				thisMonth = month +1;
				showDate = showDate-lastDate;
			}
			thisMonth = thisMonth ===0 ? 12 :thisMonth===13? 1 :thisMonth;
			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			})
		}

		return {
			year: year,
			month:month,
			days:ret
		};
	}

	window.datepicker=datepicker;
	datepicker.buildUi = function(year , month){
		monthDate =datepicker.getMonthData(year,month);
		var current=true;
		var today = new Date();
		var todayYear = today.getFullYear();
		var todayMonth = today.getMonth() + 1;
		var todayDay=today.getDate();
		if(todayYear===monthDate.year && todayMonth===monthDate.month){
			current=true;
		}else{
			current=false;
		}
		var html='<div class="ui-datepicker-header">'+
			'<span  class="ui-datepicker-btn ui-datepicker-prevbtn">&lt;</span>'+
			'<span  class="ui-datepicker-btn ui-datepicker-nextbtn">&gt;</span>'+
			'<span class="ui-datepicker-curr-month">'+monthDate.year+'年 '+monthDate.month+'月</span>'+
		'</div>'+
		'<div class="ui-datepicker-body">'+
			'<table>'+
				'<thead>'+
					'<tr>'+
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
						'<th>日</th>'+
					'</tr>'+
				'</tdead>'+
				'<tbody>';
				for(var i=0;i < monthDate.days.length;i++){
					var date =monthDate.days[i];
					if(i%7 === 0 ){
						html +='<tr>';
					}
					if(current  && todayDay===date.showDate){
						html+='<td data='+date.date+' class="on">'+date.showDate + '</td>';
					}else{
						html+='<td data='+date.date+'>'+date.showDate + '</td>';
					}
					if(i%7 ===6){
						html += '</tr>'
					}
				}
				html+='</tbody>'+
			'</table>'+
		'</div>';
		return html;
	}
	datepicker.render=function(direction){
		var year ,month;
		if(monthDate){
			year =monthDate.year;
			month=monthDate.month;
		}
		if(direction ==="prev"){
			month--;
			if(month===0){
				month=12;
				year--;
			}
		}
		if(direction ==="next"){
			if(month===12 && year===(new Date()).getFullYear()){
				return;
			}
			month++;
		}
		var html=datepicker.buildUi(year ,month);
		if( !$wrapper ){
			$wrapper=document.createElement('div');
			$wrapper.className = 'ui-datepicker-wrapper';
			document.body.appendChild($wrapper);
		}
		$wrapper.innerHTML = html;
	}

	/*
	* 操作的dom
	*是否将选中的值填入dom
	*回掉函数返回日期
	*/
	datepicker.init= function($dom,flag,fn){
		flag = (typeof flag=="undefined")? true : flag;
		fn =fn|| null;
		datepicker.render();
		var isOpen =false;
		$dom.onclick=function(){
			if(isOpen){
				$wrapper.style.display="none";
				isOpen=false;
			}else{
				$wrapper.style.top=getOffsetPos($dom).top+$dom.offsetHeight+3+"px";
				$wrapper.style.left=getOffsetPos($dom).left+"px";
				$wrapper.style.display="block";
				isOpen=true;
			}
		}
		/*月份切换*/
		$wrapper.onclick=function(event){
			var event= event || window.event;
			/*上一个月*/
			if(dHasClass(event.target,"ui-datepicker-prevbtn")){
				datepicker.render("prev")
			}
			/*下一个月*/
			if(dHasClass(event.target,"ui-datepicker-nextbtn")){
				datepicker.render("next")
			}
			/*获取日期*/
			if(event.target.tagName.toLowerCase() === "td"){
				var date = new Date(monthDate.year,monthDate.month-1,event.target.getAttribute('data'));
				if(flag){
					$dom.value=format(date);
				}
				if(fn){
					fn(format(date))
				}
			}
		}

	}
	function getOffsetPos(obj){
		var top=0,
		left=0;
		while(obj.offsetParent !== null){
			top+=obj.offsetTop;
			left+=obj.offsetLeft;
			obj=obj.offsetParent;
		}
		return {
			"top":top,
			"left":left
		}
	}
	function dHasClass(obj,className){
		var reg=new RegExp(className,"g");
		var isHave=reg.test(obj.className);
		return isHave;
	}
	function format(date){
		var padding=function(num){
			return num<9?('0'+num):num;
		}
		ret='',
		ret+=date.getFullYear()+'-';
		ret+=padding(date.getMonth()+1)+'-';
		ret+=padding(date.getDate());
		return ret;
	}
})();