import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViagensComponent } from './viagens/viagens.component';
import { CadastrarViagemComponent} from './viagens/cadastrar-viagem/cadastrar-viagem.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EmbarqueComponent } from './embarque/embarque.component';
import { CadastrarEmbarqueComponent } from './embarque/cadastrar-embarque/cadastrar-embarque.component'

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
    path: 'clientes/cadastrar-cliente',
    component: CadastrarViagemComponent
  },

  {
    path: 'viagens/cadastrar-viagem',
    component: CadastrarViagemComponent
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
