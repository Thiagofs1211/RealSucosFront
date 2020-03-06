import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Cliente } from './clientes/cliente';
import { pedidoData } from './pedidos/pedidoData';
import { filtro } from './pedidos/filtro';
import { itemPedido } from './pedidos/itemPedido';

const endpoint = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getProdutos(): Observable<any> {
    return this.http.get(endpoint + '/produtos').pipe(
      map(this.extractData));
  }

  getProdutosAvulso(): Observable<any> {
    return this.http.get(endpoint + '/produtos/avulso').pipe(
      map(this.extractData));
  }

  getProdutosComercio(): Observable<any> {
    return this.http.get(endpoint + '/produtos/comercio').pipe(
      map(this.extractData));
  }

  cadastraProdutos(data: Object): Observable<any> {
    console.log(JSON.stringify(data))
    return this.http.post(endpoint + '/produtos/cadastrar', JSON.stringify(data),this.headers);
  }

  deleteProdutos(data: object): Observable<any>{
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    };
    return this.http.delete(endpoint + '/produtos/excluir', options);
  }

  alterarProduto(data: object): Observable<any> {
    return this.http.put(endpoint + '/produtos/alterar', JSON.stringify(data), this.headers);
  }

  listarClientes(): Observable <any> {
    return this.http.get<Cliente>(`${endpoint}/clientes`);
  }

  listarClientesNome(nome: String): Observable<any> {
    return this.http.get<Cliente>(endpoint + '/clientes/buscar/' + nome);
  }

  criarCliente(data: object): Observable<any> {
    return this.http.post(endpoint + '/clientes/cadastro', JSON.stringify(data),this.headers);
  }

  editarCliente(data: object): Observable<any> {
    return this.http.put(endpoint + '/clientes/alterar', JSON.stringify(data),this.headers);
  }

  removerCliente(data: object): Observable<any> {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    };
    return this.http.delete(endpoint + '/clientes/deletar', options);
  }

  criarPedido(data: object): Observable<any> {
    return this.http.post(endpoint + '/pedido/criar', JSON.stringify(data),this.headers);
  }

  lisarPedidosCliente(filtro: filtro): Observable<any> {
    const params = new HttpParams().set('idCliente', filtro.idCliente+'')
    .set('dataInicio', filtro.dataInicio+'')
    .set('dataFim', filtro.dataFim+'');
    return this.http.get<pedidoData>(endpoint + '/pedido/listar/cliente', {params: params});
  }

  listarPedidos(dataInicio: string, dataFim: string): Observable<any> {
    const params = new HttpParams().set('dataInicio', dataInicio)
    .set('dataFim', dataFim);
    return this.http.get<pedidoData>(endpoint + '/pedido/listar/datas', {params: params});
  }

  excluirProdutoPedido(itemPedido: itemPedido): Observable<any>{
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(itemPedido),
    };
    return this.http.delete(endpoint + '/pedido/excluir/item',options);
  }

  editarPedido(item: pedidoData): Observable<any> {
    return this.http.put(endpoint + '/pedido/editar', JSON.stringify(item),this.headers);
  }

}