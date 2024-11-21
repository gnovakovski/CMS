import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViagensComponent } from './viagens/viagens.component';
import { CadastrarViagemComponent} from './viagens/cadastrar-viagem/cadastrar-viagem.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CadastrarEmbarqueComponent } from './embarque/cadastrar-embarque/cadastrar-embarque.component'
import { EditarViagemComponent } from './viagens/editar-viagem/editar-viagem.component';
import { CadastrarClienteComponent } from './clientes/cadastrar-cliente/cadastrar-cliente.component';
import { VendasComponent } from './vendas/vendas.component';
import { CadastrarVendaComponent } from './vendas/cadastrar-venda/cadastrar-venda.component';
import { EditarVendaComponent } from './vendas/editar-venda/editar-venda.component';
import { EditarClienteComponent } from './clientes/cadastrar-cliente/editar-cliente/editar-cliente.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { CadastrarFornecedorComponent } from './fornecedores/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { EditarFornecedorComponent } from './fornecedores/editar-fornecedor/editar-fornecedor.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NivelAcessoComponent } from './nivel-acesso/nivel-acesso.component';
import { CadastrarUsuarioComponent } from './usuarios/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { CadastrarNivelAcessoComponent } from './nivel-acesso/cadastrar-nivel-acesso/cadastrar-nivel-acesso.component';
import { EditarNivelAcessoComponent } from './nivel-acesso/editar-nivel-acesso/editar-nivel-acesso.component';
import { SobreViagemComponent } from './sobre-viagem/sobre-viagem.component';
import { EditarEmbarqueDesembarqueComponent } from './embarque/editar-embarque-desembarque/editar-embarque-desembarque.component';
import { ViagensLpComponent } from './viagens-lp/viagens-lp.component';
import { EmbarqueComponent } from './embarque/embarque.component';
import { Banners_homeComponent } from './banners_home/banners_home.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { PoliticaDePrivacidadeComponent } from './politica-de-privacidade/politica-de-privacidade.component';
import { SegurancaComponent } from './seguranca/seguranca.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    component: HomeComponent
  },

  {
    path: 'administrador/login',
    component: LoginComponent
  },

  {
    path: 'administrador/produtos',
    component: ViagensComponent
  },

  {
    path: 'administrador/clientes',
    component: ClientesComponent
  },

  {
    path: 'administrador/vendas',
    component: VendasComponent
  },

  {
    path: 'administrador/fornecedores',
    component: FornecedoresComponent
  },

  {
    path: 'administrador/usuarios',
    component: UsuariosComponent
  },

  {
    path: 'quem-somos',
    component: QuemSomosComponent
  },

  {
    path: 'termos-de-uso',
    component: TermosDeUsoComponent
  },

  {
    path: 'politica-de-privacidade',
    component: PoliticaDePrivacidadeComponent
  },

  {
    path: 'seguranca',
    component: SegurancaComponent
  },

  {
    path: 'administrador/embarque-desembarque',
    component: EmbarqueComponent
  },

  {
    path: 'administrador/banners-home',
    component: Banners_homeComponent
  },

  {
    path: 'administrador/niveis-acesso',
    component: NivelAcessoComponent
  },

  {
    path: 'administrador/niveis-acesso/cadastrar-nivel-acesso',
    component: CadastrarNivelAcessoComponent
  },

  {
    path: 'administrador/niveis-acesso/editar-nivel-acesso/:id',
    component: EditarNivelAcessoComponent
  },

  {
    path: 'inicio/:id',
    component: SobreViagemComponent
  },

  {
    path: 'administrador/usuarios/cadastrar-usuario',
    component: CadastrarUsuarioComponent
  },

  {
    path: 'administrador/usuarios/editar-usuario/:id',
    component: EditarUsuarioComponent
  },

  {
    path: 'administrador/fornecedores/cadastrar-fornecedor',
    component: CadastrarFornecedorComponent
  },

  {
    path: 'administrador/fornecedores/editar-fornecedor/:id',
    component: EditarFornecedorComponent
  },

  {
    path: 'administrador/vendas/cadastrar-venda',
    component: CadastrarVendaComponent
  },

  {
    path: 'administrador/vendas/editar-venda/:id',
    component: EditarVendaComponent
  },

  {
    path: 'administrador/clientes/cadastrar-cliente',
    component: CadastrarClienteComponent
  },

  {
    path: 'administrador/clientes/editar-cliente/:id',
    component: EditarClienteComponent
  },

  {
    path: 'administrador/produtos/cadastrar-produto',
    component: CadastrarViagemComponent
  },

  {
    path: 'administrador/produtos/editar-produto/:id',
    component: EditarViagemComponent
  },

  {
    path: ':produto',
    component: ViagensLpComponent
  },

  {
    path: 'bate-e-volta/:id',
    component: SobreViagemComponent
  },

  {
    path: 'final-de-semana/:id',
    component: SobreViagemComponent
  },

  {
    path: 'Aereo/:id',
    component: SobreViagemComponent
  },

  {
    path: 'rodoviario/:id',
    component: SobreViagemComponent
  },

  {
    path: 'religioso/:id',
    component: SobreViagemComponent
  },

  {
    path: 'administrador/embarque-desembarque/cadastrar-embarque-desembarque',
    component: CadastrarEmbarqueComponent
  },

  {
    path: 'administrador/embarque-desembarque/editar-embarque-desembarque/:id',
    component: EditarEmbarqueDesembarqueComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
