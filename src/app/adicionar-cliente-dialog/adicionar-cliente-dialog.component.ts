import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../rest.service';
import { Cliente } from '../clientes/cliente';

interface DialogData {
  nome: String;
  telefone: String;
  celular: String;
  comercio: String;
  bairro: String;
  endereco: String;
}

@Component({
  selector: 'app-adicionar-cliente-dialog',
  templateUrl: './adicionar-cliente-dialog.component.html',
  styleUrls: ['./adicionar-cliente-dialog.component.css']
})
export class AdicionarClienteDialogComponent implements OnInit {

  cliente: Cliente;

  constructor(public dialogRef: MatDialogRef<AdicionarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: RestService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvarCliente(): void{
    if(this.verificaCampos()){

      this.cliente = new Cliente;
      this.cliente.nome = this.data.nome;
      this.cliente.telefone = this.data.telefone;
      this.cliente.celular = this.data.celular;
      this.cliente.bairro = this.data.bairro;
      this.cliente.endereco = this.data.endereco;
      this.cliente.comercio = this.data.comercio;
      
      this.service.criarCliente(this.cliente).subscribe(data => {
        console.log("Cliente cadastrado com sucesso.");
        alert("Cliente cadastrado com sucesso.");
        this.dialogRef.close();
      }, error => {
        console.log(error);
        alert("Erro ao cadastrar cliente");
      })
    }
  }

  verificaCampos(): boolean{
    if(this.data.nome == null || this.data.nome == ""){
      alert("Por favor preencha o campo nome.");
      return false;
    }
    if(this.data.comercio == null || this.data.comercio == undefined) {
      alert("Por favor selecione se o cliente é comercial ou não.");
      return false;
    }
    return true;
  }

}
