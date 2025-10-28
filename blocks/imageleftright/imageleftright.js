// /blocks/sidebyside/sidebyside.js

function getOptions(block) {
  return [...block.classList].filter((c) => !['block', 'sidebyside'].includes(c));
}

export default function decorate(block) {
  const swap = getOptions(block).includes('swap');
  const imageDiv = block.querySelector('.sidebyside-image');
  const contentDiv = block.querySelector('.sidebyside-content');

  block.classList.add('sidebyside-layout');

  if (swap && imageDiv && contentDiv) {
    // Swap positions if "swap" class present
    block.insertBefore(contentDiv, imageDiv);
  }
}
