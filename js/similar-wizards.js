"use strict";

(function () {
  const names = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const surnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const setupBlock = document.querySelector(`.setup`);

  function getName() {
    const name = names[window.util.getRandomInt(0, names.length - 1)];
    const surname = surnames[window.util.getRandomInt(0, surnames.length - 1)];
    return `${name} ${surname}`;
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
        coatColor: window.util.getRandomElement(window.colors.coat),
        eyesColor: window.util.getRandomElement(window.colors.eyes)
      };

      similarWizardsFragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }

    setupSimilarListBlock.appendChild(similarWizardsFragment);
    setupSimilarBlock.classList.remove(`hidden`);
  }

  initSimilarWizards();
})();
