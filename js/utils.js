'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var quantityWizards = 4;

  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var isEcsEvent = function (evt, action, activeElement) {
    if (evt.key === ESC_KEY && evt.target !== activeElement) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  window.utils = {
    quantityWizards: quantityWizards,
    getRandomValue: getRandomValue,
    isEcsEvent: isEcsEvent,
    isEnterEvent: isEnterEvent
  };
})();


