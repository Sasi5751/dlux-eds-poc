/* /blocks/video/video.js */

function getOptions(block) {
  return [...block.classList].filter((c) => !['block', 'video'].includes(c));
}

export default function decorate(block) {
  block.querySelector(':scope > div:last-child').classList.add('content');
  block.querySelector('h1,h2,h3,h4,h5,h6').classList.add('title');
  const iframe = block.querySelector('iframe');
  if (iframe) {
    iframe.classList.add('video-embed');
    iframe.setAttribute('title', block.dataset.videoAlt || 'Video');
  }

  // Side-by-side styling
  if (getOptions(block).includes('side-by-side')) {
    block.querySelector(':scope > div:first-child').classList.add('video-wrapper');
  } else {
    block.querySelector('.video-embed').closest('div')?.classList.add('video-wrapper');
  }
}
