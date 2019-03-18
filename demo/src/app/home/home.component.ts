import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import sdk from '@stackblitz/sdk'
import { MatMarkdownEditorOptions } from 'mat-markdown-editor'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public options: MatMarkdownEditorOptions = {
    enablePreviewContentClick: false,
    resizable: true,
    hideIcons: {},
    hideToolbar: false,
    height: '500px',
    mode: 'editor',
    toolbarColor: 'primary',
  }
  public content = '### Example Markdown'

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Home | mat-markdown-editor')
  }

  editOnStackBlitz() {
    sdk.openGithubProject('michaeldoye/mat-markdown-editor/tree/master/demo')
  }
}
