export default function decorate(block) {
  block.classList.add('sidebyside-layout');
  const swap = block.classList.contains('swap');

  // Find and mark children
  const imageDiv = block.querySelector('img')?.closest('div');
  const contentDiv = block.querySelector('h2, h3, h4, h5, h6')?.closest('div');

  if (imageDiv) imageDiv.classList.add('sidebyside-image');
  if (contentDiv) contentDiv.classList.add('sidebyside-content');

  // Force correct order
  if (swap && imageDiv && contentDiv) {
    block.prepend(contentDiv);
    block.append(imageDiv);
  } else if (imageDiv && contentDiv) {
    block.prepend(imageDiv);
    block.append(contentDiv);
  }
}
