import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-viagens',
  templateUrl: './embarque.component.html',
  styleUrls: ['./embarque.component.css']
})
export class EmbarqueComponent implements OnInit {

  public embarque: any
  public img: any

  public loading: boolean = false

  constructor(private service: ServiceService) { }

  ngOnInit() {

    setTimeout(() => {
      this.getEmbarque();
    }, 3000);

    setTimeout(() => {
      this.loading = true
    }, 3700);

  }

  getEmbarque(){
    this.service.getCollectionData('embarque').subscribe((data) => {

      this.embarque = data.map((item: any) => {
        return {
          ...item,
          foto: '',
        }
      })

      this.embarque.forEach((item: any) => {

        this.service.getImageUrl(item.foto1).subscribe((url) => {

          item.foto = url;

       });

      });
    });

  }
}
