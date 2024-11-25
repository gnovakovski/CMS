import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-carrossel-home',
  templateUrl: './carrossel-home.component.html',
  styleUrls: ['./carrossel-home.component.scss']
})
export class CarrosselHomeComponent implements OnInit {

  @Input() valor: any

  constructor(private service: ServiceService) { }

  public slideConfig: any;

  ngOnInit() {
    this.slideConfig = {
      slidesToShow: 3,  // Exibe 3 cards em telas grandes
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      arrows: true, // Ativando as setas de navegação
      dots: false,
      pauseOnHover: false,
    };

    this.getViagensTipoAereo();
  }

  public viagens: any;

  carregandoImagens: boolean = true;

  getViagensTipoAereo() {
    this.service.getCollectionData('viagens').subscribe((data) => {
      let viagensAereas = data.filter((item: any) =>
        item.carrossel !== false && item.carrossel !== ''
      );

      const totalViagens = viagensAereas.length;
      let imagensCarregadas = 0;

      // Ordenando as viagens por data mais próxima
      viagensAereas = viagensAereas.sort((a: any, b: any) => {
        // Convertendo data_ida para objeto Date, caso seja string ou outro formato
        const dataIdaA = new Date(a.data_ida);
        const dataIdaB = new Date(b.data_ida);

        // Comparando as datas
        return dataIdaA.getTime() - dataIdaB.getTime();
      });

      this.viagens = viagensAereas.map((item: any) => {
        return {
          ...item,
          foto: '',
        };
      });

      this.viagens.forEach((item: any) => {
        this.service.getImageUrl(item.foto1).subscribe((url) => {
          item.foto = url;
          imagensCarregadas++;

          if (imagensCarregadas === totalViagens) {
            this.carregandoImagens = false;
          }
        });
      });
    });
  }
}
