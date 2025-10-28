export default function decorate(block) {
  const imgDiv = block.querySelector('.imageleftright-image') || document.createElement('div');
  imgDiv.classList.add('imageleftright-image');

  const contentDiv = block.querySelector('.imageleftright-content') || document.createElement('div');
  contentDiv.classList.add('imageleftright-content');

  // Clear previous content
  imgDiv.innerHTML = '';
  contentDiv.innerHTML = '';

  // Populate image
  if (block.dataset.desktopImagePath) {
    const img = document.createElement('img');
    img.src = block.dataset.desktopImagePath;
    img.alt = block.dataset.altText || '';
    imgDiv.appendChild(img);
  }

  // Populate content
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
    cta.classList.add('button');
    contentDiv.appendChild(cta);
  }

  // Append containers to block
  if (!block.contains(imgDiv)) block.prepend(imgDiv);
  if (!block.contains(contentDiv)) block.append(contentDiv);

  // Layout based on orientation
  if (block.dataset.orientation === 'image-right') {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }

  // Optional: Apply background color classes if used in CSS
  if (block.dataset.backgroundColor) {
    block.classList.add(`background-${block.dataset.backgroundColor}`);
  }
}
