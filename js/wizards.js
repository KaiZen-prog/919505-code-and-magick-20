'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_QUANTITY = 4;

  var userDialog = document.querySelector('.setup');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupSimilarList = userDialog.querySelector('.setup-similar-list');

  var handler = function (data) {
    var wizards = window.utils.getRandomArrayElementsCollection(data, WIZARD_QUANTITY);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(customizeWizard(wizards[i]));
    }
    setupSimilarList.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var removeSimilar = function () {
    var similarWizards = userDialog.querySelectorAll('.setup-similar-item');

    for (var i = 0; i < similarWizards.length; i++) {
      similarWizards[i].remove();
    }
  };

  var colorize = function (element, type, input) {
    var color;

    switch (type) {
      case 'coat':
        color = window.utils.getRandomArrayElement(WIZARD_COAT_COLORS);
        break;

      case 'eye':
        color = window.utils.getRandomArrayElement(WIZARD_EYE_COLORS);
        break;

      case 'fireBall':
        color = window.utils.getRandomArrayElement(WIZARD_FIREBALL_COLORS);
        break;
    }

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    input.value = color;
  };

  var customizeWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.wizards = {
    handler: handler,
    removeSimilar: removeSimilar,
    colorize: colorize
  };
})();
