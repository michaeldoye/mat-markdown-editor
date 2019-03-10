import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatMarkdownEditorModule } from 'mat-markdown-editor'
import { FormsModule } from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [
    CommonModule,
    MatMarkdownEditorModule.forRoot(),
    HomeRoutingModule,
    FormsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
