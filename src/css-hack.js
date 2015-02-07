/**
 * @class
 */
var CssHack = function(isImportant) {
  var _id = (+new Date() + Math.floor(Math.random() * 9999999999999)).toString(36);
  isImportant = isImportant || false;

  // settings
  this._commonIdentifier = 'id__' + _id;
  this._className = 'class__' + _id;
  this._props = {};
  this._isImportant = isImportant;
};
CssHack.prototype = {
  _generateCssString: function() {
    var _props = this._props;
    if (Object.keys(_props).length < 1) {
      return null;
    }
    var cssString = '';
    for (var key in _props) {

      var _prop = _props[key];
      cssString += '.';
      cssString += this._className;
      if (key != 'default') {
        cssString += ':';
        cssString += key;
      }
      cssString += '{';
      _prop.forEach(function(item) {
        cssString += item.css;
      });
      cssString += '}'
    }
    return cssString;
  },
  /**
   * style set to DOM
   */
  _createTextNode: function() {
    var scope = this;
    var nodes = document.querySelectorAll('.' + this._commonIdentifier);
    var l = nodes.length;
    if (l > 0) {
      for (var i = 0; i < l; i++) {
        document.head.removeChild(nodes[i]);
      }
    }
    var style = document.createElement('style');
    style.className = this._commonIdentifier;
    style.appendChild(document.createTextNode(scope._generateCssString()));
    document.getElementsByTagName('head')[0].appendChild(style);
  },
  /**
   * setter for css property
   * @param {string} name
   * @param {string} value
   * @param {string} pseudoType
   */
  setProp: function(obj) {
    var scope = this;

    var name  = obj.name || null;
    var value = obj.value || null;
    var _pseudoType = obj.pseudoType || 'default';
    if (!name || !value) {
      throw new Error('Property is not defined');
    }

    var prop = {};
    prop['name']  = name;
    prop['value'] = value;
    (scope._isImportant) && (prop['value'] += ' !important')
    prop['pseudoType']  = _pseudoType;
    prop['css']   = prop['name'] + ':' + prop['value'] + ';';
    // console.log('add prop', prop);

    // if has no property
    (!scope._props[_pseudoType]) && (scope._props[_pseudoType] = []);

    if (scope._props[_pseudoType].length < 1) {
      scope._props[_pseudoType].push(prop);
    } else {
      scope._props[_pseudoType].forEach(function(item, index) {
        if (item.name === prop.name) {
          scope._props[_pseudoType][index] = prop;
        } else {
          scope._props[_pseudoType].push(prop);
        }
      });
    }
    
    this._props = scope._props;
  },
  setProps: function(arr) {
    var scope = this;
    arr.forEach(function(item, index) {
      scope.setProp({
        pseudoType  : item.pseudoType || 'default',
        name  : item.name,
        value : item.value
      });
    });
  },
  /**
   * style reflects to DOM
   * @param  {array} nodes
   */
  reflectByNodes: function(nodes) {
    console.log(nodes);
    var l = nodes.length;
    var className = this._className;
    if (l < 1) {
      return null;
    }
    // add style to DOM
    this._createTextNode();

    // add class to each nodes
    for (var i = 0; i < l; i++) {
      if (nodes[i].className.indexOf(className) === -1) {
        nodes[i].className = nodes[i].className + ' ' + className;
      }
    }
  },
  resetAll: function() {
    var nodes = document.querySelectorAll('.' + this._commonIdentifier);
    var l = nodes.length;
    if (l > 0) {
      for (var i = 0; i < l; i++) {
        document.head.removeChild(nodes[i]);
      }
    }
    var doms = document.querySelectorAll('.' + this._className);
    var len = doms.length;
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        doms[i].className = doms[i].className.replace(this._className, '');
      }
    }
  }
};

