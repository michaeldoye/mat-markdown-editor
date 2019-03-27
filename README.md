<p align="center">
  <img width="256px" src="https://raw.githubusercontent.com/michaeldoye/mat-markdown-editor/master/demo/src/assets/forms.png">
</p>

# Material Design Markdown Editor

[![npm version](https://badge.fury.io/js/mat-markdown-editor.svg)](https://badge.fury.io/js/mat-markdown-editor)
[![Build Status](https://travis-ci.org/michaeldoye/mat-markdown-editor.svg?branch=master)](https://travis-ci.org/michaeldoye/mat-markdown-editor)
[![Coverage Status](https://coveralls.io/repos/github/michaeldoye/mat-markdown-editor/badge.svg?branch=master)](https://coveralls.io/github/michaeldoye/mat-markdown-editor?branch=master)
[![dependency Status](https://david-dm.org/michaeldoye/mat-markdown-editor/status.svg)](https://david-dm.org/michaeldoye/mat-markdown-editor)
[![devDependency Status](https://david-dm.org/michaeldoye/mat-markdown-editor/dev-status.svg?branch=master)](https://david-dm.org/michaeldoye/mat-markdown-editor#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/michaeldoye/mat-markdown-editor.svg)](https://greenkeeper.io/)

## Demo

View it in action at https://mat-markdown-editor.firebaseapp.com

Edit on StackBlitz: https://stackblitz.com/edit/angular-w4tejv

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)
* [Angular Material](https://material.angular.io/)

## Installation
Install above dependencies via *npm*. 

Now install `mat-markdown-editor` via:
```shell
npm install --save mat-markdown-editor
```

Add the following to your `index.html` (or [configure](https://nitayneeman.com/posts/how-to-add-third-party-library-in-angular-cli/) via `angular-cli.json`)
* [Marked JS](https://marked.js.org/#/README.md#README.md)
* [Hightlight JS](https://highlightjs.org/)
* [Ace Editor](https://ace.c9.io/)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.8/ace.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `mat-markdown-editor`:
```js
map: {
  'mat-markdown-editor': 'node_modules/mat-markdown-editor/bundles/mat-markdown-editor.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { MatMarkdownEditorModule } from 'mat-markdown-editor';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` MatMarkdownEditorModule.forRoot()`):
```js
import { MatMarkdownEditorModule } from 'mat-markdown-editor';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [MatMarkdownEditorModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` MatMarkdownEditorModule `:

```js
import { MatMarkdownEditorModule } from 'mat-markdown-editor';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [MatMarkdownEditorModule, ...], 
})
export class OtherModule {
}
```

## Usage

```js
import { Component } from '@angular/core';
import { MatMarkdownEditorOptions } from 'mat-markdown-editor';

@Component({
  selector: 'app-home',
  template: `
      <form #form="ngForm">
        <mat-markdown-editor
          [(ngModel)]="content"
          [options]="options"
          name="Content"
          maxlength="500"
          required>
        </mat-markdown-editor>
      </form>
  `,
})
export class HomeComponent {
  public options: MatMarkdownEditorOptions = {
    enablePreviewContentClick: false,
    resizable: true,
    showBorder: true,
    hideIcons: {},
    hideToolbar: false,
    height: '500px',
    mode: 'editor',
    toolbarColor: 'primary',
    preRender: this.preRender,
  };

  preRender(markDown: any) {
    // Here you have access to the markdown binding
    // before it is rendered
    return markDown;
  }
}
```
All options can be found [here](https://github.com/michaeldoye/mat-markdown-editor/blob/master/src/module/lib.interface.ts)

<a name="run-demo-app-locally"/>

## Run Demo App Locally

- [clone this repo](https://github.com/michaeldoye/mat-markdown-editor.git) by running
```bash
$ git clone https://github.com/michaeldoye/mat-markdown-editor.git
```

- link the **mat-markdown-editor** package

```bash
$ gulp link
```

- navigate to the demo app directory
```bash
$ cd demo
```

- install the dependencies
```bash
$ npm i
```

- run/start/serve the app
```bash
$ npm run start
```
or
```bash
$ ng serve --open
```
- the app is now hosted by `http://localhost:4200/`


<a name="development"/>

## Development

1. clone this [repo](https://github.com/michaeldoye/mat-markdown-editor.git)
2. Install the dependencies by running `npm i`
3. build the library `npm run build` or `gulp build`
4. Link the library `gulp link`
 5. Navigate to the demo app's directory
  - `cd demo`
  _ `npm i`
  _ `npm start`

## License

Copyright (c) 2019 Michael Doye. Licensed under the MIT License (MIT)

