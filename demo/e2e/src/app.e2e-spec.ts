import { NgxMarkdownEditorDemoPage } from './app.po';

describe('mat-markdown-editor-demo App', () => {
  let page: NgxMarkdownEditorDemoPage;

  beforeEach(() => {
    page = new NgxMarkdownEditorDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
