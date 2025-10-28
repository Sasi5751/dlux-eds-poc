// /blocks/imageleftright/imageleftright.js

export default function decorate(block) {
  // Find or create image and content containers
  let imgDiv = block.querySelector('.imageleftright-image');
  let contentDiv = block.querySelector('.imageleftright-content');

  if (!imgDiv) {
    imgDiv = document.createElement('div');
    imgDiv.className = 'imageleftright-image';
    block.prepend(imgDiv);
  }
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.className = 'imageleftright-content';
    block.append(contentDiv);
  }

  // Clear previous content
  imgDiv.innerHTML = '';
  contentDiv.innerHTML = '';

  // Populate image container with img element if image path exists
  if (block.dataset.desktopImagePath) {
    const img = document.createElement('img');
    img.src = block.dataset.desktopImagePath;
    img.alt = block.dataset.altText || '';
    img.className = 'cmp-image-left-right__image-img img-fluid'; // match your CSS class naming if needed
    imgDiv.appendChild(img);
  }

  // Populate content container with title, text, and CTA
  if (block.dataset.title) {
    const titleEl = document.createElement('h2');
    titleEl.textContent = block.dataset.title;
    contentDiv.appendChild(titleEl);
  }
  if (block.dataset.text) {
    const textEl = document.createElement('p');
    textEl.textContent = block.dataset.text;
    contentDiv.appendChild(textEl);
  }
  if (block.dataset.textContent_cta && block.dataset.textContent_ctaText) {
    const cta = document.createElement('a');
    cta.href = block.dataset.textContent_cta;
    cta.textContent = block.dataset.textContent_ctaText;
    cta.className = 'button';
    contentDiv.appendChild(cta);
  }

  // Set layout orientation class on block
  if (block.dataset.orientation === 'image-right') {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }

  // Optional: handle background color class
  if (block.dataset.backgroundColor) {
    block.classList.add(`background-${block.dataset.backgroundColor}`);
  }
}
