class Editor {
  constructor(editor, canvas) {
    this.editor = editor;
    this.canvas = editor;
    this.context = canvas.getContext('2d');
  }

  renderCanvasAndEditor() {
    const content = document.getElementById('content');
    content.appendChild(this.renderCanvas());
    content.appendChild(this.renderEditor());
  }

  renderCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'graph';
    return canvas;
  }

  renderEditor() {
    const section = document.createElement('section');
    section.id = 'text-editor-form';

    const editor = document.createElement('div');
    editor.id = 'editor';

    const select = document.createElement('section');
    select.id = 'graph-type';

    const updateButton = document.createElement('button');
    updateButton.id = 'update';

    const clearButton = document.createElement('button');
    clearButton.id = 'clear';

    const saveButton = document.createElement('button');
    saveButton.id = 'save';

    section.appendChild(editor);
    section.appendChild(select);
    section.appendChild(updateButton);
    section.appendChild(clearButton);
    section.appendChild(saveButton);

    return section;
  }

}