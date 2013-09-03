//https://github.com/pushiming/sea-module-marketing-slider/blob/master/lib/touchSlider.js
/**
* @class TouchSlider
* @param {String} container 容器
* @param {Objects} options 配置
*/
function TouchSlider(container, options){
	if (!container){
		return null
	}

	if (options){
		options.container = container
	}
	else{
		options = typeof container === 'string' ? { container: container} : container
	}

	$.extend(this, TouchSlider.defaults, options)

	
}

TouchSlider.prototype = {
	construct: function(){
		var container = this.container = $(this.container)
		// 容错，主容器是否存在
		if(!container.length){
			return
		}

		var wrap = this.wrap = this.wrap && container.find(this.wrap) || container.children().first()
		// 容错
		if( !wrap.length){
			return
		}

		var panel = this.panel && container.find(this.panel) || wrap.children.first()
		// 容错
		if(!panel.length){
			return
		}

		this.panels = panel.children()
		// 容错
		if(!this.panels.length){
			return
		}

		this.trigger = this.trigger && container.find(this.trigger)
		this.prev = this.prev && container.find(this.prev)
		this.next = this.next && container.find(this.next)
	}
}

TouchSlider.defaults = {
	/**
	* 大容器
	*/
	container: '.slider',
	wrap: null,
	panel: null,
	/**
	* 触发元素
	*/
	trigger: null,
	/**
	* 当前激活元素样式
	*/
	activeTriggerCls: 'sel',
	/**
	* 触发事件
	*/
	hasTrigger: false,
	/**
	* 步长
	*/
	steps: 0, 
	/**
	* panel 初始x坐标
	*/
	left: 0,
	/**
	* 每次划动几个panels
	*/
	visible: 1,
	/**
	* 面板子元素间距
	*/
	margin: 0,
	/**
	* 初始化在哪个panel 
	*/
	curIndex: 0,
	/**
	* 动画持续时间
	*/
	curation:300,
	/**
	* 动画循环
	*/
	loop: false,
	/**
	* 动画自动播放
	*/
	autoPlay: false,
	/**
	* 播放间隔时间
	*/
	interval: 5000,
	/**
	* 延时加载图片属性
	*/
	lazy: '.lazyimg',
	/**
	* 默认加载第几屏
	*/
	lazyIndex: 1,
	/**
	* 动画结束回调
	*/
	callback: null,
	/**
	* 上一页
	*/
	prev: null,
	/**
	* 下一页
	*/
	next: null,
	/**
	* 边界样式
	*/
	activePnCls: 'none'
}