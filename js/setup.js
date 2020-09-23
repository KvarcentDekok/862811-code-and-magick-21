"use strict";

const setupBlock = document.querySelector(`.setup`);
const names = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const surnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const eyesColors = [`black`, `red`, `blue`, `yellow`, `green`];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getName() {
  return `${names[getRandomInt(0, names.length - 1)]} ${surnames[getRandomInt(0, surnames.length - 1)]}`;
}

function renderWizard(wizard, similarWizardTemplate) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  const setupSimilarLabel = wizardElement.querySelector(`.setup-similar-label`);
  const wizardCoat = wizardElement.querySelector(`.wizard-coat`);
  const wizardEyes = wizardElement.querySelector(`.wizard-eyes`);

  setupSimilarLabel.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
}

function initSimilarWizards() {
  const NUMBER_OF_WIZARDS = 4;

  const wizards = [];
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const similarWizardsFragment = document.createDocumentFragment();
  const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
  const setupSimilarListBlock = setupSimilarBlock.querySelector(`.setup-similar-list`);

  for (let i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards[i] = {
      name: getName(),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    };

    similarWizardsFragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  setupSimilarListBlock.appendChild(similarWizardsFragment);
  setupSimilarBlock.classList.remove(`hidden`);
}

initSimilarWizards();

setupBlock.classList.remove(`hidden`);
