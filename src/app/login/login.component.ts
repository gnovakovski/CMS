import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private router: Router, private service: ServiceService, public formBuilder: FormBuilder,) {

    this.form = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });

  }

  ngOnInit() {
  }


  login(email: any) {

    let login = this.form.getRawValue();

    this.service.login(email, login.password)

      .then((result) => {

        result.user?.getIdToken().then((token) => {
          let accessToken = token;
          console.log('Access Token:', accessToken);

          let tokenAcesso = JSON.stringify(accessToken);

          localStorage.setItem('token-adm', tokenAcesso);

          this.router.navigate(['/produtos']);
        });

      })
      .catch((error) => {
        console.error('Erro ao logar:', error);
      });
  }

  pegarEmail(){

    let login = this.form.getRawValue();

    this.service.getEmailByUser(login.user).subscribe(data => {
      if (data) {
        let email = data;

        this.login(email.email);

        localStorage.setItem('nivel-acesso', email.nivel_acesso);

      } else {
        console.log('Nenhuma pessoa encontrada com esse email.');
      }
    });
  }

}
