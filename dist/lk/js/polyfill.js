(function(e) {
  var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
  !matches ? (e.matches = e.matchesSelector = function matches(selector) {
    var matches = document.querySelectorAll(selector);
    var th = this;
    return Array.prototype.some.call(matches, function(e) {
      return e === th;
    });
  }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

// closest
(function() {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

// forEach
(function() {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
})();

// ClassList
// Источник: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
(function() {
  // helpers
  var regExp = function(name) {
    return new RegExp('(^| )'+ name +'( |$)');
  };
  var forEach = function(list, fn, scope) {
    for (var i = 0; i < list.length; i++) {
      fn.call(scope, list[i]);
    }
  };

  // class list object with basic methods
  function ClassList(element) {
    this.element = element;
  }

  ClassList.prototype = {
    add: function() {
      forEach(arguments, function(name) {
        if (!this.contains(name)) {
          this.element.className += ' '+ name;
        }
      }, this);
    },
    remove: function() {
      forEach(arguments, function(name) {
        this.element.className =
          this.element.className.replace(regExp(name), '');
      }, this);
    },
    toggle: function(name) {
      return this.contains(name)
        ? (this.remove(name), false) : (this.add(name), true);
    },
    contains: function(name) {
      return regExp(name).test(this.element.className);
    },
    // bonus..
    replace: function(oldName, newName) {
      this.remove(oldName), this.add(newName);
    }
  };

  // IE8/9, Safari
  if (!('classList' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'classList', {
      get: function() {
        return new ClassList(this);
      }
    });
  }

  // replace() support for others
  if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
    DOMTokenList.prototype.replace = ClassList.prototype.replace;
  }
})();