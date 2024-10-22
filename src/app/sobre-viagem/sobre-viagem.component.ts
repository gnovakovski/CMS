import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-sobre-viagem',
  templateUrl: './sobre-viagem.component.html',
  styleUrls: ['./sobre-viagem.component.css']
})
export class SobreViagemComponent implements OnInit {

  public viagem: any;

  public foto1: any;
  public foto2: any;
  public foto3: any;
  public foto4: any;
  public foto5: any;

  constructor(private service: ServiceService) {}

  ngOnInit() {
  }

  getViagemById(id: any){
    this.service.getById(id, "viagens").subscribe(data => {

      this.viagem = data;

     if(this.viagem.foto1){
      this.service.getImageUrl(this.viagem.foto1).subscribe((url) => {

        this.foto1 = url

       });
     }

     if(this.viagem.foto2){
      this.service.getImageUrl(this.viagem.foto2).subscribe((url) => {

        this.foto2 = url;

       });
     }

     if(this.viagem.foto3){
      this.service.getImageUrl(this.viagem.foto3).subscribe((url) => {

        this.foto3 = url;

       });
     }


     if(this.viagem.foto4){
      this.service.getImageUrl(this.viagem.foto4).subscribe((url) => {

        this.foto4 = url;

       });
     }


     if(this.viagem.foto5){
      this.service.getImageUrl(this.viagem.foto5).subscribe((url) => {

        this.foto5 = url;

       });
     }


    });
  }

}
