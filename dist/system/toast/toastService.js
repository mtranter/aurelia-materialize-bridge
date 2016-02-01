System.register([], function (_export) {
  "use strict";

  var MdToastService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      MdToastService = (function () {
        function MdToastService() {
          _classCallCheck(this, MdToastService);
        }

        MdToastService.prototype.show = function show(message, displayLength, className) {
          return new Promise(function (resolve, reject) {
            Materialize.toast(message, displayLength, className, function () {
              resolve();
            });
          });
        };

        return MdToastService;
      })();

      _export("MdToastService", MdToastService);
    }
  };
});