import wordCardTpl from '../templates/translate-card.hbs';

const refs = {
  linkInputField: document.querySelector('#name-input'),
  linkTranslate: document.querySelector('.name-translate'),
  linkExample: document.querySelector('.name-example'),
  linkCardMarkup: document.querySelector('.search_result'),
  linkInputText: document.querySelector('#name-input'),
};

let wordResponse = '';

refs.linkInputText.addEventListener('input', onInputChange);

const resultFromAPI = async url => {
  const response = await fetch(url);
  const wordsJson = response.json();
  return wordsJson;
};

function onInputChange(event) {
  console.log(event.currentTarget.value);
  // refs.linkCurrentInputMeaning.textContent = ;
  const eventQuery = event.currentTarget.value;
  resultFromAPI(
    `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${eventQuery}`,
  ).then(text => {
    meaningWords(text[0].meanings[0].id);
    console.log(text[0].meanings[0].id);
  });
}

function meaningWords(meaningIds) {
  const meaningURL = fetch(`https://dictionary.skyeng.ru/api/public/v1/meanings?ids=${meaningIds}`)
    .then(meaningURL => meaningURL.json())
    .then(data => renderCollection(data, wordCardTpl));
}

// function fillOutFields(res) {
//   ;
//   // console.log((refs.linkTranslate.textContent = data.translation.text));
//   // console.log((refs.linkExample.textContent = data.examples[0].text));
// }

// console.log((refs.linkCurrentInputMeaning.textContent = '111'));
function renderCollection(arr, renderCard) {
  arr.forEach(el => refs.linkCardMarkup.insertAdjacentHTML('afterbegin', renderCard(el)));
}
