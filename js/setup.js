'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var mainPopup = document.querySelector('.setup');
  var activeSetupWizard = mainPopup.querySelector('.setup-wizard');
  var activeWizardFireball = mainPopup.querySelector('.setup-fireball-wrap');
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

  var createWizard = function () {
    var wizard = {};
    wizard.name = window.utils.getRandomValue(NAMES);
    wizard.surname = window.utils.getRandomValue(SURNAMES);
    wizard.coatColor = window.utils.getRandomValue(COAT_COLORS);
    wizard.eyesColor = window.utils.getRandomValue(EYES_COLORS);
    return wizard;
  };

  var createWizardsCollection = function (count) {
    var wizards = [];
    for (var i = 0; i < count; i++) {
      wizards.push(createWizard());
    }
    return wizards;
  };

  var similarListElement = mainPopup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardLabel = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    wizardLabel.textContent = wizard.name + ' ' + wizard.surname;
    wizardCoat.style.fill = wizard.coatColor;
    wizardEyes.style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  renderWizards(createWizardsCollection(window.utils.quantityWizards));
  mainPopup.querySelector('.setup-similar').classList.remove('hidden');
})();

