import {
  Component,
  ViewChild,
  forwardRef,
  Attribute,
  Input,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMarkdownEditorOptions } from '../lib.interface';
import { markDownCode, markDownTable, markDownListItem } from '../utils';

declare let ace: any;
declare let marked: any;
declare let hljs: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mat-markdown-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatMarkdownEditorComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MatMarkdownEditorComponent),
      multi: true,
    },
  ],
})
export class MatMarkdownEditorComponent
  implements ControlValueAccessor, Validator, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aceEditor') public aceEditorContainer: ElementRef;
  @Input() public options: MatMarkdownEditorOptions;

  public showPreviewPanel = true;
  public isFullScreen = false;
  public previewHtml: any;
  public editor: any;

  private _renderMarkTimeout: any;
  private _markdownValue: any;
  private _options: any = {};
  private _markedOpt: any;

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  public get markdownValue(): any {
    return this._markdownValue || '';
  }
  public set markdownValue(value: any) {
    this._markdownValue = value;
    this._onChange(value);

    if (this.options.preRender && this.options.preRender instanceof Function) {
      value = this.options.preRender(value);
    }
    if (value !== null && value !== undefined) {
      if (this._renderMarkTimeout) {
        clearTimeout(this._renderMarkTimeout);
      }
      this._renderMarkTimeout = setTimeout(() => {
        const html = marked(value || '', this._markedOpt);
        this.previewHtml = this._domSanitizer.bypassSecurityTrustHtml(html);
      }, 100);
    }
  }

  constructor(
    @Attribute('required') public required: boolean = false,
    @Attribute('maxlength') public maxlength: number = -1,
    private _domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const editorElement = this.aceEditorContainer.nativeElement;
    this.editor = ace.edit(editorElement);

    const markedRender = new marked.Renderer();
    markedRender.code = markDownCode;
    markedRender.table = markDownTable;
    markedRender.listitem = markDownListItem;
    const markedjsOpt = {
      renderer: markedRender,
      highlight: (code: any) => hljs.highlightAuto(code).value,
    };
    this._markedOpt = Object.assign({}, this.options.markedjsOpt, markedjsOpt);
  }

  ngAfterViewInit() {
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setUseWrapMode(true);
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.setValue(this.markdownValue || '', 1);
    this.editor.setOption('scrollPastEnd', this._options.scrollPastEnd || 0);

    this.editor.on('change', () => {
      this.markdownValue = this.editor.getValue();
    });
  }

  writeValue(value: any | Array<any>): void {
    setTimeout(() => {
      this.markdownValue = value;
      if (typeof value !== 'undefined' && this.editor) {
        this.editor.setValue(value || '', 1);
      }
    }, 1);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors {
    let result: any = null;
    if (this.required && this.markdownValue.length === 0) {
      result = { required: true };
    }
    if (this.maxlength > 0 && this.markdownValue.length > this.maxlength) {
      result = { maxlength: true };
    }
    return result;
  }

  onTogglePreview(isOpen: boolean) {
    this.showPreviewPanel = isOpen;
  }

  onFullScreen(isFullScreen: boolean) {
    this.isFullScreen = isFullScreen;
    this.editor.resize();
  }

  previewPanelClick(event: Event) {
    if (this.options.enablePreviewContentClick !== true) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  ngOnDestroy() {
    return this.editor && this.editor.destroy();
  }
}
