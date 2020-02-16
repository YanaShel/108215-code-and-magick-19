'use strict';

(function () {
  var TIMEOUT_IN_MS = 5000;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

  var namesComparator = function (first, second) {
    switch (true) {
      case first > second:
        return 1;
      case first < second:
        return -1;
      default:
        return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderWizards(wizards.sort(function (first, second) {
      var rankDiff = getRank(second) - getRank(first);
      if (rankDiff === 0) {
        rankDiff = namesComparator(first.name, second.name);
      }
      return rankDiff;
    }));
  };

  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var changeWizardColor = function (value, arr, cssProperty, wizardElement) {
    var wizardValue = mainPopup.querySelector(value);
    var newColor = window.utils.getRandomValue(arr);
    wizardElement.style = cssProperty + ':' + newColor;
    wizardValue.value = newColor;
    return newColor;
  };

  activeWizardCoat.addEventListener('click', function (evt) {
    coatColor = changeWizardColor('[name="coat-color"]', COAT_COLORS, 'fill', evt.target);
    updateWizards();
  });

  activeWizardEyes.addEventListener('click', function (evt) {
    eyesColor = changeWizardColor('[name="eyes-color"]', EYES_COLORS, 'fill', evt.target);
    updateWizards();
  });

  activeWizardFireball.addEventListener('click', function (evt) {
    changeWizardColor('[name="fireball-color"]', FIREBALL_COLORS, 'background-color', evt.target);
  });

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
