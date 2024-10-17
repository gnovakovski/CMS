import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public boxConf: boolean = false;
  public dataRole: any;
  public currentUrl: string = '';

  public roleProdutos: boolean = false;
  public roleClientes: boolean = false;
  public roleConf: boolean = false;
  public roleFornecedores: boolean = false;
  public roleVendas: boolean = false;
  public roleEmbarqueDesembarque: boolean = false;

  constructor(private service: ServiceService, private router: Router, private location: Location) { }

  ngOnInit() {

    if (localStorage.getItem('token-adm')) {

      this.currentUrl = this.router.url;

      if (localStorage.getItem('nivel-acesso')) {

        this.getRole(localStorage.getItem('nivel-acesso'));


      } else {
        window.location.href = "login";
      }

    } else {
      window.location.href = "login";
    }

  }

  getRole(role: any) {
    this.service.getRolesByName(role).subscribe(data => {
      if (data) {

        this.dataRole = data

        let valor = false

        let novaString = this.currentUrl.substring(1);

          const partes = novaString.split('/');

          if (partes.length > 2) {

            novaString = partes.slice(0, -1).join('/');

          } else {

            novaString = novaString;
          }

        this.dataRole.forEach((item: any) => {

          if (item === novaString) {

            valor = true;

          }
        });

        this.verificarRole();

        if (!valor) {
          this.location.back();
        }

      } else {
        console.log('Nenhuma role encontrada.');
      }
    });
  }

  verificarRole(){

    this.roleProdutos            = this.dataRole.some((valor: string) => valor === "produtos");
    this.roleClientes            = this.dataRole.some((valor: string) => valor === "clientes");
    this.roleConf                = this.dataRole.some((valor: string) => valor === "configuracoes");
    this.roleEmbarqueDesembarque = this.dataRole.some((valor: string) => valor === "embarque-desembarque");
    this.roleFornecedores        = this.dataRole.some((valor: string) => valor === "fornecedores");
    this.roleVendas              = this.dataRole.some((valor: string) => valor === "vendas");

  }

  logout() {
    this.service.logout()
      .then(() => {
        localStorage.removeItem('token-adm');
        localStorage.removeItem('nivel-acesso');
        window.location.href = "login";
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  }

  aparecerConf() {

    this.boxConf = !this.boxConf

  }

}
