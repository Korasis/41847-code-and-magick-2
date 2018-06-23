'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizards = [];

// массивы данных для рандомайзера
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// элементы
// var userDialog = document.querySelector('.setup');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoatElement = setupWizard.querySelector('.wizard-coat');
var wizardEyesElement = setupWizard.querySelector('.wizard-eyes');
var fireballElement = setup.querySelector('.setup-fireball-wrap');
var similarElement = setup.querySelector('.setup-similar');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


// рандомайзер в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// рандомайзер массивов
function getRandomArray(array, n) {
  var i = 0;
  var randomArray = [];
  while (i < n) {
    var randomArrayIndex = getRandomInt(0, array.length - 1);
    if (randomArray.indexOf(array[randomArrayIndex]) < 0) {
      randomArray[i] = array[randomArrayIndex];
      i++;
    }
  }
  return randomArray;
}

// генератор массива объектов
function generateRandomObject(count) {
  var randomNames = getRandomArray(names, count);
  var randomSurnames = getRandomArray(surnames, count);
  var randomCoats = getRandomArray(coatColors, count);
  var randomEyes = getRandomArray(eyesColors, count);

  for (var i = 0; i < count; i++) {
    wizards[i] = {
      'name': randomNames[i] + ' ' + randomSurnames[i],
      'coatColor': randomCoats[i],
      'eyesColor': randomEyes[i]
    };
  }
}

// генератор элементов шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

// отрисовка элементов шаблона
function renderSimilarItems() {
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
    similarListElement.appendChild(fragment);
  }
}

// ф-я, смотрящая за нажатием на ESC
var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

// открытие окна персонажа
var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// закрытие окна персонажа
var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// обработчик неверно заполненного инпута с именем персонажа
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// общий обработчик инпута с именем персонажа
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// обработчик клика по иконке юзера
setupOpen.addEventListener('click', function() {
  openPopup();
});

// обработчик нажатия на Enter при фокусе на иконке юзера
setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// обработчик клика по крестику окна юзера
setupClose.addEventListener('click', function() {
  closePopup();
});

// обработчик нажатия на Enter при фокусе на крестике окна юзера
setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// рандомно меняем цвет мантии персонажа
wizardCoatElement.addEventListener('click', function() {
  var randomCoatColorIndex = getRandomInt(0, coatColors.length - 1);
  wizardCoatElement.style.fill = coatColors[randomCoatColorIndex];
  setup.querySelector('input[name=coat-color]').value = coatColors[randomCoatColorIndex];
})

// рандомно меняем цвет глаз персонажа
wizardEyesElement.addEventListener('click', function() {
  var randomEyesColorIndex = getRandomInt(0, eyesColors.length - 1);
  wizardEyesElement.style.fill = eyesColors[randomEyesColorIndex];
  setup.querySelector('input[name=eyes-color]').value = eyesColors[randomEyesColorIndex];
})

// рандомно меняем цвет фаербола персонажа
fireballElement.addEventListener('click', function() {
  var randomFireballColorIndex = getRandomInt(0, fireballColors.length - 1);
  fireballElement.style.backgroundColor = fireballColors[randomFireballColorIndex];
  setup.querySelector('input[name=fireball-color]').value = fireballColors[randomFireballColorIndex];
})


// показываем модалку персонажа
// function showSetup() {
//   ialog.classList.remove('hidden');
// }

// показываем блок похожих персонажей
function showSimilar() {
  similarElement.classList.remove('hidden');
}

generateRandomObject(4);
// showSetup();
showSimilar();
renderSimilarItems();
