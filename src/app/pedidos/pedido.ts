import { Cliente } from '../clientes/cliente';

export class Pedido {
    idPedido: Number;
    cliente: Cliente;
    valorTotal: number;
    desconto: number;
    dataPedido: Date;
}