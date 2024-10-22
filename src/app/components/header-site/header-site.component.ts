import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-site',
  templateUrl: './header-site.component.html',
  styleUrls: ['./header-site.component.css']
})
export class HeaderSiteComponent implements OnInit {

  public innerWidth: any;
  public menu: boolean = false;

  constructor() { }

  ngOnInit() {

    this.innerWidth = window.innerWidth;

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  abrirMenu(){

    this.menu = !this.menu

  }
}
