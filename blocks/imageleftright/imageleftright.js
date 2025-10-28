export default function decorate(block) {
  // Remove empty divs recursively, except div containing images
  function cleanEmptyDivs(parent) {
    const children = [...parent.children];
    children.forEach(child => {
      if (child.tagName === 'DIV') {
        // If no image descendant and no non-empty text, remove
        const hasImg = !!child.querySelector('img');
        const hasText = child.textContent.trim().length > 0;
        if (!hasImg && !hasText) {
          child.remove();
        } else {
          // recursive clean deeper
          cleanEmptyDivs(child);
        }
      }
    });
  }
  cleanEmptyDivs(block);

  // Find or create .imageleftright-image container
  let imgDiv = block.querySelector('.imageleftright-image');
  if (!imgDiv) {
    imgDiv = document.createElement('div');
    imgDiv.className = 'imageleftright-image';
    block.prepend(imgDiv);
  }

  // Find or create .imageleftright-content container
  let contentDiv = block.querySelector('.imageleftright-content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.className = 'imageleftright-content';
    block.append(contentDiv);
  }

  // Move the image (first img found anywhere) into imgDiv
  const allImgs = block.querySelectorAll('img');
  if (allImgs.length > 0) {
    imgDiv.appendChild(allImgs[0]);
  }

  // Move all non-image elements into contentDiv
  const allChildren = [...block.children];
  allChildren.forEach(child => {
    if (child !== imgDiv && child !== contentDiv) {
      const relevantNodes = child.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button');
      relevantNodes.forEach(n => contentDiv.appendChild(n));
      // Remove leftover empty containers
      if (child.children.length === 0) {
        child.remove();
      }
    }
  });

  // Find orientation text inside contentDiv and toggle class on block
  const orientationEl = contentDiv.querySelector('[data-aue-prop="orientation"]');
  const orientation = orientationEl ? orientationEl.textContent.trim() : '';

  if (orientation.toLowerCase() === 'image-right') {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }
}
