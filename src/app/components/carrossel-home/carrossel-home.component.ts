import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrossel-home',
  templateUrl: './carrossel-home.component.html',
  styleUrls: ['./carrossel-home.component.scss']
})
export class CarrosselHomeComponent implements OnInit {

  constructor() { }

  public slideConfig: any;

  ngOnInit() {

    this.slideConfig = {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

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

}
