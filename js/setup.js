'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_QUANTITY = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setup = document.querySelector('.setup');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomArrayElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var wizards = [];
var createWizards = function () {
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizard = {
      name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: getRandomArrayElement(WIZARD_COAT_COLORS),
      eyeColor: getRandomArrayElement(WIZARD_EYE_COLORS)
    };
    wizards.push(wizard);
  }
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

createWizards();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');

var onPopupKeyDown = function (evt) {
  if ((evt.key === 'Escape') && !(userNameInput === document.activeElement)) {
    evt.preventDefault();
    closePopup();
  } else if ((evt.key === 'Enter') && !(setupSubmit === document.activeElement)) {
    evt.preventDefault();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupKeyDown);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeyDown);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

var wizardCoatInput = setup.querySelector('input[name="coat-color"]');
var wizardEyesInput = setup.querySelector('input[name="eyes-color"]');
var wizardFireballInput = setupWizardFireball.querySelector('input[name="fireball-color"]');

setupWizardCoat.addEventListener('click', function () {
  var coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
  setupWizardCoat.style.fill = coatColor;
  wizardCoatInput.value = coatColor;
});

setupWizardEyes.addEventListener('click', function () {
  var eyeColor = getRandomArrayElement(WIZARD_EYE_COLORS);
  setupWizardEyes.style.fill = eyeColor;
  wizardEyesInput.value = eyeColor;
});

setupWizardFireball.addEventListener('click', function () {
  var fireballColor = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  setupWizardFireball.style.backgroundColor = fireballColor;
  wizardFireballInput.value = fireballColor;
});
