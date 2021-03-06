// https://github.com/jefferkim/muzhi/blob/c9cca06399eca375d6787ea120afe75ee3585a0b/js/_component/lazyload.js
/**
 * 图片延迟加载
 * @class Lazyload
 * @param selector {string} jquery selector
 * @param options {object} 可选参数
 **/
function Lazyload(selector, options){
	this.construct(selector, options)
}

Lazyload.prototype = {
	/**
	 * @method construct
	 * 构造函数
	 * @param {string} selector jquery selector
	 * @param {object} options 可选参数
	 * 	@param {number} options.threshold 预可见距离
	 *  	 默认值为100，向下向下有效
	 * 	@param {string} options.lazyAttr 需要延迟加载图片属性标识
	 *   	 默认值为init_src 
	 **/
	construct: function(selector, options){
		var self = this
		self.options = $.extend(self.defaults, options || {})

		self.lazyImgs = $(selector)
		
		self.bindEvent()

		setTimeout(function(){
			$(window).trigger('scroll')
		}, 10)
	},
	
	/**
	 * @method inViewport 是否处于可见区域
	 * @param {node} el dom element
	 * @return boolean
	 **/
	inViewport: function(el){
		var self = this
		var win = window
		var pageY = win.pageYOffset,
			btm = win.pageYOffset + win.innerHeight,
			elTop = $(el).offset().top,
			elHeight = $(el).height(),
			elBtm = elTop + elHeight

		return (elTop >= pageY && (elTop - self.options.threshold) <= btm)
			|| (elBtm >= pageY && (elBtm <= btm) )
	},
		
	/**
	 * @method bindEvent 事件绑定
	 * 将图片加载函数绑定到滚动（scroll）及屏幕翻转（orientationchange）
	 * @private
	 **/
	bindEvent: function(){
		var self = this
		$(window).on('scroll', function(){
			self.loadImgs()
		})
		$(window).on('orientationchange', function(){
        	self.loadImgs()
        })
	},

	/**
	 * @method loadImgs 加载图片
	 * @private
	 **/
	loadImgs: function(){
		var self = this
		var load = function($img, idx){
			var original = $img.attr(self.options.lazyAttr);
			$img.attr('src', original);
			
			var img = $img[0]

			if (img.onload) {
				img.onload = function () {
					$(this).removeAttr(self.options.lazyAttr)
					self['lazyImgs'][idx] = null
					this.onerror = this.onload = null
				}
				img.onerror = function () {
					$(this).removeAttr(self.options.lazyAttr)
					self['lazyImgs'][idx] = null
					this.onerror = this.onload = null
				}
			}
		}

		self['lazyImgs'].each(function (i, o) {
			var $img = $(o)
			if (!self.inViewport(o)) return
			load($img, i)
		});
	},
		
	// 默认配置
	defaults :{
		threshold:  100,
		lazyAttr: 'init_src'
	}
}
