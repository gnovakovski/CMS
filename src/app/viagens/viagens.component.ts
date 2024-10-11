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

  public cards: any[] = [
    {
      title: 'Parque Terra Magica Florybal com Lets Tur',
      value: '350,00',
      condition: '5x de R$ 70,00 sem juros',
      date: '13/10/2024 a 13/10/2024'
    },

    {
      title: 'Parque Terra Magica Florybal com Lets Tur',
      value: '350,00',
      condition: '5x de R$ 70,00 sem juros',
      date: '13/10/2024 a 13/10/2024'
    },

    {
      title: 'Parque Terra Magica Florybal com Lets Tur',
      value: '350,00',
      condition: '5x de R$ 70,00 sem juros',
      date: '13/10/2024 a 13/10/2024'
    },

    {
      title: 'Parque Terra Magica Florybal com Lets Tur',
      value: '350,00',
      condition: '5x de R$ 70,00 sem juros',
      date: '13/10/2024 a 13/10/2024'
    },

    {
      title: 'Parque Terra Magica Florybal com Lets Tur',
      value: '350,00',
      condition: '5x de R$ 70,00 sem juros',
      date: '13/10/2024 a 13/10/2024'
    },


  ];

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
