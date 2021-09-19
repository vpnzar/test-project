const refs = {
  linkInputField: document.querySelector('#name-input'),
  linkTranslate: document.querySelector('.name-translate'),
  linkExample: document.querySelector('.name-example'),
};

let wordResponse = '';

refs.linkInputField.addEventListener('input', onInputChange);

const resultFromAPI = async url => {
  const response = await fetch(url);
  const wordsJson = response.json();
  return wordsJson;
};

function onInputChange(event) {
  // refs.linkCurrentInputMeaning.textContent = ;
  const eventQuery = event.currentTarget.value;
  resultFromAPI(
    `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${eventQuery}`,
  ).then(text => {
    meaningWords(text[0].meanings[0].id);
  });
}

function meaningWords(meaningIds) {
  const meaningURL = fetch(`https://dictionary.skyeng.ru/api/public/v1/meanings?ids=${meaningIds}`)
    .then(meaningURL => meaningURL.json())
    .then(data => fillOutFields(data[0]));
}

function fillOutFields(data) {
  // wordResponse;
  // refs.linkCurrentInputMeaning.textContent = console.log(data.translation.text);
  console.log((refs.linkTranslate.textContent = data.translation.text));
  console.log((refs.linkExample.textContent = data.examples[0].text));
}

// console.log((refs.linkCurrentInputMeaning.textContent = '111'));
