import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesClienteDialogComponent } from './informacoes-cliente-dialog.component';

describe('InformacoesClienteDialogComponent', () => {
  let component: InformacoesClienteDialogComponent;
  let fixture: ComponentFixture<InformacoesClienteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesClienteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
