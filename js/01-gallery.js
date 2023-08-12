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

  const currentProduct = event.target.closest('.gallery');
  // Не зовсім розумію навіщо делегування на ul.gallery; як потім використати цю змінну currentProduct, якщо отримую data-source i alt через event.target

  const currentLink = event.target.dataset.source;
  const currentAlt = event.target.alt;

  const instance = basicLightbox.create(
    `<img src="${currentLink}" alt="${currentAlt}" width="800" height="600">`
  );
  instance.show();

  container.addEventListener('keydown', handlerSizeDown);

  function handlerSizeDown(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
