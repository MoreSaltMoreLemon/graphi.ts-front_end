const EXAMPLES_URL = "http://localhost:3000/api/v1/examples"
const USER_EXAMPLES_URL = "http://localhost:3000/api/v1/user_examples"
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
  return await httpRequest(EXAMPLES_URL)
    .then(response => response.json())
}

async function getUserExamples() {
  return await httpRequest(USER_EXAMPLES_URL)
  .then(response => response.json())
} 

async function postUserExample(userExample) {
  return await httpRequest(USER_EXAMPLES_URL, "post", userExample)
  .then(response => response.json())
}

function httpRequest(url, method='GET', data={}) {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
  if (method.toLowerCase() === 'get') delete init.body;
  if (method.toLowerCase() === 'post' && init.body.id) delete init.body.id;
  
  return fetch( url, init);
}

function initializeMenu() {
  // Hamburger Toggle
  let mobileNav = document.querySelector('.mobile-nav');
  mobileNav.addEventListener('click', menuToggle);
  menuLinks();
}

function clearContent() {
  const content = document.getElementById('content');
  while (content.firstChild) content.firstChild.remove();
}

function menuToggle() {
    let nav = document.querySelector('.links');
    nav.classList.toggle('menu-closed');
}

function menuLinks() {
  const examples = document.getElementById('examples');
  const docs = document.getElementById('docs');

  examples.addEventListener('click', () => {
    clearContent();
    displayAllUserExamples();
    menuToggle();
  });

  docs.addEventListener('click', () => {
    clearContent();
    renderDocs();
    menuToggle();
  });
}

async function displayAllUserExamples() {
  const userExamples = await getUserExamples();
  const content = document.getElementById('content');
  content.appendChild(renderExamples(userExamples));
}

async function renderDocs() {
  const docsMd = await fetch('DOCS.md').then(results => results.text())
  const content = document.getElementById('content');
  const mdContainer = document.createElement('section');
  mdContainer.classList.add("docs")

  var converter = new showdown.Converter(),
    text      = docsMd
    html      = converter.makeHtml(text);
  mdContainer.innerHTML = html
  content.appendChild(mdContainer);
  hljs.initHighlighting();
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

function renderExamples(examples) {
  const exampleContainer = document.createElement('div')
  exampleContainer.id = "example-container"
  
  examples.forEach(ex => exampleContainer.appendChild(renderExample(ex)));
  return exampleContainer;
}

function renderExample(example) {
  const exampleContainer = document.createElement('div');
  exampleContainer.className = "example";

  const image = document.createElement('img');
  image.src = example.image;
  
  const exampleContent = document.createElement('div');
  exampleContent.id = "example-content";

  const title = document.createElement('h1');
  title.textContent = example.title;

  const description = document.createElement('h3');
  description.textContent = example.description;

  const javascript = document.createElement('p');
  javascript.textContent = example.javascript.slice(0, 140) + '...';
  
  exampleContent.appendChild(title);
  exampleContent.appendChild(description);
  exampleContent.appendChild(javascript);
  exampleContent.className = 'info';

  const javascriptHidden = document.createElement('input');
  javascriptHidden.textContent = example.javascript;
  javascriptHidden.id = 'code';
  javascriptHidden.style.display = 'none';

  exampleContainer.addEventListener('click', (e) => {
    document.getElementById('code')
    document.execCommand('copy');
  });

  exampleContainer.appendChild(javascriptHidden);
  exampleContainer.appendChild(image);
  exampleContainer.appendChild(exampleContent);

  return exampleContainer;
}