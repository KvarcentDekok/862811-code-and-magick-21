"use strict";

const LOAD_URL = `https://21.javascript.pages.academy/code-and-magick/data`;
const SAVE_URL = `https://21.javascript.pages.academy/code-and-magick`;
const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

function sendXhr(options) {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      options.onLoad(xhr.response);
    } else {
      options.onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, function () {
    options.onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    options.onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(options.method, options.URL);
  xhr.send(options.data ? options.data : ``);
}

function loadData(onLoad, onError) {
  sendXhr({
    onLoad,
    onError,
    method: `GET`,
    URL: LOAD_URL
  });
}

function saveData(data, onLoad, onError) {
  sendXhr({
    data,
    onLoad,
    onError,
    method: `POST`,
    URL: SAVE_URL
  });
}

window.backend = {
  load: loadData,
  save: saveData
};

