<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/michaeldoye/ngx-markdown-editor/master/demo/src/assets/forms.svg">
</p>

# Mat Markdown editor - Material design markdown editor

[![npm version](https://badge.fury.io/js/ngx-markdown-editor.svg)](https://badge.fury.io/js/ngx-markdown-editor),
[![Build Status](https://travis-ci.org/michaeldoye/ngx-markdown-editor.svg?branch=master)](https://travis-ci.org/michaeldoye/ngx-markdown-editor)
[![Coverage Status](https://coveralls.io/repos/github/michaeldoye/ngx-markdown-editor/badge.svg?branch=master)](https://coveralls.io/github/michaeldoye/ngx-markdown-editor?branch=master)
[![dependency Status](https://david-dm.org/michaeldoye/ngx-markdown-editor/status.svg)](https://david-dm.org/michaeldoye/ngx-markdown-editor)
[![devDependency Status](https://david-dm.org/michaeldoye/ngx-markdown-editor/dev-status.svg?branch=master)](https://david-dm.org/michaeldoye/ngx-markdown-editor#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/michaeldoye/ngx-markdown-editor.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://michaeldoye.github.io/ngx-markdown-editor

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-markdown-editor` via:
```shell
npm install --save ngx-markdown-editor
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-markdown-editor`:
```js
map: {
  'ngx-markdown-editor': 'node_modules/ngx-markdown-editor/bundles/ngx-markdown-editor.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-markdown-editor';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-markdown-editor';

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
import { LibModule } from 'ngx-markdown-editor';

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

