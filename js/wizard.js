'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var mainPopup = document.querySelector('.setup');
  var activeSetupWizard = mainPopup.querySelector('.setup-wizard');
  var activeWizardFireball = mainPopup.querySelector('.setup-fireball');
  var activeWizardCoat = activeSetupWizard.querySelector('.wizard-coat');
  var activeWizardEyes = activeSetupWizard.querySelector('.wizard-eyes');

  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {}
  };

  var changeWizardColor = function (value, arr, cssProperty, modifiedPart) {
    var wizardValue = mainPopup.querySelector(value);
    var newColor = window.utils.getRandomValue(arr);
    modifiedPart.style = cssProperty + ':' + newColor;
    wizardValue.value = newColor;
    return newColor;
  };

  activeWizardCoat.addEventListener('click', function (evt) {
    var newColor = changeWizardColor('[name="coat-color"]', COAT_COLORS, 'fill', evt.target);
    wizard.onCoatChange(newColor);
  });

  activeWizardEyes.addEventListener('click', function (evt) {
    var newColor = changeWizardColor('[name="eyes-color"]', EYES_COLORS, 'fill', evt.target);
    wizard.onEyesChange(newColor);
  });

  activeWizardFireball.addEventListener('click', function (evt) {
    changeWizardColor('[name="fireball-color"]', FIREBALL_COLORS, 'background-color', evt.target);
  });

  window.wizard = {
    wizard: wizard
  };
})();
