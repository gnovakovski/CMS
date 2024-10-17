import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public nivel_acesso: any
  public form: any;

  public usuario: any;
  public usuarioId: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: ServiceService, public formBuilder: FormBuilder, private toastr: ToastrService) {}


  ngOnInit() {

    this.usuarioId = this.activatedRoute.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      nome: '',
      usuario: '',
      senha: '',
      email: '',
      nivel_acesso: '',
      status: '',
    });

    this.getNivelAcesso();
    this.getUsuarioById(this.usuarioId);
  }

  getUsuarioById(id: any){

    this.service.getById(id, "usuarios").subscribe(data => {
      this.usuario = data;

      this.form.controls['nome'].setValue(this.usuario.nome);
      this.form.controls['usuario'].setValue(this.usuario.usuario);
      this.form.controls['senha'].setValue(this.usuario.senha);
      this.form.controls['email'].setValue(this.usuario.email);
      this.form.controls['nivel_acesso'].setValue(this.usuario.nivel_acesso);
      this.form.controls['status'].setValue(this.usuario.status);

    });
  }

  voltar(){

    this.router.navigate(['/usuarios']);

  }

  getNivelAcesso(){
    this.service.getCollectionData('niveis_acesso').subscribe((data) => {

      this.nivel_acesso = data;

    });

  }

  onSubmit() {

    this.service.post(this.form.value, "usuarios")
      .then((resp) => {
        console.log(resp)
        this.toastr.success('Usuário cadastrado com sucesso!', 'Cadastrar usuário');

          this.service.registerWithEmail(this.form.value.email, this.form.value.senha)
            .then((result) => {
              console.log('Usuário registrado com sucesso:', result);
            })
            .catch((error) => {
              console.error('Erro ao registrar:', error);
            });

        this.router.navigate(['/usuarios']);
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
  }

}
