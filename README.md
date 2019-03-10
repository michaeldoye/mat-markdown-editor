<p style="text-align:center;">
<svg style="height:256px;width:256px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186 200"><defs><style>.cls-1{fill:#e57373;}.cls-2{fill:#ef5350;}.cls-3{fill:#fff;}</style></defs><title>forms</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="92.8 0 92.8 0 92.8 0 0 33.3 14 156.1 92.8 200 92.8 200 92.8 200 171.7 156.1 186 33.3 92.8 0"/><polygon class="cls-2" points="92.8 0 92.8 22.2 92.8 22.2 92.8 123.2 92.8 123.2 92.8 200 92.8 200 171.7 156.1 186 33.3 92.8 0"/><path class="cls-3" d="M138.7,90H47c-2.4,0-4-2.3-4-5.6V55.6c0-3.3,1.6-5.6,4-5.6h92.1c2.3,0,3.9,2.3,3.9,5.6V84.4C142.6,87.7,141,90,138.7,90Z"/><path class="cls-3" d="M139.8,120H96.3c-2,0-3.3-1.4-3.3-3.6V103.6c0-2.2,1.3-3.6,3.3-3.6h43.5c1.9,0,3.2,1.4,3.2,3.6v12.8A3.4,3.4,0,0,1,139.8,120Z"/><path class="cls-3" d="M139.8,150H96.3c-2,0-3.3-1.5-3.3-3.8V133.8c0-2.3,1.3-3.8,3.3-3.8h43.5c1.9,0,3.2,1.5,3.2,3.8v12.4C143,148.1,141.7,150,139.8,150Z"/><rect class="cls-3" x="43" y="100" width="40" height="50" rx="4" ry="4"/></g></g></svg>
</p>
# Mat Markdown Editor - Material design markdown editor

[![npm version](https://badge.fury.io/js/mat-markdown-editor.svg)](https://badge.fury.io/js/mat-markdown-editor),
[![Build Status](https://travis-ci.org/michaeldoye/mat-markdown-editor.svg?branch=master)](https://travis-ci.org/michaeldoye/mat-markdown-editor)
[![Coverage Status](https://coveralls.io/repos/github/michaeldoye/mat-markdown-editor/badge.svg?branch=master)](https://coveralls.io/github/michaeldoye/mat-markdown-editor?branch=master)
[![dependency Status](https://david-dm.org/michaeldoye/mat-markdown-editor/status.svg)](https://david-dm.org/michaeldoye/mat-markdown-editor)
[![devDependency Status](https://david-dm.org/michaeldoye/mat-markdown-editor/dev-status.svg?branch=master)](https://david-dm.org/michaeldoye/mat-markdown-editor#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/michaeldoye/mat-markdown-editor.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://michaeldoye.github.io/mat-markdown-editor

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `mat-markdown-editor` via:
```shell
npm install --save mat-markdown-editor
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
import { LibModule } from 'mat-markdown-editor';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'mat-markdown-editor';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'mat-markdown-editor';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2019 Michael Doye. Licensed under the MIT License (MIT)

