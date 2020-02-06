'use strict';

(function () {
  var mainPopup = document.querySelector('.setup');
  var mainPopupOpen = document.querySelector('.setup-open');
  var mainPopupClose = mainPopup.querySelector('.setup-close');
  var userNameInput = mainPopup.querySelector('.setup-user-name');
  var dialogHandle = document.querySelector('.upload');

  var onPopupEcsPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY && evt.target !== userNameInput) {
      closePopup();
    }
  };

  var openPopup = function () {
    mainPopup.style.top = '80px';
    mainPopup.style.left = '50%';
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
    if (evt.key === window.utils.ENTER_KEY) {
      openPopup();
    }
  });

  mainPopupClose.addEventListener('click', function () {
    closePopup();
  });

  mainPopupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      closePopup();
    }
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPopup.offsetTop - shift.y >= 0 && mainPopup.offsetLeft - shift.x <= window.innerWidth) {
        mainPopup.style.left = (mainPopup.offsetLeft - shift.x) + 'px';
        mainPopup.style.top = (mainPopup.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

