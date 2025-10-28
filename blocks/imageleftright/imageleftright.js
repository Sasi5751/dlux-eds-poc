export default function decorate(block) {
  // Apply orientation and background color classes
  const orientation = block.dataset.orientation || 'image-left';
  const backgroundColor = block.dataset.backgroundColor || 'light';
  const top = block.dataset.top === 'true';
  const bottom = block.dataset.bottom === 'true';

  block.classList.add('cmp-image-left-right-wrapper');
  block.classList.add(`cmp-image-left-right-no-top-padding-${top ? 'yes' : 'no'}`);
  block.classList.add(`cmp-image-left-right-no-bottom-padding-${bottom ? 'yes' : 'no'}`);

  // Find main container
  const container = block.querySelector('.cmp-image-left-right') || document.createElement('div');
  container.className = `cmp-image-left-right gp-radius-container cmp-image-left-right--${orientation} cmp-image-left-right--${backgroundColor}`;

  // Move image and content into the container
  const imgDiv = block.querySelector('.cmp-image-left-right__image') || document.createElement('div');
  imgDiv.className = 'cmp-image-left-right__image img-fluid';

  const contentDiv = block.querySelector('.cmp-image-left-right__content') || document.createElement('div');
  contentDiv.className = 'cmp-image-left-right__content';

  container.appendChild(imgDiv);
  container.appendChild(contentDiv);
  block.innerHTML = '';
  block.appendChild(container);
}
