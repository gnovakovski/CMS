import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private fireStorage: AngularFireStorage) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


    logout(): Promise<void> {
      return this.afAuth.signOut();
    }

    getCollectionData(collectionName: string): Observable<any[]> {
      return this.firestore.collection(collectionName).valueChanges();
    }

    getImageUrl(imageName: string): Observable<string> {
      const imageRef = this.fireStorage.ref(imageName);
      return imageRef.getDownloadURL();
    }
}
