import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Cliente } from './cliente';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  searchString: String;

  constructor(public service: RestService, public dialog: MatDialog) {
    this.getter();
   }

  ngOnInit() {
  }

  mascaras(){
    debugger;
    for(let cliente of this.clientes){
      if(cliente.celular != null || cliente.celular != undefined){
        cliente.celular.replace(/^(\d{0})(\d{0,4})(\d{0,4})/, '$1 $2-$3');
      }
    }
  }

  getter(){
    this.service.listarClientes().subscribe((data: Cliente[]) =>{
      this.clientes = data;
     // this.mascaras();
      console.log("Sucesso listar Clientes.");
    }, error => {
      debugger;
      console.log("erro: " + error);
    })
  }

  getterNome(){
    debugger;
    this.service.listarClientesNome(this.searchString).subscribe((data: Cliente[]) => {
      this.clientes = data;
      console.log("Sucesso buscar Cliente pelo nome.");
    }, error => {
      console.log("erro: " + error);
    })
  }

}
