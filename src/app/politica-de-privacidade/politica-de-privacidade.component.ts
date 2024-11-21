import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-politica-de-privacidade',
  templateUrl: './politica-de-privacidade.component.html',
  styleUrls: ['./politica-de-privacidade.component.css']
})
export class PoliticaDePrivacidadeComponent implements OnInit {


  public innerWidth: any;
  public menu: boolean = false;
  public contato: any
  public form_agente: any

  modalRef: NgbModalRef | undefined;

  constructor(public modalService: NgbModal, private router: Router, public formBuilder: FormBuilder, private location: Location) {}

  ngOnInit() {

    this.innerWidth = window.innerWidth;

    this.form_agente = this.formBuilder.group({
      nome: '',
      usuario: '',
      senha: '',
      email: '',
      nivel_acesso: 'Agente',
      status: 'false',
    });

  }

  openModal(contentModal: any) {
    this.modalRef = this.modalService.open(contentModal, { size: 'lg', ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: true, keyboard: true });
  }

  voltar(): void {
    this.location.back();
  }

  fecharModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  abrirMenu(){

    this.menu = !this.menu

  }

  whats(){
    window.location.href = this.contato.link
  }


}
