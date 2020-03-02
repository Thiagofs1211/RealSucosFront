import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarClienteDialogComponent } from './adicionar-cliente-dialog.component';

describe('AdicionarClienteDialogComponent', () => {
  let component: AdicionarClienteDialogComponent;
  let fixture: ComponentFixture<AdicionarClienteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarClienteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
