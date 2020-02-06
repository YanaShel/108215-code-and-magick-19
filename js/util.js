'use strict';

(function () {
  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.util = {
    getRandomValue: getRandomValue
  };
})();


