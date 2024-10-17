import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViagensComponent } from './viagens/viagens.component';
import { CadastrarViagemComponent} from './viagens/cadastrar-viagem/cadastrar-viagem.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EmbarqueComponent } from './embarque/embarque.component';
import { CadastrarEmbarqueComponent } from './embarque/cadastrar-embarque/cadastrar-embarque.component'
import { EditarViagemComponent } from './viagens/editar-viagem/editar-viagem.component';
import { CadastrarClienteComponent } from './clientes/cadastrar-cliente/cadastrar-cliente.component';
import { VendasComponent } from './vendas/vendas.component';
import { CadastrarVendaComponent } from './vendas/cadastrar-venda/cadastrar-venda.component';
import { EditarVendaComponent } from './vendas/editar-venda/editar-venda.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'viagens',
    component: ViagensComponent
  },

  {
    path: 'clientes',
    component: ClientesComponent
  },

  {
    path: 'vendas',
    component: VendasComponent
  },

  {
    path: 'vendas/cadastrar-venda',
    component: CadastrarVendaComponent
  },

  {
    path: 'vendas/editar-venda/:id',
    component: EditarVendaComponent
  },

  {
    path: 'clientes/cadastrar-cliente',
    component: CadastrarClienteComponent
  },

  {
    path: 'viagens/cadastrar-viagem',
    component: CadastrarViagemComponent
  },

  {
    path: 'viagens/editar-viagem/:id',
    component: EditarViagemComponent
  },

  {
    path: 'embarque',
    component: EmbarqueComponent
  },

  {
    path: 'embarque/cadastrar-embarque',
    component: CadastrarEmbarqueComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
