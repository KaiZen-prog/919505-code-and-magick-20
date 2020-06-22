'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_QUANTITY = 4;

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var KEY_CODE_ENTER = 13;
var KEY_CODE_ESCAPE = 27;

var userDialog = document.querySelector('.setup');

var setupSimilarList = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomArrayElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var createWizards = function () {
  var array = [];

  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizard = {
      name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: getRandomArrayElement(WIZARD_COAT_COLORS),
      eyeColor: getRandomArrayElement(WIZARD_EYE_COLORS)
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

var userNameInput = userDialog.querySelector('.setup-user-name');
var setupSubmit = userDialog.querySelector('.setup-submit');

var setupWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var setupWizardCoatInput = userDialog.querySelector('input[name="coat-color"]');
var setupWizardEyesInput = userDialog.querySelector('input[name="eyes-color"]');
var setupWizardFireballInput = userDialog.querySelector('input[name="fireball-color"]');

var onPopupKeyDown = function (evt) {
  if ((evt.keyCode === KEY_CODE_ESCAPE) && (userNameInput !== document.activeElement)) {
    evt.preventDefault();
    onClosePopup();
  } else if ((evt.keyCode === KEY_CODE_ENTER) && (setupSubmit !== document.activeElement)) {
    evt.preventDefault();
  }
};

var renderRandomColor = function (element, input, color) {
  element.style.fill = color;
  input.value = color;
};

var renderRandomBackGroundColor = function (element, input, backgroundColor) {
  element.style.backgroundColor = backgroundColor;
  input.value = backgroundColor;
};

var onChangeCoatColor = function () {
  var color = getRandomArrayElement(WIZARD_COAT_COLORS);
  renderRandomColor(setupWizardCoat, setupWizardCoatInput, color);
};

var onChangeEyeColor = function () {
  var color = getRandomArrayElement(WIZARD_EYE_COLORS);
  renderRandomColor(setupWizardEyes, setupWizardEyesInput, color);
};

var onChangeFireBallColor = function () {
  var backgroundColor = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  renderRandomBackGroundColor(setupWizardFireball, setupWizardFireballInput, backgroundColor);
};

var onOpenPopupKeydown = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    onOpenPopup();
  }
};

var onClosePopupKeydown = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    onClosePopup();
  }
};

var onUserNameInputInvalid = function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var onUserNameInputChange = function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var onOpenPopup = function () {
  userDialog.classList.remove('hidden');
  userDialog.addEventListener('keydown', onPopupKeyDown);

  setupOpen.removeEventListener('click', onOpenPopup);
  setupOpen.removeEventListener('keydown', onOpenPopupKeydown);

  setupClose.addEventListener('click', onClosePopup);
  setupClose.addEventListener('keydown', onClosePopupKeydown);

  setupWizardCoat.addEventListener('click', onChangeCoatColor);
  setupWizardEyes.addEventListener('click', onChangeEyeColor);
  setupWizardFireball.addEventListener('click', onChangeFireBallColor);

  userNameInput.addEventListener('invalid', onUserNameInputInvalid);
  userNameInput.addEventListener('input', onUserNameInputChange);
};

var onClosePopup = function () {
  userDialog.classList.add('hidden');
  userDialog.removeEventListener('keydown', onPopupKeyDown);

  setupOpen.addEventListener('click', onOpenPopup);
  setupOpen.addEventListener('keydown', onOpenPopupKeydown);

  setupClose.removeEventListener('click', onClosePopup);
  setupClose.removeEventListener('keydown', onClosePopupKeydown);

  setupWizardCoat.removeEventListener('click', onChangeCoatColor);
  setupWizardEyes.removeEventListener('click', onChangeEyeColor);
  setupWizardFireball.removeEventListener('click', onChangeFireBallColor);

  userNameInput.removeEventListener('invalid', onUserNameInputInvalid);
  userNameInput.removeEventListener('input', onUserNameInputChange);
};

setupOpen.addEventListener('click', onOpenPopup);
setupOpen.addEventListener('keydown', onOpenPopupKeydown);
