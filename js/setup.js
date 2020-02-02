'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var mainPopup = document.querySelector('.setup');
var mainPopupOpen = document.querySelector('.setup-open');
var mainPopupClose = mainPopup.querySelector('.setup-close');
var userNameInput = mainPopup.querySelector('.setup-user-name');

var activeSetupWizard = mainPopup.querySelector('.setup-wizard');
var activeWizardFireball = mainPopup.querySelector('.setup-fireball-wrap');
var activeWizardCoat = activeSetupWizard.querySelector('.wizard-coat');
var activeWizardEyes = activeSetupWizard.querySelector('.wizard-eyes');

var changeWizardColor = function (value, arr, cssProperty, modifiedPart) {
  var wizardValue = mainPopup.querySelector(value);
  var randomValue = getRandomValue(arr);
  modifiedPart.style = cssProperty + ':' + randomValue;
  wizardValue.value = randomValue;
};

activeWizardCoat.addEventListener('click', function () {
  changeWizardColor('[name="coat-color"]', COAT_COLORS, 'fill', activeWizardCoat);
});

activeWizardEyes.addEventListener('click', function () {
  changeWizardColor('[name="eyes-color"]', EYES_COLORS, 'fill', activeWizardEyes);
});

activeWizardFireball.addEventListener('click', function () {
  changeWizardColor('[name="fireball-color"]', FIREBALL_COLORS, 'background-color', activeWizardFireball);
});

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

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizard = function () {
  var wizard = {};
  wizard.name = getRandomValue(NAMES);
  wizard.surname = getRandomValue(SURNAMES);
  wizard.coatColor = getRandomValue(COAT_COLORS);
  wizard.eyesColor = getRandomValue(EYES_COLORS);
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

renderWizards(createWizardsCollection(4));
mainPopup.querySelector('.setup-similar').classList.remove('hidden');
