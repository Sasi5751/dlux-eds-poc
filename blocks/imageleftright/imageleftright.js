export default function decorate(block) {
  // Find the first child - container holding image div and potentially empty divs
  const firstChild = block.firstElementChild;

  // Remove all empty divs inside the firstChild except divs containing images
  if (firstChild) {
    const divs = [...firstChild.children];
    divs.forEach(div => {
      // Check if div or its descendants contain an <img> tag
      const hasImg = div.querySelector && div.querySelector('img');
      if (!hasImg) {
        div.remove();
      }
    });
  }

  // Now find or create image div only if image exists
  let imgDiv = block.querySelector('.imageleftright-image');
  if (imgDiv && !imgDiv.querySelector('img')) {
    // Remove empty image div to prevent extra space
    imgDiv.remove();
    imgDiv = null;
  }

  // Find content div or create it
  let contentDiv = block.querySelector('.imageleftright-content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.className = 'imageleftright-content';
    block.append(contentDiv);
  }

  // If no imgDiv but image exists inside firstChild, create image div and insert image
  if (!imgDiv && firstChild) {
    const img = firstChild.querySelector('img');
    if (img) {
      imgDiv = document.createElement('div');
      imgDiv.className = 'imageleftright-image';
      imgDiv.appendChild(img);
      // Insert at start of the block
      block.insertBefore(imgDiv, contentDiv);
    }
  }

  // Move content elements into contentDiv (skip image container)
  const allChildren = [...block.children];
  allChildren.forEach(child => {
    if (child !== imgDiv && child !== contentDiv) {
      // Move text content to contentDiv
      const nodes = child.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button');
      nodes.forEach(node => contentDiv.appendChild(node));
      // Remove leftover empty containers
      if (child.children.length === 0) child.remove();
    }
  });

  // Handle orientation from data attribute or existing class
  const orientation = block.classList.contains('image-right') || block.dataset.orientation === 'image-right';
  if (orientation) {
    block.classList.add('image-right');
  } else {
    block.classList.remove('image-right');
  }
}
