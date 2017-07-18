# JScomponent
这是一个日期组件  
[预览](http://htmlpreview.github.io/?https://github.com/YMBo/JScomponent/blob/master/datePicker/index.html)  

![logo](https://github.com/YMBo/JScomponent/blob/master/datePicker/datePicker.png)  
  
  
添加填充表单、回调函数、和标记当前日期功能,优化日历显示位置可能存在偏差问题  
********
#### 使用方法  
* 三个参数  
* 1.原声dom对象，如果想传入jq获取的节点可以将jq节点转换为原声dom对象
* 2.boolean值，点击日期后是否将选中日期填入obj (一般用于obj为input情况下)  
* 3.fn 回调函数，点击日期返回选中的日期  
```javascript
<script>
	datepicker.init(obj,flag,fn);
</script>
```
例：  
```javascript
<script>
	datepicker.init(document.getElementById('inp'),false,function(data){
		alert(data)
	});
</script>
```  
[查看](http://htmlpreview.github.io/?https://github.com/YMBo/JScomponent/blob/master/datePicker/index.html) 
