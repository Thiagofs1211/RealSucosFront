import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEditarDialogComponent } from './produto-editar-dialog.component';

describe('ProdutoEditarDialogComponent', () => {
  let component: ProdutoEditarDialogComponent;
  let fixture: ComponentFixture<ProdutoEditarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoEditarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoEditarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
