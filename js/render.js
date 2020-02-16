'use strict';

(function () {
  var QUANTITY_WIZARD = 4;
  var mainPopup = document.querySelector('.setup');
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

  var renderWizards = function (data) {
    var takeNumber = data.length > QUANTITY_WIZARD ? QUANTITY_WIZARD : data.length;
    similarListElement.textContent = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }
    mainPopup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    renderWizards: renderWizards
  };
})();
