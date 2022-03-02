setInterval(checkForParent, 200);

function checkForParent() {
  const parent = document.querySelector('div.py-1 > div:nth-child(2)');

  if (
    parent !== null
    && Array.from(parent.childNodes.values())
         .filter(n => n.classList !== undefined && n.classList.contains('copy-raw'))
         .length === 0
  ) {
    addCopyButton(parent);
  }
}

function addCopyButton(parent) {
  const button = document.createElement('button');

  button.innerText = 'Copy';
  button.classList.add('btn-octicon', 'tooltipped', 'copy-raw');
  button.addEventListener('click', e => {
    fetch(getRawContentUrl())
      .then(async content => {
        navigator.clipboard.writeText(await content.text());
      });
  });

  parent.appendChild(button);
}

function getRawContentUrl() {
  const path = window.location.href.split('/');
  path[5] = 'raw';
  return path.join('/');
}
