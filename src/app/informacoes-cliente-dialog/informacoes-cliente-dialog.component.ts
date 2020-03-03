import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-informacoes-cliente-dialog',
  templateUrl: './informacoes-cliente-dialog.component.html',
  styleUrls: ['./informacoes-cliente-dialog.component.css']
})
export class InformacoesClienteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InformacoesClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
