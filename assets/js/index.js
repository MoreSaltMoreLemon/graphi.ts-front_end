const EXAMPLES_URL = "http://localhost:3000/api/v1/examples"
window.addEventListener("load", main);

async function main() {
  initializeMenu();

  const examples = await getExamples();

  const editor = new Editor();
  editor.renderCanvasAndEditor();
  editor.initializeEditor();
  editor.populateSelectOptions(examples);
  editor.updateGraph();

  window.setTimeout(animateHidingInitialDescription, 800);
}


async function getExamples() {
  return await fetch(EXAMPLES_URL)
    .then(response => response.json())
}

function initializeMenu() {
  // Hamburger Toggle
  let mobileNav = document.querySelector('.mobile-nav');
  mobileNav.addEventListener('click', menuToggle);
  menuLinks();
}

function menuToggle() {
    let nav = document.querySelector('.links');
    nav.classList.toggle('menu-closed');
}

function menuLinks() {
  window.addEventListener('hashchange', (e) => {
    let hash = location.hash.split('#');
      let url = hash[1];
      if (url) {
        fetch(`/pages/${url}.html`).then(results => results.text())
          .then(text => {
            let page = document.getElementById('content');
            page.innerHTML = text;
          })
      }
  })
}

function animateHidingInitialDescription() {
  const description = document.querySelector("#description");
  const blurb = document.getElementById('blurb');
  const canvas = document.querySelector('canvas');
  const section = document.querySelector('#text-editor-form');
  canvas.style.display = "block";
  section.style.display = "block";
  blurb.className = "hide";
  window.setTimeout(() => description.className = "hide", 800);
  window.setTimeout(() => {
    blurb.id = "hidden";
    description.id = "hidden";
  }, 1400)
}