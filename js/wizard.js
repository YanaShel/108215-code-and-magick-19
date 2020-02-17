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

  activeWizardCoat.addEventListener('click', function (evt) {
    var wizardValue = mainPopup.querySelector('[name="coat-color"]');
    var newColor = window.utils.getRandomValue(COAT_COLORS);
    evt.target.style.fill = newColor;
    wizardValue.value = newColor;
    wizard.onCoatChange(newColor);
  });

  activeWizardEyes.addEventListener('click', function (evt) {
    var wizardValue = mainPopup.querySelector('[name="eyes-color"]');
    var newColor = window.utils.getRandomValue(EYES_COLORS);
    evt.target.style.fill = newColor;
    wizardValue.value = newColor;
    wizard.onEyesChange(newColor);
  });

  activeWizardFireball.addEventListener('click', function (evt) {
    var wizardValue = mainPopup.querySelector('[name="fireball-color"]');
    var newColor = window.utils.getRandomValue(FIREBALL_COLORS);
    evt.target.style.backgroundColor = newColor;
    wizardValue.value = newColor;
  });

  window.wizard = wizard;
})();
