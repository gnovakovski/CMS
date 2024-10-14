import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: any

  constructor(private service: ServiceService, private toastr: ToastrService) {}


  ngOnInit() {

    this.getClientes();
  }

  getClientes(){
    this.service.getCollectionData('clientes').subscribe((data) => {

      this.clientes = data;

    });

  }

  deletarCliente(id: any){

    this.service.delete(id, "clientes")
      .then((resp) => {

        this.toastr.success('Cliente deletado com sucesso!', 'Deletar cliente');

        this.getClientes();
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
}
}
