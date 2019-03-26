window.addEventListener("load", main);

function main() {
  initializeGraphEditorForm();
  initializeHamburger();
}


function initializeGraphEditorForm() {
  let canvas = document.querySelector("canvas");

  updateGraph();

  let updateButton = document.getElementById('input-button');
  updateButton.addEventListener('click', (e)=>{
      updateGraph();
  });

  let clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
  })


  let saveButton = document.getElementById('save');
  saveButton.addEventListener('click', () => {
      console.log(getInput())
  })
}

function updateGraph() {
  getInput()
  eval(input.value);
}

function getInput() {
  let input = document.getElementById('input');
  return input.value
}

function initializeHamburger() {
  // Hamburger Toggle
  let mobileNav = document.querySelector('.mobile-nav');
  mobileNav.addEventListener('click', menuToggle);

  window.addEventListener('hashchange', () => {
    console.log('you are now viewing a new page');
  })

  let examples = document.querySelectorAll('.links a')
  examples.forEach((link) => { 
    link.addEventListener('click', (e) => {
      let hash = e.target.hash.split('#');
      let url = hash[1];
      if (url) {
        fetch(`/pages/${url}.html`).then(results => results.text())
          .then(text => {
            let page = document.getElementById('content');
            page.innerHTML = text;
          })
      }
    })
  })
}

function menuToggle() {
    let nav = document.querySelector('.links');
    nav.classList.toggle('menu-closed');
}

