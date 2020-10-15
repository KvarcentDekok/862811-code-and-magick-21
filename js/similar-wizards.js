"use strict";

(function () {
  const NUMBER_OF_WIZARDS = 4;

  const setupBlock = document.querySelector(`.setup`);
  const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
  const setupSimilarListBlock = setupSimilarBlock.querySelector(`.setup-similar-list`);

  let wizardsData = [];
  let currentColors = {
    coat: `rgb(101, 137, 164)`,
    eyes: `black`
  };

  function getRank(wizard) {
    let rank = 0;

    if (wizard.colorCoat === currentColors.coat) {
      rank += 2;
    }
    if (wizard.colorEyes === currentColors.eyes) {
      rank += 1;
    }

    return rank;
  }

  function renderWizard(wizard, similarWizardTemplate) {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    const setupSimilarLabel = wizardElement.querySelector(`.setup-similar-label`);
    const wizardCoat = wizardElement.querySelector(`.wizard-coat`);
    const wizardEyes = wizardElement.querySelector(`.wizard-eyes`);

    setupSimilarLabel.textContent = wizard.name;
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function updateSimilarWizards(data, currentColor, currentElement) {
    let wizards;

    if (data) {
      wizardsData = data;
      wizards = data;
    } else {
      wizards = wizardsData;
    }

    currentColors[currentElement] = currentColor;
    wizards = wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    initSimilarWizards(wizards);
  }

  function initSimilarWizards(wizards) {
    const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`);
    const similarWizardsFragment = document.createDocumentFragment();

    let wizardsNumber = NUMBER_OF_WIZARDS > wizards.length ? wizards.length : NUMBER_OF_WIZARDS;

    setupSimilarListBlock.textContent = ``;

    for (let i = 0; i < wizardsNumber; i++) {
      similarWizardsFragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }

    setupSimilarListBlock.appendChild(similarWizardsFragment);
    setupSimilarBlock.classList.remove(`hidden`);
  }

  function errorHandler(error) {
    setupSimilarListBlock.textContent = error;
    setupSimilarBlock.classList.remove(`hidden`);
  }

  window.similarWizards = {
    error: errorHandler,
    update: window.debounce(updateSimilarWizards)
  };
})();
