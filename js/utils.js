'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var QUANTITY_WIZARDS = 4;

  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    QUANTITY_WIZARDS: QUANTITY_WIZARDS,
    getRandomValue: getRandomValue
  };
})();


