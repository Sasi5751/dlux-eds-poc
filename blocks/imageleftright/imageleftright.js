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

  // Place the image in imgDiv and the content in contentDiv
  block.querySelectorAll('img').forEach(img => imgDiv.appendChild(img));
  block.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button').forEach(el => {
    if (!imgDiv.contains(el)) contentDiv.appendChild(el);
  });

  // Swap the order if layout is image-right
  const layoutOption = block.classList.contains('image-right') || block.dataset.orientation === 'image-right';
  if (layoutOption) {
    if (block.firstElementChild !== contentDiv) {
      block.insertBefore(contentDiv, imgDiv);
    }
  } else {
    if (block.firstElementChild !== imgDiv) {
      block.insertBefore(imgDiv, contentDiv);
    }
  }
}
