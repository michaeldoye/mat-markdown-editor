import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';
import { MaterialModule } from './material.module';
import { ResizableModule } from 'angular-resizable-element';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorResizeListenerComponent } from './component/resize-listener/resize-listener.component';

// Export module's public API
export { LibComponent } from './component/lib.component';
export { LibService } from './service/lib.service';
export { EditorResizeListenerComponent } from './component/resize-listener/resize-listener.component';
export { MdEditorOption, MarkedjsOption } from './lib.interface';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ResizableModule,
    FlexLayoutModule,
  ],
  exports: [LibComponent, EditorResizeListenerComponent],
  declarations: [LibComponent, EditorResizeListenerComponent]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [LibService]
    };
  }
}
