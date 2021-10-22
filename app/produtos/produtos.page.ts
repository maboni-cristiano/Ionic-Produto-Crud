import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';
import { ProdutoService } from "../services/produto.service";
import { AlertController, NavController } from '@ionic/angular';
import { IonItemSliding } from "@ionic/angular";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  public produtos: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private alertController: AlertController,
    private navController: NavController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
  }

  async exclusao(produto: Produto, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o produto ${produto.nome}?`,
      buttons: [{
        text: 'Sim',
        handler: () => this.excluir(produto)
      }, {
        text: 'Não',
        handler: () => slidingItem.close()
      }]
    });
    alert.present();
  }

  excluir(produto:Produto) {
    this.produtoService.excluir(produto).subscribe(() => this.listar());
  }

  editar(produto: Produto, slidingItem: IonItemSliding) {
    this.navController.navigateForward([`produtos/cadastro/${produto.id}`]);    
    slidingItem.close();
  }
}
