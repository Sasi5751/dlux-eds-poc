export default function decorate(block) {
  // Recursively remove empty divs, except if they contain images
  function cleanEmptyDivs(parent) {
    const children = [...parent.children];
    children.forEach(child => {
      if (child.tagName === 'DIV') {
        const hasImg = !!child.querySelector('img');
        const hasText = child.textContent.trim().length > 0;
        if (!hasImg && !hasText) {
          child.remove();
        } else {
          cleanEmptyDivs(child);
        }
      }
    });
  }
  cleanEmptyDivs(block);

  // Find .imageleftright-image container
  let imgDiv = block.querySelector('.imageleftright-image');
  if (!imgDiv) {
    imgDiv = document.createElement('div');
    imgDiv.className = 'imageleftright-image';
    block.prepend(imgDiv);
  }

  // Find/create .imageleftright-content container
  let contentDiv = block.querySelector('.imageleftright-content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.className = 'imageleftright-content';
    block.append(contentDiv);
  }

  // Move or find the first img tag for alt handling
  const img = block.querySelector('img');
  if (img && !imgDiv.contains(img)) {
    imgDiv.appendChild(img);
  }

  // Move all non-image elements into contentDiv
  const allChildren = [...block.children];
  allChildren.forEach(child => {
    if (child !== imgDiv && child !== contentDiv) {
      const relevantNodes = child.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button');
      relevantNodes.forEach(n => contentDiv.appendChild(n));
      if (child.children.length === 0) {
        child.remove();
      }
    }
  });

  // --- ALT TEXT HANDLING ---

  // Find altText value and set on img
  const altP = contentDiv.querySelector('p[data-aue-prop="altText"]');
  if (img && altP) {
    img.alt = altP.textContent.trim();
    altP.remove(); // Remove altText paragraph so it doesn't display in content
  }

  // Handle orientation from orientation text node in content
  const orientationEl = contentDiv.querySelector('[data-aue-prop="orientation"]');
  const orientation = orientationEl ? orientationEl.textContent.trim().toLowerCase() : "";

  if (orientation === 'image-right') {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }
}
