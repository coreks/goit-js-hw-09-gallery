// import './sass/main.scss';
const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

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
  // window.addEventListener('keydown', onNextImage);
  // window.addEventListener('keydown', onPrevImage);
  window.addEventListener('keydown', onEscKeyPress);
  modalEl.classList.add('is-open');
}

function onCloseModal() {
  // window.removeEventListener('keydown', onNextImage);
  // window.removeEventListener('keydown', onPrevImage);
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

// function onNextImage(e) {
//   const NEXT_KEY_CODE = 'ArrowRight';
//   if (e.code === NEXT_KEY_CODE) {
//     console.log('next');
//     onCloseModal();
//     onOpenModal();
//   }
// }

// function onPrevImage(e) {
//   const PREV_KEY_CODE = 'ArrowLeft';
//   if (e.code === PREV_KEY_CODE) {
//     console.log('prev');
//     onCloseModal();
//     onOpenModal();
//   }
// }
