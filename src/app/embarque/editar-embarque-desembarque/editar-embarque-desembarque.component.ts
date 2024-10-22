import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-embarque-desembarque',
  templateUrl: './editar-embarque-desembarque.component.html',
  styleUrls: ['./editar-embarque-desembarque.component.css']
})
export class EditarEmbarqueDesembarqueComponent implements OnInit {

  public embarqueId: any;
  public viagens: any;
  public form: any;
  public clientes: any;
  public embarque: any;
  activatedRoute: any;

  constructor(private router: Router, private service: ServiceService, public formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {

    this.getViagens();
    this.getClientes();
    this.getEmbarqueById(this.embarqueId);

    this.embarqueId = this.activatedRoute.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      viagem: '',
      horarioEmbarqueDesembarque: '',
      EnderecoEmbarqueDesembarque: '',
      embarqueDesembarque: '',
    });

  }

  getEmbarqueById(id: any){

    this.service.getById(id, "embarque-desembarque").subscribe(data => {
      this.embarque = data;

      this.form.controls['viagem'].setValue(this.embarque.viagem);
      this.form.controls['forma_pagamento'].setValue(this.embarque.forma_pagamento);
      this.form.controls['data_reserva'].setValue(this.embarque.data_reserva);
      this.form.controls['data_pagamento'].setValue(this.embarque.data_pagamento);
      this.form.controls['cliente'].setValue(this.embarque.cliente);
      this.form.controls['status_pagamento'].setValue(this.embarque.status_pagamento);
      this.form.controls['valor'].setValue(this.embarque.valor);

    });
  }

  getViagens(){
    this.service.getCollectionData('viagens').subscribe((data) => {

      this.viagens = data;

    });

  }

  getClientes(){
    this.service.getCollectionData('clientes').subscribe((data) => {

      this.clientes = data;

    });

  }

  voltar(){

    this.router.navigate(['/embarque-desembarque']);

  }
  editar(){

      this.service.update(this.embarqueId, this.form.value, "embarque-desembarque")
        .then((resp) => {

          this.toastr.success('Embarque editado com sucesso!', 'Editar embarque');

         this.router.navigate(['/embarque-desembarque']);
        })
        .catch((error) => {
          this.toastr.error(error, 'Erro');
        });
  }
}
