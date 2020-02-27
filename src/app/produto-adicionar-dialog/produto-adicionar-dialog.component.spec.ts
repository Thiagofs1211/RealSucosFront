import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAdicionarDialogComponent } from './produto-adicionar-dialog.component';

describe('ProdutoAdicionarDialogComponent', () => {
  let component: ProdutoAdicionarDialogComponent;
  let fixture: ComponentFixture<ProdutoAdicionarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoAdicionarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoAdicionarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
