const EXAMPLES_URL = "http://localhost:3000/api/v1/examples"
window.addEventListener("load", main);

async function main() {
  const examples = await getExamples();
  
  populationSelectFromExamples(examples);
  initializeGraphEditorForm();
  initializeHamburger();

  updateGraph();

  
  var editor = ace.edit("editor");
  
  editor.session.setMode("ace/mode/javascript");
  editor.setTheme("ace/theme/twilight");
  
  editor.setValue("the new text here");
  // editor.session.setValue("the new text here"); // set value and reset undo history
  console.log(editor.getValue()); 
}


function getInput() {
  let input = document.getElementById('input');
  return input.value
}

function setInput(inputText) {
  let input = document.getElementById('input');
  input.value = inputText;
}


async function getExamples() {
  return await fetch(EXAMPLES_URL)
    .then(response => response.json())
}

function populationSelectFromExamples(examples) {
  const select = document.getElementById('graph-type');

  examples.sort((a, b) => a.graph_type < b.graph_type ? -1 : 1)
          .forEach(ex => {
            const option = document.createElement('option');
            option.id = ex.graph_type;
            option.value = ex.title;
            option.textContent = ex.title;
        
            
        
            select.appendChild(option);
          });

  select.addEventListener('change', (e) => {
    const example = examples.find(ex => ex.title === select.value);
    setInput(example.javascript);
    updateGraph();
  })

  const initialGraphExample = examples.find(ex => ex.title === select.value)
  setInput(initialGraphExample.javascript);

  
}


function initializeGraphEditorForm() {
  let canvas = document.querySelector("canvas");

  updateGraph();

  let updateButton = document.getElementById('input-button');
  updateButton.addEventListener('click', (e)=>{
      updateGraph();
  });

  let clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => clearCanvas(canvas))


  let saveButton = document.getElementById('save');
  saveButton.addEventListener('click', () => {
      console.log("SAVE BUTTON:", getInput())
  })
}

function clearCanvas(canvas) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}


function updateGraph() {
  let canvas = document.querySelector("canvas");
  clearCanvas(canvas)
  const input = getInput()
  eval(input);
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

