const Utils = {};

Utils.ajax = function(url, successCallback, failCallback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        successCallback(this.responseText);
      } else {
        failCallback();
      }
    }
  };

  request.send();
  request = null;
};

Utils.merge = function(r, s) {
  this.each(s, function(v, k) {
    r[k] = v;
  });
  return r;
};

Utils.each = function(obj, fn) {
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn.call(this, obj[i], i);
    }
  }
  return obj;
};

Utils.mixin = function(dest) {
  var sources = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < sources.length; i++) {
    var src = sources[i];
    for (var key in src) {
      if (!dest[key]) {
        dest[key] = src[key];
      }
    }
  }
};

Utils.getUrlParams = function(k) {
  var params = {};
  var url = location.href;
  var idx = url.indexOf('?');

  if (idx > 0) {
    var queryStr = url.substring(idx + 1);
    var args = queryStr.split('&');
    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      var nv = args[i] = a.split('=');
      params[nv[0]] = nv.length > 1 ? nv[1] : true;
    }
  }
  return params[k];
};

Utils.width = function(el) {
  var width = el.offsetWidth;
  var style = el.currentStyle || getComputedStyle(el);

  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
};

module.exports = Utils;
