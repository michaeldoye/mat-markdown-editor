import { Injectable } from '@angular/core';

@Injectable()
export class LibService {
  constructor() { }
  sayHello(name?: string) {
    return `Hello ${name || 'Stanger'}!`;
  }
}
