import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent implements OnInit {

  public viagens: any
  public img: any

  public loading: boolean = false

  constructor(private service: ServiceService) { }

  ngOnInit() {

    setTimeout(() => {
      this.getViagens();
    }, 3000);

    setTimeout(() => {
      this.loading = true
    }, 3700);

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

        this.service.getImageUrl(item.foto1).subscribe((url) => {

          item.foto = url;

       });

      });
    });

  }

}
