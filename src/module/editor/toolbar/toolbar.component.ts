import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mat-markdown-editor-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class EditorToolbarComponent {
  @Input() public options: any;
  @Input() public isFullScreen: boolean;
  @Input() private editor: any;
  @Output() public onTogglePreview = new EventEmitter();
  @Output() public onFullScreen = new EventEmitter();

  public previewIsOpen = true;
  private _editorResizeTimer: any;

  constructor(private _renderer: Renderer2) {}

  insertContent(type: string, customContent?: string) {
    if (!this.editor) {
      return;
    }
    let selectedText = this.editor.getSelectedText();
    let startSize = 2;
    let initText = '';
    const isSelected = !!selectedText;
    const range = this.editor.selection.getRange();
    switch (type) {
      case 'Bold':
        initText = 'Bold Text';
        selectedText = `**${selectedText || initText}**`;
        break;
      case 'Italic':
        initText = 'Italic Text';
        selectedText = `*${selectedText || initText}*`;
        startSize = 1;
        break;
      case 'Heading':
        initText = 'Heading';
        selectedText = `# ${selectedText || initText}`;
        break;
      case 'Reference':
        initText = 'Reference';
        selectedText = `> ${selectedText || initText}`;
        break;
      case 'Link':
        selectedText = `[${selectedText}](http://)`;
        startSize = 1;
        break;
      case 'Image':
        selectedText = `![](http://)`;
        break;
      case 'Ul':
        selectedText = `- ${selectedText || initText}`;
        break;
      case 'Ol':
        selectedText = `1. ${selectedText || initText}`;
        startSize = 3;
        break;
      case 'Code':
        initText = 'Source Code';
        selectedText =
          '```language\r\n' + (selectedText || initText) + '\r\n```';
        startSize = 3;
        break;
      case 'Custom':
        selectedText = customContent;
        startSize = 0;
        break;
    }
    this.editor.session.replace(range, selectedText);
    if (!isSelected) {
      range.start.column += startSize;
      range.end.column = range.start.column + initText.length;
      this.editor.selection.setRange(range);
    }
    this.editor.focus();
  }

  togglePreview() {
    this.previewIsOpen = !this.previewIsOpen;
    this.onTogglePreview.emit(this.previewIsOpen);
    this.editorResize();
  }

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this._renderer.setStyle(
      document.body,
      'overflowY',
      this.isFullScreen ? 'hidden' : 'auto'
    );
    this.onFullScreen.emit(this.isFullScreen);
    this.editorResize();
  }

  editorResize(timeOut: number = 100) {
    if (!this.editor) {
      return;
    }
    if (this._editorResizeTimer) {
      clearTimeout(this._editorResizeTimer);
    }
    this._editorResizeTimer = setTimeout(() => {
      this.editor.resize();
      this.editor.focus();
    }, timeOut);
  }
}
