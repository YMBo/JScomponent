# JScomponent
这是一个日期组件  
[预览](http://htmlpreview.github.io/?https://github.com/YMBo/JScomponent/blob/master/datePicker/index.html)  
添加了填充表单、回调函数、和标记当前日期功能  
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
