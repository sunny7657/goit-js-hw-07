import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');

function createMarkup(arr) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`
    )
    .join('');
}

container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

container.addEventListener('click', handlerSizeUp);

function handlerSizeUp(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }

  const currentLink = event.target.dataset.source;
  const currentAlt = event.target.alt;

  const instance = basicLightbox.create(
    `<img src="${currentLink}" alt="${currentAlt}" width="800" height="600">`,
    {
      onShow: instance => {
        container.addEventListener('keydown', handlerSizeDown);
      },
      onClose: instance => {
        document.removeEventListener('keydown', handlerSizeDown);
      },
    }
  );
  instance.show();

  function handlerSizeDown(event) {
    if (event.code === 'Escape') {
      instance.close();
      console.log('here');
      // Дуже дякую за відео з поясненням, але я щиро не розумію як це зробити...
    }
  }
}
