import { Component, OnInit, Inject } from '@angular/core';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { NavController } from '@ionic/angular';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  fornecedor: Fornecedor;

  constructor(
    private fornecedorService: FornecedorService,
    private navController : NavController,
    private route: ActivatedRoute
  ) {
    this.fornecedor = new Fornecedor();
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params['id']);
    if(id) {
      this.fornecedorService.getFornecedor(id).subscribe({
        next: fornecedor => this.fornecedor = fornecedor
      });      
    } 
  }

  salvar(){
    this.fornecedorService.salvar(this.fornecedor).subscribe({
      next: () => this.redirecionarLista()
    });
  }

  redirecionarLista() {
    this.navController.navigateForward(['fornecedores']);
  }
}
