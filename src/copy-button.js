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

function addIcons(button) {
  const idle = document.createElement('span');
  idle.innerHTML = '<span id="copy-raw-idle" class="tooltipped tooltipped-nw cursor-pointer" aria-label="Copy raw contents"><svg height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-copy"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg></span>';

  const fetching = document.createElement('span');
  fetching.innerHTML = '<svg id="copy-raw-fetching" style="display: none;" width="16" height="16" viewBox="0 0 16 16" fill="none" class="anim-rotate"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" vector-effect="non-scaling-stroke"></circle><path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"></path></svg>';

  const success = document.createElement('span');
  success.innerHTML = '<span id="copy-raw-success" style="display: none;" class="tooltipped tooltipped-nw" aria-label="Copied!"><svg height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-check color-fg-success"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></span>';

  const error = document.createElement('span');
  error.innerHTML = '<span id="copy-raw-error" style="display: none;" class="tooltipped tooltipped-nw" aria-label="Something went wrong. Try again."><svg height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-alert color-fg-attention"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg></span>';

  button.append(idle, fetching, success, error);
}
