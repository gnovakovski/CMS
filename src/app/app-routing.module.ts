import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViagensComponent } from './viagens/viagens.component';
import { CadastrarViagemComponent } from './viagens/cadastrar-viagem/cadastrar-viagem.component';

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
    path: 'viagens/cadastrar-viagem',
    component: CadastrarViagemComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
