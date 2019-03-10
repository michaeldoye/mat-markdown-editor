import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public options: any = {
    enablePreviewContentClick: false,
    resizable: true
  };
  public content: string;
  public mode = 'editor';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Home | mat-markdown-editor');
  }

  editOnStackBlitz() {
    sdk.openGithubProject('michaeldoye/mat-markdown-editor/tree/master/demo');
  }

  preRender(e: any) {
    console.log('e', e);
    return e;
  }
}
