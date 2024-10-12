import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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

    post(viagem: any, collection: any): Promise<void> {
      const id = this.firestore.createId();
      return this.firestore.collection(collection).doc(id).set(viagem);
    }

      // Método para fazer o upload da imagem
    uploadImage(file: File, fileName: string): Observable<string> {
      const filePath = `${fileName}`; // Caminho e nome do arquivo
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(filePath, file);

      return new Observable<string>((observer) => {
        // Monitorar o progresso do upload e obter o URL de download
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              observer.next(url); // Retorna a URL de download
              observer.complete();
            });
          })
        ).subscribe();
      });
  }
}
