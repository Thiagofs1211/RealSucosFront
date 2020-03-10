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
import { AdicionarClienteDialogComponent } from './adicionar-cliente-dialog/adicionar-cliente-dialog.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EditarClienteDialogComponent } from './editar-cliente-dialog/editar-cliente-dialog.component';
import { InformacoesClienteDialogComponent } from './informacoes-cliente-dialog/informacoes-cliente-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { CriarPedidoDialogComponent } from './criar-pedido-dialog/criar-pedido-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { DateFormat } from './DateFormat';
import { InfoPedidoDialogComponent } from './info-pedido-dialog/info-pedido-dialog.component';
import { NgxCurrencyModule } from "ngx-currency";
import {NgxPaginationModule} from 'ngx-pagination';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

export var options: Partial<IConfig> | (() => Partial<IConfig>);

export const customCurrencyMaskConfig = {
  align: "center",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProdutosComponent,
    PedidosComponent,
    ProdutoAdicionarDialogComponent,
    ProdutoEditarDialogComponent,
    AdicionarClienteDialogComponent,
    EditarClienteDialogComponent,
    InformacoesClienteDialogComponent,
    CriarPedidoDialogComponent,
    InfoPedidoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxNavbarModule,
    BrowserAnimationsModule,
    IgxTabsModule,
    HttpClientModule,
    MatIconModule,
    MaterialModule,
    NgxMaskModule.forRoot(options),
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [HttpClient, MatDatepickerModule,{ provide: DateAdapter, useClass: DateFormat }, { provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent],
  entryComponents: [ProdutoAdicionarDialogComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
  }
}
