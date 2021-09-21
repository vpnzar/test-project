import wordCardTpl from '../templates/translate-card.hbs';
import debounce from '../../node_modules/lodash.debounce/index';

const refs = {
  linkInputField: document.querySelector('#name-input'),
  linkTranslate: document.querySelector('.name-translate'),
  linkExample: document.querySelector('.name-example'),
  linkCardMarkup: document.querySelector('.search_result'),
  linkInputText: document.querySelector('#name-input'),
};

// let wordResponse = '';

refs.linkInputText.addEventListener('input', onInputChange);

const resultFromAPI = async url => {
  const response = await fetch(
    `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${url}`,
  );
  const wordsJson = response.json();
  const wordsJsonData = wordsJson.then(text => {
    meaningWords(text[0].meanings[0].id);
    console.log(text[0].meanings[0].id);
  });
  return wordsJsonData;
};

function onInputChange(event) {
  event.preventDefault();
  // console.log(event.currentTarget.value);
  // refs.linkCurrentInputMeaning.textContent = ;
  const eventQuery = event.currentTarget.value;
  resultFromAPI(eventQuery);
}

function meaningWords(meaningIds) {
  const meaningURL = fetch(`https://dictionary.skyeng.ru/api/public/v1/meanings?ids=${meaningIds}`)
    .then(meaningURL => meaningURL.json())
    .then(data => renderCollection(data, wordCardTpl));
}

function renderCollection(arr, renderCard) {
  arr.forEach(el => refs.linkCardMarkup.insertAdjacentHTML('afterbegin', renderCard(el)));
}
