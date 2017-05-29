(function(){
	var datePicker={};
	/*存储返回数据*/
	var res=[];
	/*核心函数*/
	var monthL;
	datePicker.getMonthData=function( year, month ){

		if( !year || !month){
			var today=new Date();
			year=today.getFullYear();
			month=today.getMonth()+1;
		}
		monthL=month;
		/*获取上个月最后一天*/
		var lastMonthDay=new Date(year,month-1,0);
		var lastDate=lastMonthDay.getDate();
		/*最后一天是星期几*/
		var lastDateWeekDay=lastMonthDay.getDay();
		if( lastDateWeekDay===0 ){lastDateWeekDay=7};
		/*本月第一天*/
		var currentMonth=new Date(year,month-1,1);
		/*第一天星期*/
		var currentFirstDay=currentMonth.getDay();
		/*本月最后一天*/
		var currentLastMonth=new Date(year,month,0);
		var currentLastMonthDate=currentLastMonth.getDate();
		/*第一行上个月天数*/
		var vacDay=currentFirstDay-1;

		/*循环本月*/
		/*一个月可能有4周5周6周，所以循环6*/
		/*理清楚 我们想要的数据 当前月份month  当前日期date  位置pos*/
		for(var i=0;i<6*7;i++){
			var showMonth=month;
			/*当前日期在日历中位置*/
			var showIDay=i+1-vacDay;
			/*日期*/
			var showDate=showIDay;
			if( showIDay<=0 ){
				showMonth=showMonth-1;
				showDate=lastDate+showIDay;
			}else if( showIDay >currentLastMonthDate){
				showMonth=showMonth+1;
				showDate=showIDay-currentLastMonthDate;
			};
			if( showMonth===0 ){
				showMonth=12;
			}else if( showMonth===13 ){
				showMonth=1;
			}
			res.push({
				'pos':showIDay,
				'month':showMonth,
				'date':showDate
			})
		}
		return res;
	};

	/*渲染ui*/
	datePicker.bulidUi=function(year,month){
		var date=datePicker.getMonthData(year,month);
		var html='<div class="ui-datepicker-header">'+
			'<a href="javascript:void(0)" class="ui-datepicker-btn ui-datepicker-prevbtn">&lt;</a>'+
			'<a href="javascript:void(0)" class="ui-datepicker-btn ui-datepicker-nextbtn">&gt;</a>'+
			'<span class="ui-datepicker-curr-month">2016-12</span>'+
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
				'</tdead><tbody>';
		for(var i=0;i<date.length;i++){
			var today=date[i].pos;
			if( i% 7===0 ){
				html+='<tr>'
			}
			html+='<td>'+date[i].date+'</td>';
			if( i% 7 ===6 ){
				html+='</tr>'
			}
		}
		html+='</tbody></table></div>';
		return html;
	}

	datePicker.init=function($input){
		var html=datePicker.bulidUi();
		var $wrap=document.createElement('div');
		$wrap.className='ui-datepicker-wrapper';
		$wrap.innerHTML=html;
		document.body.appendChild($wrap);
		var isOpen=true;
		$input.addEventListener('click',function(event){
			if(isOpen){
				$wrap.classList.add('ui-datepicker-wrapper-show');
				var left=getPos($input).left;
				var top=getPos($input).top+$input.offsetHeight;
				$wrap.style.left=left+'px';
				$wrap.style.top=top+'px';
			}else{
				$wrap.classList.remove('ui-datepicker-wrapper-show');
			}
			isOpen=!isOpen;
		},false);
	}
	window.datePicker=datePicker;
	function getPos(domObj ){
		var left=0;
		var top=0;
		while( domObj !==null ) {
			left+=domObj.offsetLeft;
			top+=domObj.offsetTop;
			domObj=domObj.offsetParent;
		}
		return {'left':left,'top':top}
	}
})();