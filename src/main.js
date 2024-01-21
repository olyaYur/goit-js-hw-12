"use strict";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { renderPhoto } from './partials/markup.js';
import { getImages } from './partials/getImages.js';
import { refreshPage } from './partials/simpleBox.js';
import { makeSmoothScrolling } from './partials/smoothScroll.js';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.loadMore');
const MY_KEY = '41835868-9a86cd0490c6a90cb9e6f50a0';
axios.defaults.baseURL = 'https://pixabay.com';

form.addEventListener('submit', onSearch);

closeLoader();

loadMoreBtn.classList.add('invisible');
let currentPage = 1;
const numberOfImagesPerPage = 40;
let name = '';

async function onSearch(event) {
  event.preventDefault();

  currentPage = 1;
  loadMoreBtn.classList.add('invisible');
  gallery.innerHTML = '';
  name = input.value.trim();

  showLoader();

  errorChecking(name);

  try {
    const images = await getImages(
      name,
      MY_KEY,
      currentPage,
      numberOfImagesPerPage
    );

    if (images.hits.length === 0) {
      closeLoader();
      input.value = '';

      iziToast.error({
        title: 'Error',
        timeout: '2000',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderPhoto(images.hits));

    refreshPage.refresh();

    if (images.totalHits > numberOfImagesPerPage) {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      timeout: '2000',
      message: error,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    closeLoader();
  }
}

loadMoreBtn.addEventListener('click', isLoadMore);

async function isLoadMore() {
  event.preventDefault();

  currentPage++;

  name = input.value.trim();

  try {
    const images = await getImages(
      name,
      MY_KEY,
      currentPage,
      numberOfImagesPerPage
    );

    const totalHits = images.totalHits;
    let countPage = Math.ceil(totalHits / numberOfImagesPerPage);

    if (currentPage === countPage) {
      hiddenLoadMoreBtn();
      closeLoader();
      gallery.innerHTML += renderPhoto(images.hits);
      makeSmoothScrolling();
      input.value = '';
      iziToast.info({
        title: 'Info',
        timeout: '5000',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FAFAFB',
        backgroundColor: '#00FF00',
        position: 'topRight',
      });
      return;
    }

    if (currentPage < countPage) {
      gallery.innerHTML += renderPhoto(images.hits);
      refreshPage.refresh();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      timeout: '2000',
      message: error,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    makeSmoothScrolling();
    closeLoader();
  }
}

function errorChecking(name) {
  if (name === '') {
    closeLoader();
    hiddenLoadMoreBtn();
    throw iziToast.error({
      title: 'Error',
      timeout: '1500',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  }
}

function showLoader() {
  loader.classList.remove('invisible');
}
function closeLoader() {
  loader.classList.add('invisible');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('invisible');
}

function hiddenLoadMoreBtn() {
  loadMoreBtn.classList.add('invisible');
}




/*
import axios from 'axios';

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const formSearch = document.querySelector('.form');
const inputField = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', 
      {captionsData: "alt",
       captionDelay: 250,
       nav: true,
       close: true,
       enableKeyboard: true,
       docClose: true,
      });

formSearch.addEventListener("submit", searchImages);
closeLoader();

async function searchImages(event) {
  event.preventDefault();

  let name = inputField.value;
  
  showLoader();
  gallery.innerHTML = '';
  

  if (name === '') {
    closeLoader();

    iziToast.error({
      title: 'Error',
      timeout: '2000',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
    return;
  }

  let searchParams = new URLSearchParams({
    key: '41835868-9a86cd0490c6a90cb9e6f50a0',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  });

  let url = `https://pixabay.com/api/?${searchParams}`
  console.log(url);

  fetch(url)
    .then(response => {
      closeLoader();
      if (!response.ok) {
        throw new Error('Request is not ok');
      }

      return response.json();
    })
    .then(images => {
      if (images.hits.length === 0) {
        closeLoader();

        iziToast.error({
          title: 'Error',
          timeout: '2000',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FAFAFB',
          backgroundColor: '#EF4040',
          position: 'topRight',
        });
        return;
      }

      gallery.innerHTML = addImages(images.hits);
     
      const lightbox = new SimpleLightbox('.gallery a', 
      {captionsData: "alt",
       captionDelay: 250,
       nav: true,
       close: true,
       enableKeyboard: true,
       docClose: true,
      });
      lightbox.refresh();
    })

    .catch(error =>
      iziToast.error({
        title: 'Error',
        timeout: '2000',
        message: error,
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
      })
    );
}

function addImages(images) {
  return images.reduce((html, hit) => html + `
  <li class="gallery-list">
    <a class="gallery-link" href="${hit.largeImageURL}">
      <img class ="gallery-image" src =${hit.webformatURL} alt =${hit.tags} />
    </a>
    <span class="gallery-wrapper">
      <span class="gallery-tit-wrap">  
        <span class="gallery-subtitle"><b>Likes</b></span>
        <span class="gallery-sub-title-number">${hit.likes}</span>
      </span>
      <span class="gallery-tit-wrap">  
        <span class="gallery-subtitle"><b>Views</b></span>
        <span class="gallery-sub-title-number">${hit.views}</span>
      </span>
      <span class="gallery-tit-wrap">  
        <span class="gallery-subtitle"><b>Comments</b></span>
        <span class="gallery-sub-title-number">${hit.comments}</span>
      </span>
      <span class="gallery-tit-wrap">  
        <span class="gallery-subtitle"><b>Downloads</b></span>
        <span class="gallery-sub-title-number">${hit.downloads}</span>
      </span>
    </span>
 </li> 
  `, "");
}

function showLoader() {
  loader.style.display = 'block';
}
function closeLoader() {
  loader.style.display = 'none';
}
*/