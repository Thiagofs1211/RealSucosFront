import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPedidoDialogComponent } from './info-pedido-dialog.component';

describe('InfoPedidoDialogComponent', () => {
  let component: InfoPedidoDialogComponent;
  let fixture: ComponentFixture<InfoPedidoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPedidoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
