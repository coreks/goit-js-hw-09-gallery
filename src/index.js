import './sass/main.scss';

import galleryItems from './js/gallery-images';

const galleryListEl = document.querySelector('.js-gallery');
const markupCards = createImageCardsMarkup(galleryItems);
const modalEl = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

galleryListEl.insertAdjacentHTML('beforeend', markupCards);
galleryListEl.addEventListener('click', onGalleryImageClick);

const refs = {
  openModalImage: document.querySelector('.gallery__link'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};

refs.openModalImage.addEventListener('click', onOpenModal, { once: true });
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onOverlayClick);

function createImageCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, description, original }) => {
      return `<li class = "gallery__item"><a class = "gallery__link"><img class = "gallery__image" src = '${preview}' alt = '${description}' data-source = '${original}' ></a></li>`;
    })
    .join('');
}

function onGalleryImageClick(e) {
  e.target.parentNode.href = e.target.dataset.source;
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  modalImage.src = `${e.target.dataset.source}`;
  modalImage.alt = `${e.target.alt}`;

  e.preventDefault();
  onOpenModal(e);
}

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  modalEl.classList.add('is-open');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalEl.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
}

function onOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}
