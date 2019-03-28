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
    editForm.id = "edit-form";

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

    const shareButton = document.createElement('button');
    shareButton.id = 'share';
    shareButton.textContent = "Share Image";
    shareButton.addEventListener('click', (e) => {e.preventDefault(); this.renderShareImageModal()});

    editForm.appendChild(editor);
    editForm.appendChild(select);
    editForm.appendChild(runCodeButton);
    editForm.appendChild(copyButton);
    editForm.appendChild(saveButton);
    editForm.appendChild(shareButton);
    section.appendChild(editForm);

    content.appendChild(section);    
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
              console.log(ex);
              const option = this.renderSelectOption(ex.title);
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
      console.log(err);
      const context = this.canvas.getContext('2d');
      context.font = "12pt Sans-Serif";
      context.fillStyle = "darkorange";
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
    const img = this.canvas.toDataURL('image/jpeg', 1);
    this.saveBase64AsFile(img, "test.png");
  }

  saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }

  shareImage(e) {
    e.preventDefault();
    const image = this.canvas.toDataURL('image/jpeg', 1);
    const javascript = this.editor.getValue();
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#example-description').value;
    const graphType = document.querySelector('#graph-type-select').value;

    postUserExample({title, description, "graph-type": graphType, javascript, image })
    document.querySelector('#share-example-container').remove();
  }

  renderShareImageModal() {
    const formContainer = document.createElement('div');
    formContainer.id = 'share-example-container'
    const form = document.createElement('form');
    
    
    const titleLabel = document.createElement('label');
    titleLabel.textContent = "Title";
    titleLabel.setAttribute("for", "title");
    const title = document.createElement('input');
    title.id = "title";
    title.placeholder = "Title";

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = "Description";
    descriptionLabel.setAttribute("for", "description");
    const description = document.createElement('textarea');
    description.id = "example-description";
    description.placeholder = "Description";

    const graphTypeSelectLabel = document.createElement('label');
    graphTypeSelectLabel.textContent = "Graph Type";
    graphTypeSelectLabel.setAttribute("for", "graph-type");

    const select = document.createElement('select');
    select.id = "graph-type-select"
    select.appendChild(this.renderSelectOption('line'));
    select.appendChild(this.renderSelectOption('line with points'));
    select.appendChild(this.renderSelectOption('bezier'));
    select.appendChild(this.renderSelectOption('scatter'));

    const shareButton = document.createElement('button');
    shareButton.id = 'submit-share';
    shareButton.textContent = "Share";
    shareButton.addEventListener('click', this.shareImage.bind(this));

    form.appendChild(titleLabel);
    form.appendChild(title);
    form.appendChild(descriptionLabel);
    form.appendChild(description);
    form.appendChild(graphTypeSelectLabel);
    form.appendChild(select);
    form.appendChild(shareButton);

    formContainer.appendChild(form);

    document.body.appendChild(formContainer);
  }

  renderSelectOption(value) {
    const option = document.createElement('option');
    option.id = value.split(" ").join("-");
    option.value = value;
    option.textContent = value[0].toUpperCase() + value.slice(1);
    return option;
  }
}