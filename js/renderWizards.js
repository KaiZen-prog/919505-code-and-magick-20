'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_QUANTITY = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var setupSimilarList = window.dialog.userDialog.querySelector('.setup-similar-list');

  var createWizards = function () {
    var array = [];

    for (var i = 0; i < WIZARD_QUANTITY; i++) {
      var wizard = {
        name: window.util.getRandom(WIZARD_NAMES) + ' ' + window.util.getRandom(WIZARD_SURNAMES),
        coatColor: window.util.getRandom(WIZARD_COAT_COLORS),
        eyeColor: window.util.getRandom(WIZARD_EYE_COLORS)
      };
      array.push(wizard);
    }
    return array;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  var wizards = createWizards();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  setupSimilarList.appendChild(fragment);

  window.dialog.userDialog.querySelector('.setup-similar').classList.remove('hidden');

  window.renderWizards = {
    colorize: function (element, type, input) {
      var color;

      switch (type) {
        case 'coat':
          color = window.util.getRandom(WIZARD_COAT_COLORS);
          break;

        case 'eye':
          color = window.util.getRandom(WIZARD_EYE_COLORS);
          break;

        case 'fireBall':
          color = window.util.getRandom(WIZARD_FIREBALL_COLORS);
          break;
      }

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }

      input.value = color;
    }
  };
})();
