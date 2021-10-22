import { Injectable } from '@angular/core';
import { Produto } from "../models/produto.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  uri: string;

  constructor(private http: HttpClient) {
    this.uri = 'http://localhost:3000/produtos'
  }

  getProdutos() {
    const params = { _embed: 'fornecedores' };
    return this.http.get<Produto[]>(`${this.uri}`, { params });
  }

  salvar(produto: Produto) {
    return (produto && produto.id) ? this.atualizar(produto) : this.adicionar(produto);
  }

  private atualizar(produto: Produto) {
    return this.http.put(`${this.uri}/${produto.id}`, produto);
  }

  private adicionar(produto: Produto) {
    return this.http.post(`${this.uri}`, produto);
  }

  excluir(produto: Produto) {
    return this.http.delete(`${this.uri}/${produto.id}`);
  }

  getProduto(id: string) {
    return this.http.get<Produto>(`${this.uri}/${id}`);
  }
}
