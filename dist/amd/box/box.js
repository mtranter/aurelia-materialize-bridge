define(['exports', 'aurelia-templating', 'aurelia-binding', 'aurelia-dependency-injection', '../common/attributeManager', 'materialize'], function (exports, _aureliaTemplating, _aureliaBinding, _aureliaDependencyInjection, _commonAttributeManager, _materialize) {
  'use strict';

  exports.__esModule = true;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  var MdBox = (function () {
    var _instanceInitializers = {};

    _createDecoratedClass(MdBox, [{
      key: 'caption',
      decorators: [_aureliaTemplating.bindable({
        defaultBindingMode: _aureliaBinding.bindingMode.oneTome
      })],
      initializer: null,
      enumerable: true
    }], null, _instanceInitializers);

    function MdBox(element) {
      _classCallCheck(this, _MdBox);

      _defineDecoratedPropertyDescriptor(this, 'caption', _instanceInitializers);

      this.element = element;
      this.attributeManager = new _commonAttributeManager.AttributeManager(this.element);
    }

    MdBox.prototype.attached = function attached() {
      this.attributeManager.addClasses('materialboxed');
      if (this.caption) {
        this.attributeManager.addAttributes({ 'data-caption': this.caption });
      }

      $(this.element).materialbox();
    };

    MdBox.prototype.detached = function detached() {
      this.attributeManager.removeAttributes('data-caption');
      this.attributeManager.removeClasses('materialboxed');
    };

    var _MdBox = MdBox;
    MdBox = _aureliaDependencyInjection.inject(Element)(MdBox) || MdBox;
    MdBox = _aureliaTemplating.customAttribute('md-box')(MdBox) || MdBox;
    return MdBox;
  })();

  exports.MdBox = MdBox;
});