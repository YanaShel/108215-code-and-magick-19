'use strict';

(function () {
  var QUANTITY_WIZARD = 4;
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

  var changeWizardColor = function (value, arr, cssProperty, modifiedPart) {
    var wizardValue = mainPopup.querySelector(value);
    var randomValue = window.utils.getRandomValue(arr);
    modifiedPart.style = cssProperty + ':' + randomValue;
    wizardValue.value = randomValue;
  };

  activeWizardCoat.addEventListener('click', function (evt) {
    changeWizardColor('[name="coat-color"]', COAT_COLORS, 'fill', evt.target);
  });

  activeWizardEyes.addEventListener('click', function (evt) {
    changeWizardColor('[name="eyes-color"]', EYES_COLORS, 'fill', evt.target);
  });

  activeWizardFireball.addEventListener('click', function (evt) {
    changeWizardColor('[name="fireball-color"]', FIREBALL_COLORS, 'background-color', evt.target);
  });

  var similarListElement = mainPopup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardLabel = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    wizardLabel.textContent = wizard.name;
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY_WIZARD; i++) {
      var randomWizard = window.utils.getRandomValue(wizards);
      fragment.appendChild(renderWizard(randomWizard));
    }
    similarListElement.appendChild(fragment);
    mainPopup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var resetForm = function () {
    userNameInput.value = 'Синий Пендальф';
    activeWizardCoat.style = 'fill: #6589a4';
    activeWizardEyes.style = 'fill: black';
    activeWizardFireball.style = 'background-color: #ee4830';
  };

  var showErrorMessage = function (errorMessage) {
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
    }, showErrorMessage);
    evt.preventDefault();

  };

  window.backend.load(renderWizards, showErrorMessage);
  formMainPopup.addEventListener('submit', onFormSubmit);

})();

