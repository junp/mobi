/**
 * 触摸幻灯片
 */

define(function(require, exports, module) {

    var listener = require('listener');

    var G_TOUCH_MAP = null; // TouchSlide实例MAP
    var G_CURRENT_TOUCH_SLIDE = null; // 当前TouchSlide实例
    var G_SUPPORT_TOUCH = false; // 是否支持touch
    var G_START_EVENT = ((G_SUPPORT_TOUCH = ("ontouchstart" in window)) ? "touchstart" : "mousedown"); //start事件
    var G_END_EVENT = (("ontouchend" in window) ? "touchend": "mouseup"); // end事件
    var G_MOVE_EVENT = (("ontouchmove" in window) ? "touchmove": "mousemove"); // move事件
    /**
     * @class TouchSlide 触摸幻灯片
     * @param {String} name 名称，唯一标识
     * @private
     */
    var TouchSlide = function(name) {
        this.name = name; // 名称，唯一标识
        this.fingerStartX = 0; // 手指X轴开始位置
        this.fingerStartY = 0; // 手指Y轴开始位置
        this.currentPoint = 0; // 当前位置点
        this.currentOffset = 0; // 当前偏移值
        this.right = true; // 右滑动
        this.left = false; // 左滑动
        this.up = false; // 上滑动
        this.down = false; // 下滑动
        this.changed = false; // 是否有改变
        // --------------------------------------------
        this.attributes = {
            "touch": null,
            // 缓存name属性
            "selector": null,
            // 缓存CSS选择器
            "dir": null,
            // 缓存移动方向 0：左右 1:上下
            "style": null,
            // 缓存样式属性
            "size": null,
            // 缓存每屏尺寸
            "touchsize": null,
            // 缓存滑动尺寸
            "page": null,
            // 缓存总屏数
            "shift": 0,
            // 缓存偏移值[0...1]
            "prevent": "1",
            // 缓存阻止默认行为
            "bubble": "0",
            // 缓存阻止冒泡
            "real": null,
            // 缓存真实移动节点
            "start": -1,
            // 起点位置
            "end": -1 // 结束位置
        };
        // --------------------------------------------
        this.on = {
            onstart: null,
            // 开始时的回调，{Function callback, Array args, Object
            // context}
            onmove: null,
            // 移动时的回调，{Function callback, Array args, Object
            // context}
            onend: null,
            // 结束时的回调，{Function callback, Array args, Object
            // context}
            onbefore: null,
            // 开始前的回调{Function callback, Array args, Object
            // context}
            onbeforecheck: null // 开始前校验的回调{Function callback, Array args,
            // Object context}
        };
    };
    // 方法
    TouchSlide.prototype = {
        /**
		 * @method hasAttribute 检测是否支持此属性
		 * @private
		 * @param {String} name 属性名
		 * @return {Boolean} true/false
		 */
        hasAttribute: function(name) {
            return (name in this.attributes);
        },
        /**
		 * @method setAttribute  设置属性
		 * @private
		 * @param {String} name 属性名
		 * @param {Object}  value 属性值
		 *           
		 */
        setAttribute: function(name, value) {
            if (this.hasAttribute(name)) {
                this.attributes[name] = value;
            }
        },
        /**
		 * @method  getAttribute 获取属性值
		 * @private
		 * @param {String} name 属性名
		 * @return {Object} value 属性值
		 */
        getAttribute: function(name) {
            if (this.hasAttribute(name)) {
                return this.attributes[name];
            }
            return null;
        },
        /**
		 * @method  execCallback 执行回调函数
		 * @private
		 * @param {String} type 类型
		 * @param {Array} args 消息
		 * @return {Object} result 返回值
		 */
        execCallback: function(type, args) {
            return listener.execCallback(this, type, args);
        },
        /**
		 * @method  set 设置回调
		 * @private
		 * @param {String}  type 类型
		 * @param {Function} callback 回调
		 * @param {Array} args 参数
		 * @param {Object}  context 上下文
		 */
        set: function(type, callback, args, context) {
            listener.set(this, type, callback, args, context);
        },
        /**
		 * @method remove 移除回调
		 * @private
		 * @param {String} type 类型
		 */
        remove: function(type) {
            listener.remove(this, type);
        },
        /**
		 * @method get 获取回调
		 * @private
		 * @param {String} type 类型
		 * @return {Object} 获取监听者
		 */
        get: function(type) {
            return listener.get(this, type);
        },
        /**
		 * @method clear 清除所有回调
		 * @private
		 */
        clear: function() {
            listener.clear(this);
        },
        /**
		 * @method bindStartHandler 事件监听回调函数
		 * @private
		 * @param {Event} e 事件对象
		 */
        bindStartHandler: function(e) {
            var slide = getTouchSlide(getDataValue(this, "touch"));
            G_CURRENT_TOUCH_SLIDE = slide;

            if ("1" == slide.getAttribute("prevent")) {
                e.preventDefault();
            }
            if ("0" == slide.getAttribute("bubble")) {
                e.stopPropagation();
            }

            var property = slide.getAttribute("style");
            var touch = G_SUPPORT_TOUCH ? e.targetTouches[0] : e;
            var target = G_SUPPORT_TOUCH ? this: document;

            slide.fingerStartX = touch.pageX;
            slide.fingerStartY = touch.pageY;

            // 当前层的位置
            var start = slide.getAttribute("start");
            var isSetStart = (start > -1);
            slide.currentPoint = parseInt(this.style[property] || (isSetStart ? start: 0), 10);
            slide.changed = false;
            slide.currentOffset = 0;

            // touch move
            target.addEventListener(G_MOVE_EVENT, slide.bindMoveHandler, false);
            target.addEventListener(G_END_EVENT, slide.bindEndHandler, false);

            slide.execCallback("start", [e, slide]);
        },
        /**
		 * @method touchmove 事件监听回调函数
		 * @private
		 * @param {Event} e 事件对象
		 */
        bindMoveHandler: function(e) {
            var slide = G_CURRENT_TOUCH_SLIDE;
            if ("1" == slide.getAttribute("prevent")) {
                e.preventDefault();
            }
            if ("0" == slide.getAttribute("bubble")) {
                e.stopPropagation();
            }

            var selector = slide.getAttribute("real");
            var vertical = ("1" == slide.getAttribute("dir"));
            var property = slide.getAttribute("style");
            var touch = G_SUPPORT_TOUCH ? e.targetTouches[0] : e;
            var size = slide.getRealSize("size");
            var touchsize = slide.getRealSize("touchsize");
            var scale = (size / touchsize);
            var shift = slide.getAttribute("shift");
            var half = Math.round(size * shift);
            var fingerX = touch.pageX;
            var fingerY = touch.pageY;
            var fingerStartX = slide.fingerStartX;
            var fingerStartY = slide.fingerStartY;
            var offset = vertical ? (fingerY - fingerStartY) : (fingerX - fingerStartX);
            var position = slide.currentPoint + (offset * scale);

            if (!vertical) {
                slide.left = !(slide.right = (fingerX > fingerStartX));
                slide.up = slide.down = false;
            } else {
                slide.up = !(slide.down = (fingerY > fingerStartY));
                slide.left = slide.right = false;
            }

            // console.info("start : " + fingerStartX + "; current = " + fingerX +
            // "; offset = " + offset + "; half = " + half)
            slide.changed = (Math.abs(offset) >= half);
            slide.currentOffset = position;

            slide.execCallback("move", [e, slide, position]);
            slide.turnScreen(selector, position, property);
        },
        /**
		 * @method bindEndHandler 事件监听回调函数
		 * @private
		 * @param {Event} e 事件对象
		 */
        bindEndHandler: function(e) {
            var slide = G_CURRENT_TOUCH_SLIDE;
            if ("1" == slide.getAttribute("prevent")) {
                e.preventDefault();
            }
            if ("0" == slide.getAttribute("bubble")) {
                e.stopPropagation();
            }

            var target = G_SUPPORT_TOUCH ? this: document;
            var selector = slide.getAttribute("real");
            var property = slide.getAttribute("style");
            var size = slide.getRealSize("size");
            var page = slide.getAttribute("page");
            var start = slide.getAttribute("start");
            var isSetStart = (start > -1);
            var isSetEnd = (end > -1);
            var end = slide.getAttribute("end");
            var left = parseInt(slide.currentOffset || (isSetStart ? start: 0), 10);
            var max = size * Math.max(page - 1, 0);
            var endPoint = Math.abs(left);
            var mod = Math.abs(endPoint % size);
            var offset = 0;

            max = (isSetStart ? max - start: max);

            if (slide.changed) {
                if (slide.right || slide.down) { // turn right/down
                    offset = 0;
                    var _tmp = (isSetStart ? start: 0);
                    if (left <= _tmp) {
                        offset = endPoint - mod;

                        if (left > 0) {
                            offset = Math.max(offset, _tmp);
                        } else {
                            offset = Math.min( - offset, _tmp);
                        }
                    } else {
                        offset = _tmp;
                    }
                } else { // turn left/up
                    offset = endPoint + (size - mod);

                    if (left > 0) {
                        offset = Math.min(offset, 0);
                    } else {
                        offset = Math.max( - offset, (isSetEnd ? end: -max));
                    }
                }
            } else {
                offset = slide.currentPoint;
            }

            slide.execCallback("end", [e, slide, offset]);
            slide.turnScreen(selector, offset, property);

            // 移除监听事件
            target.removeEventListener(G_MOVE_EVENT, slide.bindMoveHandler, false);
            target.removeEventListener(G_END_EVENT, slide.bindEndHandler, false);
        },
        /**
		 * @method turnScreen 翻屏
		 * @private
		 * @param {String} selector 选择器
		 * @param {Number} _offset 偏移值
		 * @param {String} property CSS属性名
		 */
        turnScreen: function(selector, _offset, property) {
            var _slide = getNode(selector);
            _slide.style[property] = _offset + 'px';
            _slide = null;
        },
        /**
		 * @method getRealSize 获取真实尺寸
		 * @private
		 * @param {String} attr 属性
		 * @return {Number} size 整形
		 */
        getRealSize: function(attr) {
            var size = this.getAttribute(attr);
            var vp = this.getViewportSize();

            if ("device-width" == size) {
                size = vp.innerWidth;
            } else if ("device-height" == size) {
                size = vp.innerHeight;
            }

            vp = null;
            return parseInt(size, 10);
        },

        /**
		 * @method getViewportSize 获取视窗尺寸
		 * @private
		 * @return {Object} int innerWidth, int outerWidth, int innerHeight, int
		 *         outerHeight
		 */
        getViewportSize: function() {
            var win = window;
            return {
                innerWidth: win.innerWidth,
                innerHeight: win.innerHeight,
                outerWidth: win.outerWidth,
                outerHeight: win.outerHeight
            };
        },

        /**
		 * @method setTouchSlideAttrs 设置触摸幻灯片属性
		 * @private
		 * example: <tag data-touch="name" data-real="selector" data-style="marginLeft"
		 * data-dir="0" data-size="200" data-data-touchsize="device-width"
		 * data-page="3" data-shift="0" data-prevent="1" data-bubble="0"
		 * data-start="0" data-end="-1"></tag> data-touch := name
		 * TouchSlide实例名称，由程序自动设置 data-real := selector 真正需要控制，没有时为本身 data-style := ""
		 * 样式属性 data-dir := 0 方向 data-size := [n|device-width|device-height] 一屏尺寸
		 * data-touchsize := [n|device-width|device-height] 滑动尺寸 data-page := 1 屏数
		 * data-shift := 0 偏移多少进行移动[0...1]之间 data-prevent := 1 是否阻止默认行为 data-bubble :=
		 * 0 是否阻止冒泡 data-start := -1 起始位置，小于0时为0. data-end := -1 结束位置，小于0时不起作用
		 * @param {String}  selector css选择符
		 */
        setTouchSlideAttrs: function(selector) {
            var o = getNode(selector);

            this.setAttribute("touch", this.name);
            this.setAttribute("selector", selector);
            this.setAttribute("real", getDataValue(o, "real") || selector);
            this.setAttribute("dir", getDataValue(o, "dir") || "0");
            this.setAttribute("style", getDataValue(o, "style") || "marginLeft");
            this.setAttribute("size", getDataValue(o, "size"));
            this.setAttribute("touchsize", getDataValue(o, "touchsize") || this.getAttribute("size"));
            this.setAttribute("page", parseInt(getDataValue(o, "page") || 1, 10));
            this.setAttribute("prevent", getDataValue(o, "prevent") || "1");
            this.setAttribute("bubble", getDataValue(o, "bubble") || "0");
            this.setAttribute("shift", parseFloat(getDataValue(o, "shift") || 0, 10));
            this.setAttribute("start", parseInt(getDataValue(o, "start") || -1, 10));
            this.setAttribute("end", parseInt(getDataValue(o, "end") || -1, 10));

            o = null;
        },
        /**
		 * @method bind 绑定
		 * @private
		 * @param {String} selector 选择器
		 */
        bind: function(selector) {
            var o = getNode(selector);
            if (null != o) {
                this.execCallback("before", [o]);

                // 设置相关属性
                this.setTouchSlideAttrs(selector);

                o.setAttribute("data-touch", this.name);

                var check = this.get("beforecheck");
                var page = this.getAttribute("page");

                if (page > 1 && // 个数大于1
                (null == check || // 没有设置beforecheck
                (null != check && true !== check.returnValue) || // 没有设置returnValue属性或returnValue属性不为true
                (null != check && this.execCallback("beforecheck", [o])) // 有设置beforecheck并且条件为真
                )) {
                    o.addEventListener(G_START_EVENT, this.bindStartHandler, false);
                }
            }
            o = null;
        },

        /**
		 * @method destory 销毁对象
		 */
        destory: function() {
            G_TOUCH_MAP[this.name] = null;
        }
    }; // end TouchSlide

     /**
     * @method getDataValue 获取节点属性或自定义属性
     * @private
     * @param {String|Node} node 选择器或节点
     * @param {String} attr 属性或自定义属性key
     * @return {String} val 值，不存在时返回null
     */
    function getDataValue(node, attr){
        var n = getNode(node);
        var val = null;
        var dataset = null;
        
        if(null != n){
            dataset = (n.dataset || {});
            val = (dataset[attr] || n.getAttribute(attr) || n.getAttribute("data-" + attr));
        }
        
        n = null; dataset = null; 
        
        return val;
    }
    
    /**
	 * @method getNode 获取节点对象
	 * @private
	 * @param {Node|String} node
	 * @return {Node} node
	 */
    function getNode(node) {
        if (typeof(node) == "string") {
            return document.querySelector(node);
        }
        return node;
    }
    
    /**
	 * @method getTouchSlide 获取TouchSlide实例
	 * @private
	 * @param {String} name 实例名称
	 * @param {Boolean} create 在不存在时是否创建新的一个新的实例
	 * @return {TouchSlide} slide 返回触摸幻灯片实例
	 */
    function getTouchSlide(name, create) {
        var instance = null;
        G_TOUCH_MAP = G_TOUCH_MAP || {};
        if (true === create) {
            if (!G_TOUCH_MAP[name]) {
                instance = G_TOUCH_MAP[name] = new TouchSlide(name);
            } else {
                instance = G_TOUCH_MAP[name];
            }
        } else {
            instance = (G_TOUCH_MAP[name] || null);
        }
        return instance;
    }
    
    return {
    		getInstance : function(name){
    			var instance = null;
                if(!name || typeof(name) != "string"){
                   return {};
                }else{
                    instance = getTouchSlide(name, true);

                    //方法注册
                    return {
                        /**
                         * @method set 设置回调
                         * @param {String} type
                         * @param {Function} callback
                         * @param {Array} args 参数
                         * @param {Object} context 上下文
                         */
                        "set" : function(type, callback, args, context){instance.set(type, callback, args, context);},
                        /**
                         * @method get 获取回调
                         * @param {String} type 
                         */
                        "get" : function(type){return instance.get(type);},
                        /**
                         * @method remove  移除回调
                         * @param {String} type 
                         */
                        "remove" : function(type){instance.remove(type);},
                        /**
                         * @method clear 清除所有回调
                         */
                        "clear" : function(){instance.clear();},
                        /**
                         * @method bind 绑定
                         * @param {String} document.querySelector 
                         */
                        "bind" : function(selector){instance.bind(selector);},
                        /**
                         * @method destory 销毁TouchSlide实例
                         */
                        "destory" : function(){instance.destory();}
                    };
                }
    		}
    }
});