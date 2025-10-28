export default function decorate(block) {
  // Find or create child divs for image and content
  let imgDiv = block.querySelector('.imageleftright-image');
  let contentDiv = block.querySelector('.imageleftright-content');

  // If not present, create them
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

  // Move image and content elements into their containers
  block.querySelectorAll('img').forEach(img => imgDiv.appendChild(img));
  block.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button').forEach(el => {
    if (!imgDiv.contains(el)) contentDiv.appendChild(el);
  });

  // Read orientation either from class or data attribute
  const orientation = block.classList.contains('image-right') || block.dataset.orientation === 'image-right';

  // Add or remove class for CSS layout swap
  if (orientation) {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }

  // No need to reorder DOM elements here, CSS flex handles layout swap cleanly.
}
