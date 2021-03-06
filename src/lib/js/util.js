class Util {
    hasClass(ele, cls) {
        return new RegExp(cls).test(ele.className || '');
    }
    addClass(ele, cls) {
        var _pattern = new RegExp(cls);
        if (!_pattern.test(ele.className)) ele.className += ' ' + cls;
        return ele;
    }
    removeClass(ele, cls) {
        //添加对于DOM元素的判断
        if (!ele || ele.nodeType !== 1) return;
        var _pattern = new RegExp(cls);
        if (_pattern.test(ele.className || '')) ele.className = ele.className.replace(_pattern, '');
        return ele;
    }
    checkUserIds(uid) {
        return /^\d{17}(\d|x)$/.test(uid);
    }
    isLeapYear(year) {
        return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0));
    }
    connectDidiJSBridge(callback) {
        if (window.DidiJSBridge) {
            callback(DidiJSBridge);
        } else {
            document.addEventListener('DidiJSBridgeReady', function () {
                callback(DidiJSBridge);
            }, false);
        }
    }
    getQueryStr() {
        let item, key, val, res = {};
        let queryStr = window.location.search ? window.location.search.substring(1) : '';

        if (queryStr.indexOf('&') === -1 && queryStr.indexOf('=') > -1) {
            item = queryStr.split('=');
            key = decodeURIComponent(item[0]);
            val = decodeURIComponent(item[1]);
            if (key) res[key] = val || "";
            return res;
        }
        if (queryStr.indexOf('&') > -1) {
            items = queryStr.split('&');
            for (var i = 0, len = items.length; i < len; i++) {
                var index = items[i].indexOf('=');
                key = decodeURIComponent(items[i].slice(0, index)); //防止token中出现=号未转义的情况,截取字符出现错误
                val = decodeURIComponent(items[i].slice(index + 1));
                /*item = items[i].split('=');
                key = decodeURIComponent(item[0]);
                val = decodeURIComponent(item[1]);*/
                if (key) res[key] = val;
            };
            return res;
        }
    }
    each(obj, fn) {
        if (obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (false === fn.call(obj[i] || {}, i, obj[i])) break;
            }
        } else if (this.isObj(obj)) {
            for (var n in obj) {
                if (false === fn.call(obj[n] || {}, n, obj[n])) break;
            }
        }
    }
    isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    isArr(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }
    //对模块进行配置
    setConfigModule(arg_map) {
        var input_map = arg_map.input_map,
            settable_map = arg_map.settable_map,
            config_map = arg_map.config_map;
        for (var key in input_map) {
            if (input_map.hasOwnProperty(key)) {
                if (settable_map.hasOwnProperty(key)) {
                    config_map[key] = input_map[key];
                }
            } else {
                console.error('Require a key name');
            }
        }
    }
    //埋点配置
    omegaCb(name = '', obj = {}, cb = () => {}) {
        Omega.trackEvent(name, obj, cb);
    }
    isNumAndStr(str) {
        let pattern = /[^0-9a-zA-Z]/;
        return pattern.test(str);
    }
    getCurrPath() {
        return location.hash.slice(2).split('/').join('.');
    }
}
let util = new Util();

//可以使用继承来继承这些方法
class ElementSet {
    css(dom, obj) {
        if (!dom) return;
        for (let key of Object.keys(obj)) {
            dom.style[key] = obj[key];
        }
        return this;
    }
    hasClass(dom, cls) {
        return dom.classList.contains(cls);
    }
    addClass(dom, cls) {
        return dom.classList.addClass(cls);
    }
    removeClass(dom, cls) {
        return dom.classList.removeClass(cls);
    }
}

let elementSet = new ElementSet();

export {
    util,
    elementSet,
}