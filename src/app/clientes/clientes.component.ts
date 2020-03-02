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

  clientes: Cliente;

  constructor(public service: RestService, public dialog: MatDialog) {
    this.getter();
   }

  ngOnInit() {
  }

  getter(){
    this.service.listarClientes().then((data) =>{
//    subscribe((data: Cliente) =>{
      this.clientes = data;
      console.log("Sucesso listar Clientes.");
    }, error => {
      debugger;
      console.log("erro: " + error);
    })
  }

}
