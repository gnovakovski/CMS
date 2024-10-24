import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-viagens-lp',
  templateUrl: './viagens-lp.component.html',
  styleUrls: ['./viagens-lp.component.css']
})
export class ViagensLpComponent implements OnInit {

  public rota: any
  public variavel: any
  public viagem: any
  public text: any

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: ServiceService,) { }

  ngOnInit() {

    this.rota = this.activatedRoute.snapshot.paramMap.get('produto');

    if(this.rota === "final-de-semana"){

      this.getViagemPorTipoNegocio("Final de Semana")

    }else if(this.rota === "bate-e-volta"){

      this.getViagemPorTipoNegocio("Bate e Volta ")

    }else if(this.rota === "Aereo"){

      this.getViagemPorTipoNegocio("Aéreo")

    }else if(this.rota === "rodoviario"){

      this.getViagemPorTipoNegocio("Rodoviário")

    }else if(this.rota === "religioso"){

      this.getViagemPorTipoNegocio("Religioso")

    }
  }

  getViagemPorTipoNegocio(tipo: any){

    this.service.getViagemPorTipoNegocio(tipo).subscribe((data) => {

      this.text = tipo

      this.viagem = data;

      console.log(this.viagem)

      this.viagem = this.viagem.map((item: any) => {
        return {
          ...item,
          foto: '',
        };
      });

      this.viagem.forEach((item: any) => {
        this.service.getImageUrl(item.foto1).subscribe((url) => {
          item.foto = url;
        });
      });

    });

  }



}
