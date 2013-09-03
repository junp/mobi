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
		/**
		 * silder 外容器
		 * @property container
		 * @type String
		 * @default '.slider'
		 **/
        	var container = this.container = $(this.container)
		// 容错，主容器是否存在
		if(!container.length){
			return
		}

		/**
		 * slider窗口，样式overflow需为hidden
		 * @property wrap
		 * @type String
		 **/
		var wrap = this.wrap = this.wrap && container.find(this.wrap) || container.children().first()
		// 容错
		if( !wrap.length){
			return
		}

		/**
		 * 滑动元素容器，滑动原理：通过设置该窗口样式的left属性
		 * @property panel
		 * @type String
		 **/
		var panel = this.panel && container.find(this.panel) || wrap.children.first()
		// 容错
		if(!panel.length){
			return
		}
		
		/**
		 * <ul>
		 * 	<li></li>
		 * 	<li></li>
		 * </ul>
		 * ul为panel，li为panelElements
		 **/
		this.panelElements = panel.children()
		// 容错
		if(!this.panelElements.length){
			return
		}

		/**
		 * 上一屏触点
		 * @property prevTrigger
		 * @type String
		 **/
		this.prevTrigger = this.prevTrigger && container.find(this.prevTrigger)

		/**
		 * 下一屏触点
		 * @property nextTrigger
		 * @type String
		 **/
		this.nextTrigger = this.nextTrigger && container.find(this.nextTrigger)
	},
	/***
	 * @method moveTo 移动
	 * @param index 移动第几屏
	 **/
	moveTo: function(index){
		var step = this.step,
		    wrap = this.wrap,
		    left = index * step

		wrap.css('left', left)
	},
	/**
	 * @method next 下一屏
	 *
	 **/
	next: function(){
		var self = this
		var index = this.curIndex--
		
		self.moveTo(index)
	},
	/**
	 * @method prev 上一屏
	 *
	 **/
	prev: function(){
		var self = this
		var index = this.curIndex++

		self.moveTo(index)	
	},
	/**
	 * @method first 首屏
	 **/
	first: function(){
		this.moveTo(0)       
	},
	/**
	 * @method last 最后一屏
	 **/
	last: function(){
		this.moveTo(this.maxPage)      
	},
	/**
	 * @method bindEvent 事件绑定
	 * @private
	 **/
	bindEvent: function(){
			   
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
	* 动画结束回调
	*/
	callback: null,
	/**
	* 边界样式
	*/
	activePnCls: 'none'
}
