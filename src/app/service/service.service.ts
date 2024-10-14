import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private fireStorage: AngularFireStorage) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


    logout(): Promise<void> {
      return this.afAuth.signOut();
    }

    getCollectionData(collectionName: string): Observable<any[]> {
      return this.firestore.collection(collectionName).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;  // Tipagem como 'any' para simplificação
          const id = a.payload.doc.id;  // ID do documento
          return { id, ...data };  // Retorna o ID junto com os dados
        }))
      );
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
    const filePath = fileName; // Caminho e nome do arquivo
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

  getById(id: string, collection: any): Observable<any> {
    return this.firestore.collection(collection).doc(id).valueChanges();
  }

  update(id: string, viagemData: any, collection: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(viagemData);
  }

  removerFoto(nomeArquivo: string): Promise<void> {
    const fileRef = this.fireStorage.ref(nomeArquivo);
    return fileRef.delete().toPromise();
  }

  delete(id: string, collection: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }

  getCep(cep: any): Observable<any> {

    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)

  }
}
