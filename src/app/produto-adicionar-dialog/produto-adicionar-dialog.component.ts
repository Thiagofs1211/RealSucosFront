import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../produtos/produtos';
import { RestService } from '../rest.service';

interface DialogData {
  nome: String;
  marca: String;
  preco: number;
  comercio: String;
}

@Component({
  selector: 'app-produto-adicionar-dialog',
  templateUrl: './produto-adicionar-dialog.component.html',
  styleUrls: ['./produto-adicionar-dialog.component.css']
})

export class ProdutoAdicionarDialogComponent implements OnInit {
  
produto: Produto;
  
  constructor(public dialogRef: MatDialogRef<ProdutoAdicionarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: RestService) {
    
   }

   onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  salvarProduto(){
    debugger;
    if(this.verificaCampos()){
      this.produto = new Produto;
      this.produto.nome = this.data.nome;
      this.produto.marca = this.data.marca;
      this.produto.preco = this.data.preco;
      this.produto.comercio = this.data.comercio;
      this.service.cadastraProdutos(this.produto).subscribe(
        data => {
          console.log("sucesso cadastro produto");
          this.dialogRef.close();
        }, error => {
          console.log("erro: ", error);
        }
      );
    }
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
