'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

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

var similarListElement = document.querySelector('.setup-similar-list');
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


