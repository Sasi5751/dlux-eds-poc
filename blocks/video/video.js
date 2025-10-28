// /blocks/video/video.js

function extractYouTubeId(url) {
  // Accept both embed and typical watch formats
  const match = url.match(/(?:embed\/|v=|youtu\.be\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

// Ensures the stacking order:
// 1) .video-wrapper (thumbnail/iframe)
// 2) .video-alt-wrapper ([data-aue-prop="videoAlt"] container)
// 3) .content (block content)
export default function decorate(root) {
  const videoBlock = root.querySelector('.video.block');

  // Get video URL and alt text
  let url = '';
  let alt = '';
  const urlAnchor = videoBlock?.querySelector('a[href*="youtube.com"]');
  const altEl = root.querySelector('[data-aue-prop="videoAlt"]');
  if (urlAnchor) url = urlAnchor.getAttribute('href');
  if (altEl) alt = altEl.textContent.trim();

  const videoId = extractYouTubeId(url);

  // Create the thumbnail/iframe wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'video-wrapper';

  // Create thumbnail if not already iframe
  if (videoId) {
    const thumbCont = document.createElement('div');
    thumbCont.className = 'video-thumbnail-container';

    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    img.alt = alt || 'Video thumbnail';
    img.className = 'video-thumbnail';
    img.setAttribute('loading', 'eager');

    const playBtn = document.createElement('span');
    playBtn.className = 'video-play-button';
    playBtn.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)"/><polygon points="26,20 48,32 26,44" fill="#fff"/></svg>`;

    thumbCont.appendChild(img);
    thumbCont.appendChild(playBtn);

    thumbCont.addEventListener('click', () => {
      // Replace thumbnail with iframe
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.title = alt || "YouTube video";
      iframe.className = 'video-embed';
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('loading', 'eager');
      thumbCont.replaceWith(iframe);
    });

    wrapper.appendChild(thumbCont);
  }

  // Replace the original video block thumbnail (if present)
  const origThumbCont = videoBlock?.querySelector('.video-thumbnail-container');
  if (origThumbCont) origThumbCont.replaceWith(wrapper);
  else if (videoBlock) videoBlock.append(wrapper);

  // Ensure .video-wrapper is moved/stacked at top of root
  if (root.contains(wrapper)) root.prepend(wrapper);

  // Move the alt text div below video-wrapper
  if (altEl) {
    // Create a wrapper for styling if needed
    const altWrapper = document.createElement('div');
    altWrapper.className = 'video-alt-wrapper';
    altWrapper.appendChild(altEl.closest('div'));
    root.insertBefore(altWrapper, wrapper.nextSibling);
  }

  // Content remains below alt text
  const contentEl = root.querySelector('.content');
  if (contentEl) {
    root.append(contentEl); // Ensures always last
  }
}
