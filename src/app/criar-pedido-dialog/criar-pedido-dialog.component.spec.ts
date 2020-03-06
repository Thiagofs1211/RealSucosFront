import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPedidoDialogComponent } from './criar-pedido-dialog.component';

describe('CriarPedidoDialogComponent', () => {
  let component: CriarPedidoDialogComponent;
  let fixture: ComponentFixture<CriarPedidoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarPedidoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
