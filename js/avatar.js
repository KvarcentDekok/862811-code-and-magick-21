"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const ERROR_MESSAGE = `Выбранный файл должен быть изображением следующих форматов: ${FILE_TYPES.join(`, `)}`;

const fileChooser = document.querySelector(`.upload input[type=file]`);
const preview = document.querySelector(`.setup-user-pic`);
const currentAvatar = preview.src;

function onReaderLoad(reader) {
  preview.src = reader.result;
}

function changeAvatar() {
  const file = fileChooser.files[0];
  const errorBlock = document.querySelector(`.error`);

  if (errorBlock) {
    errorBlock.remove();
  }

  if (file) {
    const fileType = file.type;

    const matches = FILE_TYPES.some(function (it) {
      return fileType.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        onReaderLoad(reader);
      });

      reader.readAsDataURL(file);
    } else {
      window.util.addError(ERROR_MESSAGE);
      fileChooser.value = ``;
      preview.src = currentAvatar;
    }
  }
}

fileChooser.addEventListener(`change`, function () {
  changeAvatar();
});
