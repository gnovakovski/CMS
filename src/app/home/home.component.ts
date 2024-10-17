//import { FirebaseService } from './../service/firebase.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {

    // this.firebaseService.getCollectionData('users').subscribe((data: any) => {

    //   console.log('Dados da coleção:', data);
    // });
  }

}
