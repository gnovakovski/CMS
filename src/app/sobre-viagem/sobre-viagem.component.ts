import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';

interface Foto {
  file: any
}

@Component({
  selector: 'app-sobre-viagem',
  templateUrl: './sobre-viagem.component.html',
  styleUrls: ['./sobre-viagem.component.css']
})
export class SobreViagemComponent implements OnInit {

  public viagem: any;
  public viagemId: any;

  public valor: any;

  fotos: Foto[] = [];

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute,) {}

  ngOnInit() {

    this.viagemId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getViagemById(this.viagemId)

  }

  getViagemById(id: any){
    this.service.getById(id, "viagens").subscribe(data => {

      this.viagem = data;

     if(this.viagem.foto1){
      this.service.getImageUrl(this.viagem.foto1).subscribe((url) => {

        this.fotos.push({ file: data });

       });
     }

     if(this.viagem.foto2){
      this.service.getImageUrl(this.viagem.foto2).subscribe((url) => {

        this.fotos.push({ file: data });

       });
     }

     if(this.viagem.foto3){
      this.service.getImageUrl(this.viagem.foto3).subscribe((url) => {

        this.fotos.push({ file: data });

       });
     }


     if(this.viagem.foto4){
      this.service.getImageUrl(this.viagem.foto4).subscribe((url) => {

        this.fotos.push({ file: data });

       });
     }


     if(this.viagem.foto5){
      this.service.getImageUrl(this.viagem.foto5).subscribe((url) => {

        this.fotos.push({ file: data });

       });
     }

    });
  }

}
