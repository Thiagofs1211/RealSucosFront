import { Component, OnInit } from '@angular/core';
import { Produto } from './produtos';
import { RestService } from '../rest.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProdutoAdicionarDialogComponent } from '../produto-adicionar-dialog/produto-adicionar-dialog.component';
import { ProdutoEditarDialogComponent } from '../produto-editar-dialog/produto-editar-dialog.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  email: string;
  produtosAvulso: Produto;
  erro: any;
  produtosComercio: Produto;

  constructor(public service: RestService, public dialog: MatDialog) {
    this.getterProdutosAvulso();
    this.getterProdutosComercio();
   }

  ngOnInit() {
  }

  getterProdutosAvulso(){
    this.service.getProdutosAvulso().subscribe( (data: Produto) => {
        this.produtosAvulso = data;
    }, error => {
        this.erro = error;
    });
  }

  getterProdutosComercio(){
    this.service.getProdutosComercio().subscribe( (data: Produto) => {
        this.produtosComercio = data;
    }, error => {
        this.erro = error;
    });
  }

  deleteProduto(item: Produto) {
    if(confirm("Deseja mesmo deletar este item?")){
      this.service.deleteProdutos(item).subscribe(
        data => {
          this.getterProdutosAvulso();
          this.getterProdutosComercio();
          console.log("sucesso exclusão");
        }, error => {
          console.log("erro: " + error);
          alert("Erro na exclusão do Produto.");
        }
      )
    }
  }

  openDialogAvulso(): void {
    const dialogRef = this.dialog.open(ProdutoAdicionarDialogComponent, {
      width: '1000px',
      data: {
        comercio: "N"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getterProdutosAvulso();
      this.getterProdutosComercio();
    });
  }

  openDialogComercio(): void {
    const dialogRef = this.dialog.open(ProdutoAdicionarDialogComponent, {
      width: '1000px',
      data: {
        comercio: "S"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getterProdutosAvulso();
      this.getterProdutosComercio();
    });
  }

  openDialogEdit(item: Produto): void {
    const dialogRef = this.dialog.open(ProdutoEditarDialogComponent, {
      width: '1000px',
      data: {
        idProduto: item.idProduto,
        nome: item.nome,
        marca: item.marca,
        preco: item.preco,
        comercio: item.comercio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getterProdutosAvulso();
      this.getterProdutosComercio();
     });
  }

}
