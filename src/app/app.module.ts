import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxTabsModule } from 'igniteui-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoAdicionarDialogComponent } from './produto-adicionar-dialog/produto-adicionar-dialog.component'
import { MaterialModule } from './material.module';
import { ProdutoEditarDialogComponent } from './produto-editar-dialog/produto-editar-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProdutosComponent,
    PedidosComponent,
    ProdutoAdicionarDialogComponent,
    ProdutoEditarDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxNavbarModule,
    BrowserAnimationsModule,
    IgxTabsModule,
    HttpClientModule,
    MatIconModule,
    MaterialModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [ProdutoAdicionarDialogComponent]
})
export class AppModule {
}
