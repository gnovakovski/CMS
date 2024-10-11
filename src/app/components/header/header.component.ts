import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: ServiceService,) { }

  ngOnInit() {

    if(localStorage.getItem('token-adm')){

    }else{
      window.location.href = "";
    }

  }

    logout() {
      this.service.logout()
        .then(() => {
          localStorage.removeItem('token-adm');
          window.location.href = "";
        })
        .catch((error) => {
          console.error('Erro ao deslogar:', error);
        });
    }

}
