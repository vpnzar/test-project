import searchFormTemplate from '../templates/search-form.hbs';
import photoCardTemplate from '../templates/photo-card.hbs';

function createSearchForm() {
  document.body.insertAdjacentHTML('afterbegin', searchFormTemplate());
  const inputFormLink = document.querySelector('#search-form');
  const containerResult = document.createElement('div');
  containerResult.classList.add('container-result');
  inputFormLink.after(containerResult);
}

function createBodyMarkupForm(items) {
  const containerResult = document.querySelector('.container-result');
  const galleryResult = document.createElement('ul');
  galleryResult.classList.add('gallery');
  containerResult.appendChild(galleryResult);
  galleryResult.innerHTML = photoCardTemplate(items);
}

function createLoadBtn() {
  const imageMarkupCreate = document.querySelector('.container-result');
  const loadMoreMarkupBtn = document.createElement('div');
  imageMarkupCreate.after(loadMoreMarkupBtn);
  loadMoreMarkupBtn.classList.add('load');
  loadMoreMarkupBtn.classList.add('is-hidden');
  loadMoreMarkupBtn.setAttribute('id', 'button');
  loadMoreMarkupBtn.textContent = 'Load More...';
}

export { createSearchForm, createBodyMarkupForm, createLoadBtn };
