import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public boxConf: boolean = false;
  public dataRole: any;
  public currentUrl: string = '';

  public form_link: any;

  public contato: any;

  modalRef: NgbModalRef | undefined;

  public roleProdutos: boolean = false;
  public roleClientes: boolean = false;
  public roleConf: boolean = false;
  public roleFornecedores: boolean = false;
  public roleVendas: boolean = false;
  public roleEmbarqueDesembarque: boolean = false;

  constructor(private service: ServiceService, private router: Router, private location: Location, public formBuilder: FormBuilder, private toastr: ToastrService, public modalService: NgbModal) { }


  ngOnInit() {

    if (localStorage.getItem('token-adm')) {

      this.currentUrl = this.router.url;

      if (localStorage.getItem('nivel-acesso')) {

        this.getRole(localStorage.getItem('nivel-acesso'));

        this.form_link = this.formBuilder.group({
          link: '',
        });

      } else {
        window.location.href = "administrador/login";
      }

    } else {
      window.location.href = "administrador/login";
    }

  }

  openModal(contentModal: any, value: any) {
    this.modalRef = this.modalService.open(contentModal, { size: 'md', ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: true, keyboard: true });

    if(value === "insta"){
      this.getContatoInsta();
    }else if(value === "whats"){
      this.getContatoWhats();
    }
  }

  getContatoWhats(){
    this.service.getById("T8oT1pxOSCwAIXPTMYNZ", "contato_whats").subscribe(data => {
      this.contato = data;

      this.form_link.controls['link'].setValue(this.contato.link);

    });
  }

  getContatoInsta(){
    this.service.getById("PQXaQP4RhxIXSIGy3Z0l", "contato_insta").subscribe(data => {
      this.contato = data;

      this.form_link.controls['link'].setValue(this.contato.link);

    });
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

  fecharModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  onSubmitWhats() {

    this.service.update("T8oT1pxOSCwAIXPTMYNZ", this.form_link.value, "contato_whats")
      .then((resp) => {
        console.log(resp)
        this.toastr.success('Link editado com sucesso!', 'Editar link');


        if (this.modalRef) {
          this.modalRef.close();
        }
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
  }

  onSubmitInsta() {

    this.service.update("PQXaQP4RhxIXSIGy3Z0l", this.form_link.value, "contato_insta")
      .then((resp) => {
        console.log(resp)
        this.toastr.success('Link editado com sucesso!', 'Editar link');


        if (this.modalRef) {
          this.modalRef.close();
        }
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
  }

  verificarRole(){

    this.roleProdutos            = this.dataRole.some((valor: string) => valor === "administrador/produtos");
    this.roleClientes            = this.dataRole.some((valor: string) => valor === "administrador/clientes");
    this.roleConf                = this.dataRole.some((valor: string) => valor === "administrador/configuracoes");
    this.roleEmbarqueDesembarque = this.dataRole.some((valor: string) => valor === "administrador/embarque-desembarque");
    this.roleFornecedores        = this.dataRole.some((valor: string) => valor === "administrador/fornecedores");
    this.roleVendas              = this.dataRole.some((valor: string) => valor === "administrador/vendas");

  }

  logout() {
    this.service.logout()
      .then(() => {
        localStorage.removeItem('token-adm');
        localStorage.removeItem('nivel-acesso');
        localStorage.removeItem('user');
        window.location.href = "/administrador/login";
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  }

  aparecerConf() {

    this.boxConf = !this.boxConf

  }

}
