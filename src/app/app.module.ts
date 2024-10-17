import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ViagensComponent } from './viagens/viagens.component';
import { EmbarqueComponent } from './embarque/embarque.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environments';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CadastrarViagemComponent } from './viagens/cadastrar-viagem/cadastrar-viagem.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { QuillModule } from 'ngx-quill';
import { ClientesComponent } from './clientes/clientes.component';
import { CadastrarClienteComponent } from './clientes/cadastrar-cliente/cadastrar-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditarViagemComponent } from './viagens/editar-viagem/editar-viagem.component';
import { VendasComponent } from './vendas/vendas.component';
import { CadastrarVendaComponent } from './vendas/cadastrar-venda/cadastrar-venda.component';
import { EditarVendaComponent } from './vendas/editar-venda/editar-venda.component';
import { MoneyMaskDirective } from './masks/money-mask.directive';
import { RgMaskDirective } from './masks/rg-mask.directive';
import { PhoneMaskDirective } from './masks/phone-mask.directive';
import { CpfMaskDirective } from './masks/cpf-mask.directive';
import { CepMaskDirective } from './masks/cep-mask.directive';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarEmbarqueComponent } from './embarque/cadastrar-embarque/cadastrar-embarque.component';
import { EditarClienteComponent } from './clientes/cadastrar-cliente/editar-cliente/editar-cliente.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { CadastrarFornecedorComponent } from './fornecedores/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { EditarFornecedorComponent } from './fornecedores/editar-fornecedor/editar-fornecedor.component';
import { CnpjMaskDirective } from './masks/cnpj-mask.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CarrosselHomeComponent } from './components/carrossel-home/carrossel-home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderSiteComponent } from './components/header-site/header-site.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NivelAcessoComponent } from './nivel-acesso/nivel-acesso.component';
import { CadastrarUsuarioComponent } from './usuarios/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      ViagensComponent,
      HeaderComponent,
      CadastrarViagemComponent,
      ClientesComponent,
      CadastrarClienteComponent,
      EditarViagemComponent,
      EmbarqueComponent,
      VendasComponent,
      CadastrarVendaComponent,
      EditarVendaComponent,
      MoneyMaskDirective,
      RgMaskDirective,
      PhoneMaskDirective,
      CpfMaskDirective,
      CepMaskDirective,
      CadastrarEmbarqueComponent,
      EditarClienteComponent,
      FornecedoresComponent,
      CadastrarFornecedorComponent,
      EditarFornecedorComponent,
      CnpjMaskDirective,
      HomeComponent,
      CarrosselHomeComponent,
      HeaderSiteComponent,
      UsuariosComponent,
      NivelAcessoComponent,
      CadastrarUsuarioComponent,
      EditarUsuarioComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
    SlickCarouselModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
