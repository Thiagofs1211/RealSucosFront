import { Component, OnInit, Inject } from '@angular/core';
import { pedidoData } from '../pedidos/pedidoData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';
import { itemPedido } from '../pedidos/itemPedido';

interface DialogData {
  pedidoData: pedidoData
}

@Component({
  selector: 'app-info-pedido-dialog',
  templateUrl: './info-pedido-dialog.component.html',
  styleUrls: ['./info-pedido-dialog.component.css']
})
export class InfoPedidoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoPedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: RestService) { }

  ngOnInit(): void {
  }

  deleteProduto(item: itemPedido){
    if(confirm("Deseja mesmo excluir esse produto?")){
      var index = this.data.pedidoData.itemPedido.indexOf(item);
      this.data.pedidoData.itemPedido.splice(index, 1);
      this.data.pedidoData.pedido.valorTotal = this.data.pedidoData.pedido.valorTotal - (item.quantidade * item.preco);
      this.service.excluirProdutoPedido(item).subscribe( data => {
        console.log("Produto excluído com sucesso.");
        alert("Produto excluído com sucesso.");
      }, error =>{
        console.log("Erro ao excluir produto.");
        console.log(error);
        alert("Erro ao excluir produto.");
      })
      
    }
  }

  alterarValor(){
    this.data.pedidoData.pedido.valorTotal = 0;
    for(var i = 0; i < this.data.pedidoData.itemPedido.length; i++){
      this.data.pedidoData.pedido.valorTotal = this.data.pedidoData.pedido.valorTotal + (this.data.pedidoData.itemPedido[i].preco * this.data.pedidoData.itemPedido[i].quantidade);
    }
    this.data.pedidoData.pedido.valorTotal = this.data.pedidoData.pedido.valorTotal - this.data.pedidoData.pedido.desconto;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  EditarPedido(){
    if(confirm("Deseja mesmo editar esse pedido?")){
      this.service.editarPedido(this.data.pedidoData).subscribe( data => {
        console.log("Pedido alterado com sucesso.");
        alert("Pedido alterado com sucesso.");
        this.dialogRef.close();
      }, error => {
        console.log("Erro ao alterar pedido");
        console.log(error);
        alert("Erro ao alterar pedido");
      })
    }
  }

}
