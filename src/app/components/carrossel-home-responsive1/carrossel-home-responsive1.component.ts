import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-carrossel-home-responsive1',
  templateUrl: './carrossel-home-responsive1.component.html',
  styleUrls: ['./carrossel-home-responsive1.component.css']
})
export class CarrosselHomeResponsive1Component implements OnInit {

  @Input() valor: any

  constructor(private service: ServiceService) { }

  public slideConfig: any;

  ngOnInit() {
    this.slideConfig = {
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      arrows: true,
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

      viagensAereas = viagensAereas.sort((a: any, b: any) => {

        const dataIdaA = new Date(a.data_ida);
        const dataIdaB = new Date(b.data_ida);

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
