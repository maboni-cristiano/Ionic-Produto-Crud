import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from "../models/fornecedor.model";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FornecedorService {

    uri: string;

    constructor(private httpClient: HttpClient) {
        this.uri = 'http://localhost:3000/fornedores';
    }

    getFornecedores() {
        return this.httpClient.get<Fornecedor[]>(this.uri);
    }

    salvar(fornecedor: Fornecedor) {
        return (fornecedor && fornecedor.id) ? this.atualizar(fornecedor): this.adicionar(fornecedor);
    }

    private atualizar(fornecedor: Fornecedor) {
        return this.httpClient.put(`${this.uri}/${fornecedor.id}`, fornecedor);
    }

    private adicionar(fornecedor: Fornecedor) {
        return this.httpClient.post(this.uri, fornecedor);
    }

    excluir(fornecedor: Fornecedor) {
        return this.httpClient.delete(`${this.uri}/${fornecedor.id}`);
    }

    getFornecedor(id: number) {
        return this.httpClient.get<Fornecedor>(`${this.uri}/${id}`);
    }
}
