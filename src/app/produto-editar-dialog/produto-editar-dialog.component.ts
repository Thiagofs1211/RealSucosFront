import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';
import { Produto } from '../produtos/produtos';

interface DialogData {
  idProduto: Number;
  nome: String;
  marca: String;
  preco: number;
  comercio: String;
}

@Component({
  selector: 'app-produto-editar-dialog',
  templateUrl: './produto-editar-dialog.component.html',
  styleUrls: ['./produto-editar-dialog.component.css']
})
export class ProdutoEditarDialogComponent implements OnInit {

  produto: Produto;

  constructor(public dialogRef: MatDialogRef<ProdutoEditarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: RestService) {
    
   }

   onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  editarProduto() {
    this.produto = new Produto;
    this.produto.idProduto = this.data.idProduto;
    this.produto.nome = this.data.nome;
    this.produto.marca = this.data.marca;
    this.produto.preco = this.data.preco;
    this.produto.comercio = this.data.comercio;
    this.service.alterarProduto(this.produto).subscribe(
      data => {
        this.dialogRef.close();
        console.log("sucesso edição");
      }, error => {
        console.log("erro: "+ error);
        alert("Erro na alteração do Produto.")
      }
    )
  }

  verificaCampos(){
    if(this.data.nome == null || this.data.nome == undefined || this.data.nome == ""){
      alert("Por favor preencha o campo Nome.");
      return false;
    }
    if(this.data.marca == null || this.data.marca == undefined || this.data.marca == ""){
      alert("Por favor preencha o campo Marca.")
      return false;
    }
    if(this.data.preco == null || this.data.preco == undefined){
      alert("Por favor preencha o campo Preço.");
      return false;
    }
    return true;
  }

}
