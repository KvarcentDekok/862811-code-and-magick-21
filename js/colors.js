"use strict";

(function () {
  const coatColors = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ];
  const eyesColors = [`black`, `red`, `blue`, `yellow`, `green`];
  const fireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

  window.colors = {
    coat: coatColors,
    eyes: eyesColors,
    fireball: fireballColors,
    change(colors, input, element, property) {
      let color;

      if (colors.indexOf(input.value) === colors.length - 1) {
        color = colors[0];
      } else {
        color = colors[colors.indexOf(input.value) + 1];
      }

      element.style[property] = color;
      input.value = color;
    }
  };
})();
