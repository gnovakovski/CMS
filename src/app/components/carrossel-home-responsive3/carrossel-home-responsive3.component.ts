import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-carrossel-home-responsive3',
  templateUrl: './carrossel-home-responsive3.component.html',
  styleUrls: ['./carrossel-home-responsive3.component.css']
})
export class CarrosselHomeResponsive3Component implements OnInit {

  public viagens: any;

  @Input() valor: any

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getViagensTipoAereo();
  }

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
