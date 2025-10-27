// /blocks/video/video.js

function getOptions(block) {
  return [...block.classList].filter((c) => !['block', 'video'].includes(c));
}

function extractYouTubeId(url) {
  // Accept both embed and typical watch formats
  const match = url.match(/(?:embed\/|v=|youtu\.be\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function decorate(block) {
  block.querySelector(':scope > div:last-child').classList.add('content');
  const titleEl = block.querySelector('h1,h2,h3,h4,h5,h6');
  if (titleEl) titleEl.classList.add('title');

  // Locate video URL and alt in EDS output (as <a> and <p>)
  let url = '';
  let alt = '';
  const urlAnchor = block.querySelector('a[href*="youtube.com"]');
  const altEl = block.querySelector('[data-aue-label="Video alt text"]');
  if (urlAnchor) url = urlAnchor.getAttribute('href');
  if (altEl) alt = altEl.textContent.trim();

  const videoId = extractYouTubeId(url);

  if (videoId) {
    // Create wrapper for thumbnail
    const wrapper = document.createElement('div');
    wrapper.className = 'video-thumbnail-container';

    // Create thumbnail image
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    img.alt = alt || 'Video thumbnail';
    img.className = 'video-thumbnail';
    img.setAttribute('loading', 'lazy');

    // Create play icon overlay
    const playBtn = document.createElement('span');
    playBtn.className = 'video-play-button';
    playBtn.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)"/><polygon points="26,20 48,32 26,44" fill="#fff"/></svg>`;

    // Overlay setup
    wrapper.appendChild(img);
    wrapper.appendChild(playBtn);

    // Replace <a> parent <p> with the thumbnail (in .video block's DOM)
    if (urlAnchor && urlAnchor.closest('p')) {
      urlAnchor.closest('p').replaceWith(wrapper);
    }

    // Interactivity: click = replace with YouTube iframe
    wrapper.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.title = alt || "YouTube video";
      iframe.className = 'video-embed';
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('frameborder', '0');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      wrapper.replaceWith(iframe);
    });

  }

  // Side-by-side styling
  if (getOptions(block).includes('side-by-side')) {
    block.querySelector(':scope > div:first-child').classList.add('video-wrapper');
  } else {
    block.querySelector('.video-thumbnail-container,.video-embed')?.closest('div')?.classList.add('video-wrapper');
  }
}
