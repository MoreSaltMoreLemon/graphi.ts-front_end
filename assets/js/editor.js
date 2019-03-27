class Editor {

  constructor () {
    this.editor;
    this.canvas;
  }
  
  renderCanvasAndEditor() {
    const content = document.getElementById('content');
    
    const canvas = document.querySelector('canvas');
    canvas.id = 'graph';
    this.canvas = canvas;

    const section = document.createElement('section');
    section.id = 'text-editor-form';

    const editor = document.createElement('div');
    editor.id = 'editor';
    // editor.style.height = "400px";
    // editor.style.width = "900px";

    const editForm = document.createElement('form');

    const select = document.createElement('select');
    select.id = 'graph-type';

    const runCodeButton = document.createElement('button');
    runCodeButton.id = 'run';
    runCodeButton.textContent = "Run Code";
    runCodeButton.addEventListener('click', (e)=> {e.preventDefault(); this.updateGraph()});

    const copyButton = document.createElement('button');
    copyButton.id = 'copy';
    copyButton.textContent = "Copy";
    copyButton.addEventListener('click', (e) => {e.preventDefault(); this.copyEditorContents()})

    const saveButton = document.createElement('button');
    saveButton.id = 'save';
    saveButton.textContent = "Save Image";
    saveButton.addEventListener('click', (e) => {e.preventDefault(); this.saveImage()});

    editForm.appendChild(editor);
    editForm.appendChild(select);
    editForm.appendChild(runCodeButton);
    editForm.appendChild(copyButton);
    editForm.appendChild(saveButton);
    section.appendChild(editForm);

    // content.appendChild(canvas);
    content.appendChild(section);

    // canvas.style.display = "block";
    // section.style.display = "block";
    console.log("OHHHH YEAH")
  }

  initializeEditor() {
    this.editor = ace.edit('editor');
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.setOption("enableLiveAutocompletion", true);
    this.editor.commands.addCommand({
        name: "showKeyboardShortcuts",
        bindKey: {win: "Ctrl-s", mac: "Cmd-s"},
        exec: (editor) => { this.updateGraph() }
    })
  }

  populateSelectOptions(examples) {
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
      this.updateEditor(example.javascript);
      this.updateGraph();
    })
  
    const initialGraphExample = examples.find(ex => ex.title === select.value)
    // console.log(initialGraphExample);
    this.updateEditor(initialGraphExample.javascript);
    this.updateGraph(initialGraphExample.javascript); 
  }

  updateGraph() {
    this.clearCanvas();
    const input = this.editor.getValue();
    try {
      eval(input);
    } catch(err) {
      const context = this.canvas.getContext('2d');
      context.font = "12pt Sans-Serif";
      context.fillStyle = "Red";
      context.fillText(`${err.name}: ${err.message}`, 10, this.canvas.height-10);
    }
  }

  updateEditor(textContent) {
    this.editor.setValue(textContent);
    this.editor.clearSelection();
  }

  copyEditorContents() {
    this.editor.selectAll()
    document.execCommand("copy");
    this.editor.clearSelection();
  }

  clearCanvas() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  saveImage() {
    const img = this.canvas.toDataURL();
    this.saveBase64AsFile(img, "test.png");
  }

  saveBase64AsFile(base64, fileName) {

    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }
}