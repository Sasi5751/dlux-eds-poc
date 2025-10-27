// /blocks/video/video.js

function getOptions(block) {
  return [...block.classList].filter((c) => !['block', 'video'].includes(c));
}

// Helper: Extract YouTube ID from embed link
function extractYouTubeId(url) {
  const match = url.match(/(?:embed\/|v=|\/v\/|youtu\.be\/|\/shorts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function decorate(block) {
  block.querySelector(':scope > div:last-child').classList.add('content');
  block.querySelector('h1,h2,h3,h4,h5,h6').classList.add('title');

  // Find the videoUrl and videoAlt values in the block
  const urlEl = block.querySelector('.video-url');
  const altEl = block.querySelector('.video-alt');
  const videoUrl = urlEl ? urlEl.textContent.trim() : '';
  const videoAlt = altEl ? altEl.textContent.trim() : 'Video';

  const videoId = extractYouTubeId(videoUrl);

  if (videoId) {
    // Build the thumbnail image
    const thumbnail = document.createElement('img');
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnail.alt = videoAlt;
    thumbnail.className = 'video-thumbnail';
    thumbnail.style.cursor = 'pointer';

    // Create the play icon overlay (SVG)
    const playIcon = document.createElement('span');
    playIcon.className = 'video-play-button';
    playIcon.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)"/>
      <polygon points="26,20 48,32 26,44" fill="#fff"/>
    </svg>`;
    playIcon.style.position = 'absolute';
    playIcon.style.top = '50%';
    playIcon.style.left = '50%';
    playIcon.style.transform = 'translate(-50%, -50%)';
    playIcon.style.pointerEvents = 'none';

    // Create a wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'video-thumbnail-container';
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';

    wrapper.appendChild(thumbnail);
    wrapper.appendChild(playIcon);

    // Replace the plain text URL with the thumbnail+icon
    urlEl.replaceWith(wrapper);

    // On click, replace thumbnail with iframe
    wrapper.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.setAttribute('title', videoAlt);
      iframe.className = 'video-embed';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      wrapper.replaceWith(iframe);
    });
  }

  // Side-by-side styling as before
  if (getOptions(block).includes('side-by-side')) {
    block.querySelector(':scope > div:first-child').classList.add('video-wrapper');
  } else {
    block.querySelector('.video-thumbnail-container,.video-embed')?.closest('div')?.classList.add('video-wrapper');
  }
}
