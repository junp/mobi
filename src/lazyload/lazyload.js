// https://github.com/jefferkim/muzhi/blob/c9cca06399eca375d6787ea120afe75ee3585a0b/js/_component/lazyload.js
function Lazyload(selector, options){
	this.construct(selector, options)
}

Lazyload.prototype = {
	// 构造函数
	construct: function(selector, options){
		var self = this
		self.options = $.extend(self.defaults, options || {})

		self.lazyImgs = $(selector)
		
		self.bindEvent()

		setTimeout(function(){
			$(window).trigger('scroll')
		}, 10)
	},
	
	// 是否可见
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
		
	// 事件绑定
	bindEvent: function(){
		var self = this
		$(window).on('scroll', function(){
			self.loadImgs()
		})
		$(window).on('orientationchange', function(){
        	self.loadImgs()
        })
	},

	// 加载图片
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
