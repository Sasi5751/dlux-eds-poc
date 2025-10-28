export default function decorate(block) {
  // Cleanup unnecessary empty divs
  [...block.querySelectorAll('div')].forEach((div) => {
    if (
        !div.classList.contains('imageleftright-image') &&
        !div.classList.contains('imageleftright-content') &&
        div.children.length === 0 &&
        div.textContent.trim() === ""
    ) {
      div.remove();
    }
  });

  // Find/create image container
  let imgDiv = block.querySelector('.imageleftright-image');
  if (!imgDiv) {
    imgDiv = document.createElement('div');
    imgDiv.className = 'imageleftright-image';
    block.prepend(imgDiv);
  }
  imgDiv.innerHTML = "";

  // Find image inside nested <picture> or <img>
  let img = block.querySelector('picture img') || block.querySelector('img');
  if (img) {
    const newImg = img.cloneNode(true); // Don't move, clone to avoid breaking original DOM
    imgDiv.appendChild(newImg);
  }

  // Find/create content container
  let contentDiv = block.querySelector('.imageleftright-content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.className = 'imageleftright-content';
    block.append(contentDiv);
  }
  // Wipe previous content
  contentDiv.innerHTML = "";

  // Extract content from <p data-aue-prop="...">
  function getProp(prop) {
    const el = block.querySelector(`[data-aue-prop="${prop}"]`);
    return el ? el.textContent.trim() : "";
  }

  const orientation = getProp('orientation');
  const altText = getProp('altText');
  const title = getProp('title');
  const text = getProp('text');
  const ctaUrl = getProp('textContent_cta');
  const ctaText = getProp('textContent_ctaText');

  // Compose content
  if (title) {
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    contentDiv.appendChild(titleEl);
  }
  if (text) {
    const textEl = document.createElement('p');
    textEl.textContent = text;
    contentDiv.appendChild(textEl);
  }
  if (ctaUrl && ctaText) {
    const ctaEl = document.createElement('a');
    ctaEl.href = ctaUrl;
    ctaEl.textContent = ctaText;
    ctaEl.className = 'button';
    contentDiv.appendChild(ctaEl);
  }

  // Swap orientation
  if (orientation === "image-right") {
    block.classList.add("image-right");
  } else {
    block.classList.remove("image-right");
  }
}
