import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ViagensComponent } from './viagens/viagens.component';
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
import { MoneyMaskDirective } from './money-mask.directive';

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
      VendasComponent,
      CadastrarVendaComponent,
      EditarVendaComponent,
      MoneyMaskDirective
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
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
