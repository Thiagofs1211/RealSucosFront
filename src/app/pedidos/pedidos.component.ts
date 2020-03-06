import { Component, OnInit, Input, Output } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { RestService } from '../rest.service';
import { MatDialog } from '@angular/material/dialog';
import { CriarPedidoDialogComponent } from '../criar-pedido-dialog/criar-pedido-dialog.component';
import { pedidoData } from './pedidoData';
import { EventEmitter } from '@angular/core';;
import { filtro } from './filtro';
import { InformacoesClienteDialogComponent } from '../informacoes-cliente-dialog/informacoes-cliente-dialog.component';
import { InfoPedidoDialogComponent } from '../info-pedido-dialog/info-pedido-dialog.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  totalRec : number;
  page: number = 1;
  clientes: Cliente[];
  searchString: String;
  clienteSelected: Cliente;
  pedidosCliente: pedidoData[];
  dataFim: Date;
  dataInicio: Date;
  filtro: filtro;

  constructor(public service: RestService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getter();
  }

  getter(){
    this.service.listarClientes().subscribe((data: Cliente[]) =>{
      this.clientes = data;
      console.log("Sucesso listar Clientes.");
    }, error => {
      console.log("erro: " + error);
    })
  }

  getterNome(){
    this.service.listarClientesNome(this.searchString).subscribe((data: Cliente[]) => {
      this.clientes = data;
      console.log("Sucesso buscar Cliente pelo nome.");
    }, error => { 
      if(error.status == 404){
        this.clientes = [];
      }
      console.log("erro: " + error);
    })
  }

  habilitarButtons(){
    (<HTMLInputElement> document.getElementById("buttonListar")).disabled = false;
    (<HTMLInputElement> document.getElementById("buttonCriar")).disabled = false;
  }

  procurarPedidos(){
    (<HTMLInputElement> document.getElementById("pedidoInicio")).hidden = true;
    (<HTMLInputElement> document.getElementById("litarPedidosCliente")).hidden = false;
    (<HTMLInputElement> document.getElementById("buttonsListarCliente")).hidden = true;
    (<HTMLInputElement> document.getElementById("buttonsListar")).hidden = false;

    this.dataInicio = null;
    this.dataFim = null;

    this.pedidosCliente = [];
  }

  ListarPedidosCliente(){
    (<HTMLInputElement> document.getElementById("pedidoInicio")).hidden = true;
    (<HTMLInputElement> document.getElementById("litarPedidosCliente")).hidden = false;
    (<HTMLInputElement> document.getElementById("buttonsListarCliente")).hidden = false;
    (<HTMLInputElement> document.getElementById("buttonsListar")).hidden = true;

    this.dataInicio = null;
    this.dataFim = null;

    this.pedidosCliente = [];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CriarPedidoDialogComponent, {
      width: '1000px', height: '700px',
      data: {
        cliente: this.clienteSelected
      }
    });
  }

  pesquisarPedidosCliente() {
    if(this.verificaFiltros()){
      this.filtro = new filtro;
      this.filtro.idCliente = this.clienteSelected.idCliente;
      this.filtro.dataInicio = this.dataInicio;
      this.filtro.dataFim = this.dataFim;
      this.service.lisarPedidosCliente(this.filtro).subscribe(data => {
        this.pedidosCliente = data;
        this.totalRec = this.pedidosCliente.length;
        console.log("Pedidos listados com sucesso.");
      }, error => {
        console.log("Erro ao listar pedidos.");
        console.log(error);
      })
    }
  }

  verificaFiltros() {
    if((<HTMLInputElement> document.getElementById("dataInicio")).value == "" || (<HTMLInputElement> document.getElementById("dataFim")).value == ""){
      alert("Preencha a data de início e a data fim.");
      return false;
    }
    if((<HTMLInputElement> document.getElementById("dataInicio")).value > (<HTMLInputElement> document.getElementById("dataFim")).value){
      alert("Data inicio não pode ser maior do que a data fim.")
      return false;
    }
    if((this.dataFim.getTime() - this.dataInicio.getTime()) / (1000 * 3600 * 24) > 31){
      alert("Período entre as datas maior do que 31 dias.");
      return false;
    }
    return true;
  }

  voltarListarPedidoCliente() {
    (<HTMLInputElement> document.getElementById("pedidoInicio")).hidden = false;
    (<HTMLInputElement> document.getElementById("litarPedidosCliente")).hidden = true;
    (<HTMLInputElement> document.getElementById("buttonsListarCliente")).hidden = true;
    (<HTMLInputElement> document.getElementById("buttonsListar")).hidden = true;
  }

  openDialogInfo(item: pedidoData){
    const dialogRef = this.dialog.open(InfoPedidoDialogComponent, {
      width: '1000px', height: '700px',
      data: {
        pedidoData: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pesquisarPedidosCliente();
    });
  }

  pesquisarPedidos() {
    if(this.verificaFiltros()){
      this.service.listarPedidos(this.dataInicio+'', this.dataFim+'').subscribe( data => {
        this.pedidosCliente = data;
        this.totalRec = this.pedidosCliente.length;
        console.log("Pedidos listados com sucesso.");
      }, error => {
        console.log("Erro ao listar pedidos.");
        console.log(error);
      })
    }
  }

}
