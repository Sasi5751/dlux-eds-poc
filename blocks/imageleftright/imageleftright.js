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

  // Move image to first div and content to second div
  // Look for img, title, text, button in block children
  block.querySelectorAll('img').forEach(img => imgDiv.appendChild(img));
  block.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button').forEach(el => {
    if (!imgDiv.contains(el)) contentDiv.appendChild(el);
  });

  // Optional: Remove any direct children except imageDiv/contentDiv
  [...block.children].forEach(child => {
    if (child !== imgDiv && child !== contentDiv) child.remove();
  });
}
