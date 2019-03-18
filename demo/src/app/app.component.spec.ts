/* tslint:disable:no-unused-variable */
import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { FooterComponent } from './shared/footer/footer.component'

import {
  RouterOutletStubComponent,
  RouterLinkStubDirective,
} from '../testing/router-stubs'
import { Observable, of } from 'rxjs'

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {}

class RouterStub {
  events: Observable<Event> = of<Event>()
}

// @ts-ignore
describe('AppComponent', () => {
  // @ts-ignore
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        FooterComponent,
        RouterOutletStubComponent,
      ],
      providers: [{ provide: Router, useClass: RouterStub }],
    })
  }))
  // @ts-ignore
  it('should create', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    // @ts-ignore
    expect(app).toBeTruthy()
  }))
})
