function Lazyload(conf){
	
}

Lazyload.prototype = {
	// 构造函数
	construct: function(){},
	
	// 是否可见
	inViewport: function(el, threshod){
		var win = window
		var pageY = win.pageYOffset,
			btm = win.pageYOffset + win.innerHTML,
			elTop = $(el).offset().top

		return elTop >= top && elTop + (threshold || -100) <= btm
	},
		
	// 默认配置
	defaults :{
		
	}
}