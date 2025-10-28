export default function decorate(block) {
  // Find containers
  const imgContainer = block.querySelector('.cmp-image-left-right__image');
  const contentContainer = block.querySelector('.cmp-image-left-right__content');

  // Populate image
  if (imgContainer && block.dataset.desktopImagePath) {
    const img = document.createElement('img');
    img.src = block.dataset.desktopImagePath;
    img.alt = block.dataset.altText || '';
    img.className = 'cmp-image-left-right__image-img img-fluid';
    imgContainer.appendChild(img);
  }

  // Populate content
  if (contentContainer) {
    if (block.dataset.title) {
      const title = document.createElement('h2');
      title.textContent = block.dataset.title;
      title.className = 'cmp-image-left-right__title';
      contentContainer.appendChild(title);
    }
    if (block.dataset.text) {
      const text = document.createElement('p');
      text.textContent = block.dataset.text;
      text.className = 'cmp-image-left-right__text';
      contentContainer.appendChild(text);
    }
    if (block.dataset.ctaText && block.dataset.ctaUrl) {
      const button = document.createElement('a');
      button.href = block.dataset.ctaUrl;
      button.textContent = block.dataset.ctaText;
      button.className = 'cmp-image-left-right__button';
      contentContainer.appendChild(button);
    }
  }
}
