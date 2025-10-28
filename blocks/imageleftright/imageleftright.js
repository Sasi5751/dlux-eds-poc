export default function decorate(block) {
  // Find or create image and content divs as direct children of the block
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

  // Move the actual <img> from anywhere inside the first sub-div into imgDiv
  // Account for extra wrappers by searching inside all descendants of the first child
  const firstChild = block.firstElementChild;
  if (firstChild) {
    const img = firstChild.querySelector('img');
    if (img) {
      imgDiv.appendChild(img);
    }
  }

  // Move the remaining content-related nodes inside .imageleftright-content (except the image container)
  const allChildren = [...block.children];
  allChildren.forEach(child => {
    if (child !== imgDiv && child !== contentDiv) {
      // Move all text/content elements (h1..p,a,button) found inside this to contentDiv
      const movable = child.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button');
      movable.forEach(el => contentDiv.appendChild(el));
      // Remove empty container after moving content
      if (child.children.length === 0) {
        child.remove();
      }
    }
  });

  // Read orientation text from data-aue-prop="orientation" inside contentDiv
  const orientationEl = contentDiv.querySelector('[data-aue-prop="orientation"]');
  const orientation = orientationEl ? orientationEl.textContent.trim() : '';

  // Add or remove class to block for CSS styling based on orientation
  if (orientation === 'image-right') {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }
}
