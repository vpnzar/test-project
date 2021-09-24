import wordCardTpl from '../templates/translate-card.hbs';
import debounce from 'lodash.debounce';
import getRefs from './refs';
const refs = getRefs();

refs.linkInputText.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  event.preventDefault();
  const eventQuery = event.target.value;
  resultFromAPI(eventQuery);
}

const resultFromAPI = async url => {
  const response = await fetch(
    `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${url}`,
  );
  const wordsJson = response.json();
  const wordsJsonData = wordsJson.then(text => {
    meaningWords(text[0].meanings[0].id);
  });
  return wordsJsonData;
};

const meaningWords = async meaningIds => {
  const meaningURL = await fetch(
    `https://dictionary.skyeng.ru/api/public/v1/meanings?ids=${meaningIds}`,
  )
    .then(meaningURL => meaningURL.json())
    .then(data => renderCollection(data, wordCardTpl));
};

function renderCollection(arr, renderCard) {
  arr.forEach(el => refs.linkCardMarkup.insertAdjacentHTML('afterbegin', renderCard(el)));
}
