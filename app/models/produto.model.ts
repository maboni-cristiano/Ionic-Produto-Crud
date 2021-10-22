import { Fornecedor } from './fornecedor.model';

export interface Produto {
    id?: string;
    nome: string;
    fornecedores: Fornecedor[];
    preco: number; 
}