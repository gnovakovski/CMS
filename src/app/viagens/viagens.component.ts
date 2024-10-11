import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent implements OnInit {

  public viagens: any
  public img: any

  constructor(private service: ServiceService) { }

  ngOnInit() {

    this.getViagens();

  }

  getViagens(){
    this.service.getCollectionData('viagens').subscribe((data) => {

      this.viagens = data.map((item: any) => {
        return {
          ...item,
          foto: '',
        }
      })

      this.viagens.forEach((item: any) => {

        this.service.getImageUrl(item.foto_card).subscribe((url) => {

          item.foto = url;

       });

      });
    });

  }
}
