import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private service: ServiceService ) {}

  listarClientes(): Observable<any> {
    return this.firestore.collection('clientes').valueChanges();
  }

  post(cliente: any, file: File, fileName: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection("clientes").doc(id).set(cliente);
    this.service.uploadImage(file, fileName)
  }
}