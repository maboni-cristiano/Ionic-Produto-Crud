import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private fornecedores: Fornecedor[];
  produto: Produto = {
    nome: '',
    fornecedores: [],
    preco: 0,
  };;

  constructor(
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inicializar();
    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.fornecedorService.getFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
  }

  private inicializar() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.produtoService.getProduto(id).subscribe(l => this.produto = l);
    }
  }

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  salvar() {
    this.produtoService.salvar(this.produto).subscribe(() => this.redirecionarProdutos());
  }

  redirecionarProdutos() {
    this.navController.navigateForward(['produtos']);
  }

}
