import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComponenteTab1Component } from './componente-tab1.component';

describe('ComponenteTab1Component', () => {
  let component: ComponenteTab1Component;
  let fixture: ComponentFixture<ComponenteTab1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteTab1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
