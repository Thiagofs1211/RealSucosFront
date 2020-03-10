import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Cliente } from './cliente';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdicionarClienteDialogComponent } from '../adicionar-cliente-dialog/adicionar-cliente-dialog.component';
import { EditarClienteDialogComponent } from '../editar-cliente-dialog/editar-cliente-dialog.component';
import { InformacoesClienteDialogComponent } from '../informacoes-cliente-dialog/informacoes-cliente-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  searchString: String;

  constructor(public service: RestService, public dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.getter();
   }

  ngOnInit() {
  }

  getter(){
    this.spinner.show();
    this.service.listarClientes().subscribe((data: Cliente[]) =>{
      this.clientes = data;
      this.spinner.hide();
      console.log("Sucesso listar Clientes.");
    }, error => {
      console.log("erro: " + error);
      this.spinner.hide();
    })
  }

  getterNome(){
    this.spinner.show();
    this.service.listarClientesNome(this.searchString).subscribe((data: Cliente[]) => {
      this.clientes = data;
      console.log("Sucesso buscar Cliente pelo nome.");
      this.spinner.hide();
    }, error => { 
      if(error.status == 404){
        this.clientes = [];
      }
      console.log("erro: " + error);
      this.spinner.hide();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdicionarClienteDialogComponent, {
      width: '1000px', height: '700px',
      data: {
        nome: "",
        telefone: "",
        celular: "",
        bairro: "",
        endereco: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getter();
    });
  }

  openDialogEdit(item: Cliente): void {
    const dialogRef = this.dialog.open(EditarClienteDialogComponent, {
      width: '1000px', height: '700px',
      data: {
        nome: item.nome,
        telefone: item.telefone,
        celular: item.celular,
        bairro: item.bairro,
        endereco: item.endereco,
        comercio: item.comercio,
        idCliente: item.idCliente,
        dataCadastro: item.dataCadastro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getter();
    });
  }

  removerCliente(item: Cliente){
    if(confirm("Deseja realmente deletar o cliente " + item.nome + "?")){
      this.service.removerCliente(item).subscribe(data => {
        console.log("Sucesso em remover o cliente.");
        alert("Sucesso em remover o cliente.");
        this.getter();
      }, error =>{
        console.log(error);
        alert("Erro ao excluir o cliente.");
      })
    }
  }

  openDialogInfo(item: Cliente): void {
    const dialogRef = this.dialog.open(InformacoesClienteDialogComponent, {
      width: '1000px', height: '700px',
      data: {
        nome: item.nome,
        telefone: item.telefone,
        celular: item.celular,
        bairro: item.bairro,
        endereco: item.endereco,
        comercio: item.comercio,
        idCliente: item.idCliente,
        dataCadastro: item.dataCadastro
      }
    });
  }
}
