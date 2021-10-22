import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, AfterContentChecked, AfterViewInit } from '@angular/core';
//import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/fornecedor.model';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.page.html',
  styleUrls: ['./fornecedores.page.scss'],
})
export class FornecedoresPage implements OnInit {

  public fornecedores: Fornecedor[];

  constructor(
   // private fornecedorService: FornecedorService,
    private navController: NavController,
    private alertControler: AlertController
  ) { }

  ngOnInit() {
  }
/* 
  ionViewWillEnter() {
    this.listar();
  } */

  editar(fornecedor: Fornecedor) {
    this.navController.navigateForward([`/fornecedores/cadastro/${fornecedor.id}`]);
  }

  exclusao(fornecedor: Fornecedor) {
    this.alertControler.create({
      header: 'Confirmar exclusão',
      message: `Deseja excluir o fornecedor ${fornecedor.nome}?`,
      buttons: [{
        text: 'Sim',
        handler: () => this.exclusao(fornecedor)
      }, {
        text: 'Não'
      }]
    }).then((alert) => alert.present());
  }

/*   excluir(fornecedor: Fornecedor) {
    this.fornecedorService.excluir(fornecedor).subscribe(() => this.listar());
  }

  listar() {
    this.fornecedorService.getFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
  } */
}
