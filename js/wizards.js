'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARD_QUANTITY = 4;

  var userDialog = document.querySelector('.setup');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupSimilarList = userDialog.querySelector('.setup-similar-list');

  var wizards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyeColor = 'black';

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyeColor) {
      rank += 1;
    }

    return rank;
  };

  // Сортируем загруженных с сервера магов по похожести на основного
  var updateWizards = window.debounce(function () {
    render(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  });

  var render = function (uniqueWizards) {

    if (uniqueWizards.length > MAX_WIZARD_QUANTITY) {
      uniqueWizards.length = MAX_WIZARD_QUANTITY;
    }

    setupSimilarList.innerHTML = '';

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < uniqueWizards.length; i++) {
      fragment.appendChild(colorize(uniqueWizards[i]));
    }
    setupSimilarList.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  // Стилизация собственного мага
  var customize = function (element, type, input) {
    var color;

    switch (type) {
      case 'coat':
        color = window.utils.getRandomArrayElement(WIZARD_COAT_COLORS);
        coatColor = color;
        break;

      case 'eye':
        color = window.utils.getRandomArrayElement(WIZARD_EYE_COLORS);
        eyeColor = color;
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

    updateWizards();
  };

  // Стилизация похожих магов
  var colorize = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var removeSimilar = function () {
    var similarWizards = userDialog.querySelectorAll('.setup-similar-item');

    for (var i = 0; i < similarWizards.length; i++) {
      similarWizards[i].remove();
    }
  };

  window.wizards = {
    onLoad: onLoad,
    customize: customize,
    removeSimilar: removeSimilar
  };
})();
