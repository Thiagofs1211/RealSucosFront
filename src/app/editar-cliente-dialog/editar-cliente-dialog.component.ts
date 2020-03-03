import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../rest.service';
import { Cliente } from '../clientes/cliente';

interface DialogData {
  idCliente: Number;
  nome: String;
  telefone: String;
  celular: String;
  comercio: String;
  bairro: String;
  endereco: String;
  dataCadastro: Date;
}

@Component({
  selector: 'app-editar-cliente-dialog',
  templateUrl: './editar-cliente-dialog.component.html',
  styleUrls: ['./editar-cliente-dialog.component.css']
})
export class EditarClienteDialogComponent implements OnInit {

  cliente: Cliente;

  constructor(public dialogRef: MatDialogRef<EditarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: RestService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editarCliente(): void{
    if(this.verificaCampos()){
      this.cliente = new Cliente;
      this.cliente.idCliente = this.data.idCliente;
      this.cliente.nome = this.data.nome;
      this.cliente.telefone = this.data.telefone;
      this.cliente.celular = this.data.celular;
      this.cliente.bairro = this.data.bairro;
      this.cliente.endereco = this.data.endereco;
      this.cliente.comercio = this.data.comercio;
      this.cliente.dataCadastro = this.data.dataCadastro;
      this.service.editarCliente(this.cliente).subscribe(data => {
        console.log("Cliente editado com sucesso.");
        alert("Cliente editado com sucesso.");
        this.dialogRef.close();
      }, error => {
        console.log(error);
        alert("Erro ao editar cliente.");
      })
    }
  }

  verificaCampos(): boolean{
    debugger;
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
