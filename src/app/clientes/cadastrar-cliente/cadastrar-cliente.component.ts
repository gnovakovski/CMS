import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent {

  public viagens: any
  public form: any;
  public clientes: any;
  public cep: any;

  constructor(private router: Router, private service: ServiceService, public formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      nome: '',
      data_nascimento: '',
      email: '',
      rg: '',
      telefone: '',
      cpf: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    });

  }

  voltar(){

    this.router.navigate(['/clientes']);

  }

  onSubmit() {

    this.service.post(this.form.value, "clientes")
      .then((resp) => {
        console.log(resp)
        this.toastr.success('Cliente cadastrado com sucesso!', 'Cadastrar cliente');


        this.router.navigate(['/clientes']);
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
  }

getCep(){

  let form = this.form.getRawValue();

  if(form.cep.length > 8){
    this.service.getCep(form.cep).subscribe((resp) => {

      this.cep = resp;

      this.form.controls['endereco'].setValue(this.cep.logradouro);
      this.form.controls['estado'].setValue(this.cep.estado);
      this.form.controls['cidade'].setValue(this.cep.localidade);
      this.form.controls['bairro'].setValue(this.cep.bairro);

    });
  }
}
}

