const inputContact = document.querySelector('.search');
const inputResult = document.querySelector('.search_result');
const inputForm = document.querySelector('.search-form');
const inputTel = document.querySelector('.tel');
const inputAddress = document.querySelector('.address-office');
const inputAddressPost = document.querySelector('.address-post');
const submitBtn = document.querySelector('#submit');
const dataListConfirm = document.querySelector('.data-list');
const inputData = document.querySelector('.data');
const inputOrderNumber = document.querySelector('.number-order');
const inputPayForm = document.querySelector('.pay-form');
const inputPayControl = document.querySelector('.pay-control');
const inputDelivery = document.querySelector('.delivery');
const additionText = document.querySelector('.add-text');
console.log(inputForm);

inputContact.addEventListener('input', bodyMarkup);
inputResult.addEventListener('click', showNameInput);
submitBtn.addEventListener('click', confirmInfo);

let contactProps = [];

function bodyMarkup(e) {
  e.preventDefault();
  resultFromAPI(e.target.value);
  inputResult.innerHTML = '';
}

const resultFromAPI = async key => {
  const response = await fetch(
    `https://api.hubapi.com/contacts/v1/search/query?q=${key}&hapikey=2527e68b-a1f0-4ae5-868a-c0b95b69e8e3`,
  );
  const wordsJson = response.json();
  const wordsJsonData = wordsJson.then(text => {
    renderCollection(text.contacts);
  });
  return wordsJsonData;
};

function showNameList(countryNameArray) {
  return `
<ul class='name-list'>
  <li class='name-item'>${countryNameArray}</li>
</ul>
`;
}

function renderCollection(arr) {
  arr.forEach(el => {
    contactProps.push(el.properties);
    inputResult.insertAdjacentHTML('afterbegin', showNameList(el.properties.firstname.value));
  });
}

function showNameInput(e) {
  console.log(inputContact.value);
  inputResult.innerHTML = '';
  inputContact.value = e.target.textContent;
  contactProps.forEach(prop => {
    if (prop.firstname.value === e.target.textContent) {
      inputTel.value = prop.hs_calculated_mobile_number.value;
      inputContact.value = prop.company.value;
      inputAddress.value = prop.address.value;
      inputAddressPost.value = prop.country.value;
    }
  });
}

function confirmInfo(e) {
  // if (contactProps.company.value !== inputContact.value) {
  //   updateAPI(`property: 'firstname', value: ${inputContact.value}`);
  // }

  return (dataListConfirm.innerHTML = ` <ul class="name-list">
      <li class="name-item">${'дата отгрузки -- ' + inputData.value}</li>
      <li class="name-item">${'№ заказа -- ' + inputOrderNumber.value}</li>
      <li class="name-item">${'форма оплаты -- ' + inputPayForm.value}</li>
      <li class="name-item">${'оплата -- ' + inputPayControl.value}</li>
      <li class="name-item">${'отгрузка -- ' + inputDelivery.value}</li>
      <li class="name-item">${'фио -- ' + inputContact.value}</li> 
      <li class="name-item">${'тел -- ' + inputTel.value}</li>
      <li class="name-item">${'доставка -- ' + inputAddress.value}</li>
      <li class="name-item">${'отправка -- ' + inputAddressPost.value}</li>
      <li class="name-item">${'доп.инфо -- ' + additionText.value}</li>
    </ul>`);
}

// const updateAPI = async () => {
//   const response = await POST(
//     `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/hapikey=2527e68b-a1f0-4ae5-868a-c0b95b69e8e3`,
//   );
//   const wordsJson = response.json();
//   const wordsJsonData = wordsJson.then(property => {
//     [{ prop }];
//   });
//   return wordsJsonData;
// };
