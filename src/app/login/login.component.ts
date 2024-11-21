import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  public valor: boolean = false

  constructor(private router: Router, private service: ServiceService, public formBuilder: FormBuilder, private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });

  }

  ngOnInit() {
  }


  login(email: any) {
    let login = this.form.getRawValue();

    if(!this.valor){
      this.service.login(email, login.password)
      .pipe(take(1))
      .subscribe(
        (result) => {

          this.valor = true
            result.user?.getIdToken().then((token: any) => {
              let accessToken = token;

              let tokenAcesso = JSON.stringify(accessToken);
              localStorage.setItem('token-adm', tokenAcesso);

              this.router.navigate(['/administrador/produtos']);
            });
        },
        (error) => {
          this.toastr.error('Usuário ou senha incorreta. Por favor, tente novamente.', 'Erro');
        },
      );
    }
  }

  pegarEmail(){

    let login = this.form.getRawValue();

    this.service.getEmailByUser(login.user).subscribe(data => {
      if (data) {
        let email = data;

        this.login(email.email);

        localStorage.setItem('nivel-acesso', email.nivel_acesso);
        localStorage.setItem('user', login.user);

      } else {
        console.log('Nenhuma pessoa encontrada com esse email.');
      }
    });
  }

}
