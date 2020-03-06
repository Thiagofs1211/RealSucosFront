import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';
import { Produto } from '../produtos/produtos';
import { pedidoData } from '../pedidos/pedidoData';
import { Pedido } from '../pedidos/pedido';
import { itemPedido } from '../pedidos/itemPedido';
import { itemPedidoPK } from '../pedidos/itemPedidoPK';

interface DialogData {
  cliente: Cliente
}

@Component({
  selector: 'app-criar-pedido-dialog',
  templateUrl: './criar-pedido-dialog.component.html',
  styleUrls: ['./criar-pedido-dialog.component.css']
})
export class CriarPedidoDialogComponent implements OnInit {

  produtos: Produto[];
  valorTotal: number = 0;
  desconto: number = 0;
  valorFinal: number = 0;
  pedidoData: pedidoData;
  pedido: Pedido;
  itemPedido: itemPedido[] = [];

  constructor(public dialogRef: MatDialogRef<CriarPedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: RestService) {
      if(data.cliente.comercio == "N"){
        this.getterProdutosAvulso();
      } else {
        this.getterProdutosComercio();
      }
     }

  ngOnInit(): void {
  }

  getterProdutosAvulso(){
    this.service.getProdutosAvulso().subscribe( (data: Produto[]) => {
        this.produtos = data;
    }, error => {
        console.log(error);
    });
  }

  getterProdutosComercio(){
    this.service.getProdutosComercio().subscribe( (data: Produto[]) => {
        this.produtos = data;
    }, error => {
      console.log(error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  habilitaQuantidade(i: any) {
    if(this.produtos[i].isChecked){
      (<HTMLInputElement> document.getElementById("quantidade"+i)).disabled = false;
    } else {
      (<HTMLInputElement> document.getElementById("quantidade"+i)).disabled = true;
      (<HTMLInputElement> document.getElementById("quantidade"+i)).value = '';
      this.calculaValorTotal();
    }
  }

  calculaValorTotal() {
    this.valorTotal = 0;
    for(var i = 0; i < this.produtos.length; i++){
      if(this.produtos[i].isChecked){
        this.valorTotal = this.valorTotal + (this.produtos[i].quantidade * this.produtos[i].preco);
      }
    }
    if(this.valorTotal > this.desconto) {
      this.valorFinal = this.valorTotal - this.desconto;
    } else {
      this.valorFinal = 0;
    }
  }

  aplicaDesconto(){
    if(this.valorTotal > this.desconto) {
      this.valorFinal = +(this.valorTotal - this.desconto).toFixed(2);
    } else{
      this.valorFinal = 0;
    }
  }

  salvarPedido(){
    debugger;
    this.pedido = new Pedido;
    this.pedido.cliente = this.data.cliente;
    this.pedido.desconto = this.desconto;
    this.pedido.valorTotal = this.valorFinal;

    for(var i = 0; i < this.produtos.length; i++){
      if(this.produtos[i].isChecked){
        var itemPedidoAux = new itemPedido;
        var pk = new itemPedidoPK;
        pk.pedido = this.pedido;
        itemPedidoAux.preco = this.produtos[i].preco;
        pk.produto = this.produtos[i];
        itemPedidoAux.quantidade = this.produtos[i].quantidade;
        itemPedidoAux.pk = pk;
        this.itemPedido.push(itemPedidoAux);
      }
    }
    this.pedidoData = new pedidoData;
    this.pedidoData.pedido = this.pedido;
    this.pedidoData.itemPedido = this.itemPedido;

    this.service.criarPedido(this.pedidoData).subscribe(data => {
      console.log("Pedido cadastrado com sucesso.");
      alert("Pedido cadastrado com sucesso.");
      this.dialogRef.close();
    }, error =>{
      console.log("Falha ao cadastrar o pedido.");
      alert("Falha ao cadastrar o pedido.");
    })
  }

}
