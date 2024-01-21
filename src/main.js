"use strict";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { addImages } from './partials/markup.js';
import { getImages } from './partials/getImages.js';
import { lightbox } from './partials/simpleBox.js';
import { makeSmoothScrolling } from './partials/smoothScroll.js';

const formSearch = document.querySelector('.form');
const inputField = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.loadMore');
const MY_KEY = '41835868-9a86cd0490c6a90cb9e6f50a0';
axios.defaults.baseURL = 'https://pixabay.com';

formSearch.addEventListener('submit', searchImages);

closeLoader();

loadMoreBtn.classList.add('invisible');
let currentPage = 1;
const numberOfImagesPerPage = 40;
let name = '';

async function searchImages(event) {
  event.preventDefault();

  currentPage = 1;
  loadMoreBtn.classList.add('invisible');
  gallery.innerHTML = '';
  name = inputField.value.trim();

  showLoader();

  errorOfChecking(name);

  try {
    const images = await getImages(
      name,
      MY_KEY,
      currentPage,
      numberOfImagesPerPage
    );

    if (images.hits.length === 0) {
      closeLoader();
      inputField.value = '';

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

    gallery.insertAdjacentHTML('beforeend', addImages(images.hits));

    lightbox.refresh();

    if (images.totalHits > numberOfImagesPerPage) {
      showLoadMore();
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

  name = inputField.value.trim();

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
      hiddenLoadMore();
      closeLoader();
      gallery.innerHTML += addImages(images.hits);
      makeSmoothScrolling();
      inputField.value = '';
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
      gallery.innerHTML += addImages(images.hits);
      lightbox.refresh();
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

function errorOfChecking(name) {
  if (name === '') {
    closeLoader();
    hiddenLoadMore();
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

function showLoadMore() {
  loadMoreBtn.classList.remove('invisible');
}

function hiddenLoadMore() {
  loadMoreBtn.classList.add('invisible');
}




