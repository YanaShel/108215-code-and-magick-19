'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var mainPopup = document.querySelector('.setup');
  var mainPopupOpen = document.querySelector('.setup-open');
  var mainPopupClose = mainPopup.querySelector('.setup-close');
  var userNameInput = mainPopup.querySelector('.setup-user-name');

  var onPopupEcsPress = function (evt) {
    if (evt.key === ESC_KEY) {
      if (evt.target !== userNameInput) {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    mainPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEcsPress);
  };

  var closePopup = function () {
    mainPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEcsPress);
  };

  mainPopupOpen.addEventListener('click', function () {
    openPopup();
  });

  mainPopupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  mainPopupClose.addEventListener('click', function () {
    closePopup();
  });

  mainPopupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });
})();

