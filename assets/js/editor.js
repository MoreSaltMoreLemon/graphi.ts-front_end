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

    const select = document.createElement('select');
    select.id = 'graph-type';

    const runCodeButton = document.createElement('button');
    runCodeButton.id = 'run';
    runCodeButton.textContent = "Run Code";
    runCodeButton.addEventListener('click', (e)=> this.updateGraph());

    const copyButton = document.createElement('button');
    copyButton.id = 'copy';
    copyButton.textContent = "Copy";
    copyButton.addEventListener('click', () => this.copyEditorContents())

    const saveButton = document.createElement('button');
    saveButton.id = 'save';
    saveButton.textContent = "Save Image";
    saveButton.addEventListener('click', () => this.saveImage());

    section.appendChild(editor);
    section.appendChild(select);
    section.appendChild(runCodeButton);
    section.appendChild(copyButton);
    section.appendChild(saveButton);

    content.appendChild(canvas);
    content.appendChild(section);
    console.log("OHHHH YEAH")
  }

  initializeEditor() {
    this.editor = ace.edit('editor');
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.setTheme("ace/theme/monokai");
    // this.editor.setValue("the new text here");
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
    eval(input);
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
    // const image = document.createElement('img');
    // image.src = img;
    this.saveBase64AsFile(img, "test.png");
  }

  saveBase64AsFile(base64, fileName) {

    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }
}