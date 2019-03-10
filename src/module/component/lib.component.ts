import {
    Component,
    ViewChild,
    forwardRef,
    Renderer2,
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

declare let ace: any;
declare let marked: any;
declare let hljs: any;

@Component({
    selector: 'ngx-mde-component',
    templateUrl: './lib.component.html',
    styleUrls: ['./lib.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LibComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => LibComponent),
            multi: true,
        },
    ],
})
export class LibComponent
    implements
        ControlValueAccessor,
        Validator,
        OnInit,
        AfterViewInit,
        OnDestroy {
    @ViewChild('aceEditor') public aceEditorContainer: ElementRef;
    @Input() public options: MatMarkdownEditorOptions;

    public showPreviewPanel = true;
    public isFullScreen = false;
    public previewHtml: any;
    public sliderHeight: any;

    private _markdownValue: any;
    private _options: any = {};
    private _editor: any;
    private _markedOpt: any;
    private _editorResizeTimer: any;

    private _onChange = (_: any) => {};
    private _onTouched = () => {};

    public get markdownValue(): any {
        return this._markdownValue || '';
    }
    public set markdownValue(value: any) {
        this._markdownValue = value;
        this._onChange(value);

        if (
            this.options.preRender &&
            this.options.preRender instanceof Function
        ) {
            value = this.options.preRender(value);
        }
        if (value) {
            const html = marked(value || '', this._markedOpt);
            this.previewHtml = this._domSanitizer.bypassSecurityTrustHtml(html);
        }
    }

    constructor(
        @Attribute('required') public required: boolean = false,
        @Attribute('maxlength') public maxlength: number = -1,
        private _renderer: Renderer2,
        private _domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        const markedRender = new marked.Renderer();
        markedRender.code = (code: any, language: any) => {
            const validLang = !!(language && hljs.getLanguage(language));
            const highlighted = validLang
                ? hljs.highlight(language, code).value
                : code;
            return `<pre style="padding: 0; border-radius: 0;"><code class="hljs ${language}">${highlighted}</code></pre>`;
        };
        markedRender.table = (header: string, body: string) => {
            return `<table class="table table-bordered">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
        };
        markedRender.listitem = (text: any) => {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(
                        /^\s*\[ \]\s*/,
                        '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> '
                    )
                    .replace(
                        /^\s*\[x\]\s*/,
                        '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> '
                    );
                return `<li style="list-style: none;">${text}</li>`;
            } else {
                return `<li>${text}</li>`;
            }
        };
        const markedjsOpt = {
            renderer: markedRender,
            highlight: (code: any) => hljs.highlightAuto(code).value,
        };
        this._markedOpt = Object.assign(
            {},
            this.options.markedjsOpt,
            markedjsOpt
        );
    }

    ngAfterViewInit() {
        const editorElement = this.aceEditorContainer.nativeElement;
        this._editor = ace.edit(editorElement);
        this._editor.$blockScrolling = Infinity;
        this._editor.getSession().setUseWrapMode(true);
        this._editor.getSession().setMode('ace/mode/markdown');
        this._editor.setValue(this.markdownValue || '', 1);
        this._editor.setOption(
            'scrollPastEnd',
            this._options.scrollPastEnd || 0
        );

        this._editor.on('change', () => {
            this.markdownValue = this._editor.getValue();
        });
    }

    writeValue(value: any | Array<any>): void {
        setTimeout(() => {
            this.markdownValue = value;
            if (typeof value !== 'undefined' && this._editor) {
                this._editor.setValue(value || '', 1);
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

    insertContent(type: string, customContent?: string) {
        if (!this._editor) {
            return;
        }
        let selectedText = this._editor.getSelectedText();
        let startSize = 2;
        let initText = '';
        const isSelected = !!selectedText;
        const range = this._editor.selection.getRange();
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
            case 'Refrence':
                initText = 'Refrence';
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
        this._editor.session.replace(range, selectedText);
        if (!isSelected) {
            range.start.column += startSize;
            range.end.column = range.start.column + initText.length;
            this._editor.selection.setRange(range);
        }
        this._editor.focus();
    }

    togglePreview() {
        this.showPreviewPanel = !this.showPreviewPanel;
        this.editorResize();
    }

    previewPanelClick(event: Event) {
        if (this.options.enablePreviewContentClick !== true) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }

    fullScreen() {
        this.isFullScreen = !this.isFullScreen;
        this._renderer.setStyle(
            document.body,
            'overflowY',
            this.isFullScreen ? 'hidden' : 'auto'
        );
        this.editorResize();
    }

    editorResize(timeOut: number = 100) {
        if (!this._editor) {
            return;
        }
        if (this._editorResizeTimer) {
            clearTimeout(this._editorResizeTimer);
        }
        this._editorResizeTimer = setTimeout(() => {
            this._editor.resize();
            this._editor.focus();
        }, timeOut);
    }

    ngOnDestroy() {
        return this._editor && this._editor.destroy();
    }
}
