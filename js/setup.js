'use strict';

(function () {
  var TIMEOUT_IN_MS = 5000;

  var mainPopup = document.querySelector('.setup');
  var formMainPopup = mainPopup.querySelector('.setup-wizard-form');
  var activeSetupWizard = mainPopup.querySelector('.setup-wizard');
  var userNameInput = mainPopup.querySelector('.setup-user-name');
  var activeWizardFireball = mainPopup.querySelector('.setup-fireball');
  var activeWizardCoat = activeSetupWizard.querySelector('.wizard-coat');
  var activeWizardEyes = activeSetupWizard.querySelector('.wizard-eyes');

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (second, first) {
    switch (true) {
      case second > first:
        return 1;
      case second < first:
        return -1;
      default:
        return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderWizards(wizards.sort(function (second, first) {
      var rankDiff = getRank(first) - getRank(second);
      if (rankDiff === 0) {
        rankDiff = namesComparator(second.name, first.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.wizard.onEyesChange = window.utils.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.wizard.onCoatChange = window.utils.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var resetForm = function () {
    userNameInput.value = 'Синий Пендальф';
    activeWizardCoat.style = 'fill: #6589a4';
    activeWizardEyes.style = 'fill: black';
    activeWizardFireball.style = 'background-color: #ee4830';
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(removeErrorMessage, TIMEOUT_IN_MS);
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    document.body.removeChild(errorMessage);
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(formMainPopup), function () {
      mainPopup.classList.add('hidden');
      resetForm();
    }, onErrorLoad);
    evt.preventDefault();

  };

  window.backend.load(onSuccessLoad, onErrorLoad);
  formMainPopup.addEventListener('submit', onFormSubmit);

})();
