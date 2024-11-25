import { Component, HostListener, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public innerWidth: any;
  public contato: any;
  public whats: any;
  public menu: boolean = false;

  constructor(private service: ServiceService,) { }

  ngOnInit() {

    this.innerWidth = window.innerWidth;

    this.getContatoInsta();
    this.getContatoWhats();

  }

  getContatoWhats(){
    this.service.getById("T8oT1pxOSCwAIXPTMYNZ", "contato_whats").subscribe(data => {
      this.whats = data;

    });
  }

  insta(){
    window.location.href = this.contato.link
  }

  getWhats(){
    window.location.href = this.whats.link
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  getContatoInsta(){
    this.service.getById("PQXaQP4RhxIXSIGy3Z0l", "contato_insta").subscribe(data => {
      this.contato = data;

    });
  }

}
