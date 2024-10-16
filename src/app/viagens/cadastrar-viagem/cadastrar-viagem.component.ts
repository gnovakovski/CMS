import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-viagem',
  templateUrl: './cadastrar-viagem.component.html',
  styleUrls: ['./cadastrar-viagem.component.css']
})
export class CadastrarViagemComponent implements OnInit {

  public form: any;

  public foto1: any;
  public foto2: any;
  public foto3: any;
  public foto4: any;
  public foto5: any;

  public file1: any;
  public file2: any;
  public file3: any;
  public file4: any;
  public file5: any;

  public fornecedores: any;

  content = '';

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(private router: Router, private service: ServiceService, public formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      titulo: '',
      vagas: '',
      data_ida: '',
      data_volta: '',
      whats_parceiro: '',
      tipo_negocio: '',
      valor_parcela: '',
      taxa_adm: '',
      fornecedor: '',
      markup: '',
      parcelamento: '',
      preco: '',
      roteiro: '',
      sobre_destino: '',
      servicos: '',
      passeios_opcionais: '',
      levar: '',
      documentos: '',
      aereo: '',
      rodoviario: '',
      ativo: '',
      foto1: `minha-imagem1-${new Date().getTime()}`,
      foto2: `minha-imagem2-${new Date().getTime()}`,
      foto3: `minha-imagem3-${new Date().getTime()}`,
      foto4: `minha-imagem4-${new Date().getTime()}`,
      foto5: `minha-imagem5-${new Date().getTime()}`,
    });

    this.getFornecedores();

  }

  getFornecedores(){
    this.service.getCollectionData('fornecedores').subscribe((data) => {

      this.fornecedores = data;

    });

  }

  voltar(){

    this.router.navigate(['/produtos']);

  }

  onSubmit() {

    if(!this.file1){
      this.form.controls['foto1'].setValue("");
    }

    if(!this.file2){
      this.form.controls['foto2'].setValue("");
    }

    if(!this.file3){
      this.form.controls['foto3'].setValue("");
    }

    if(!this.file4){
      this.form.controls['foto4'].setValue("");
    }

    if(!this.file5){
      this.form.controls['foto5'].setValue("");
    }


      this.service.post(this.form.value, "viagens")
        .then((resp) => {
          console.log(resp)
          this.toastr.success('Viagem cadastrada com sucesso!', 'Cadastrar viagem');

          if(this.file1){
            this.upload(this.file1, this.form.value.foto1);
          }

          if(this.file2){
            this.upload(this.file2, this.form.value.foto2);
          }

          if(this.file3){
            this.upload(this.file3, this.form.value.foto3);
          }

          if(this.file4){
            this.upload(this.file4, this.form.value.foto4);
          }

          if(this.file5){
            this.upload(this.file5, this.form.value.foto5);
          }

          this.router.navigate(['/viagens']);
        })
        .catch((error) => {
          this.toastr.error(error, 'Erro');
        });
  }

  removeFoto1(){
    this.foto1 = "";
    this.file1 = "";
  }

  removeFoto2(){
    this.foto2 = "";
    this.file2 = "";
  }

  removeFoto3(){
    this.foto3 = "";
    this.file3 = "";
  }

  removeFoto4(){
    this.foto4 = "";
    this.file4 = "";
  }

  removeFoto5(){
    this.foto5 = "";
    this.file5 = "";
  }

  addFoto1(event: any): void {
    this.file1 = event.target.files[0];
    if (this.file1) {

      const reader = new FileReader();
      reader.onload = () => {
        this.foto1 = reader.result;
      };
      reader.readAsDataURL(this.file1);
    }
  }

  addFoto2(event: any): void {
    this.file2 = event.target.files[0];
    if (this.file2) {

      const reader = new FileReader();
      reader.onload = () => {
        this.foto2 = reader.result;
      };
      reader.readAsDataURL(this.file2);
    }
  }

  addFoto3(event: any): void {
    this.file3 = event.target.files[0];
    if (this.file3) {

      const reader = new FileReader();
      reader.onload = () => {
        this.foto3 = reader.result;
      };
      reader.readAsDataURL(this.file3);
    }
  }

  addFoto4(event: any): void {
    this.file4 = event.target.files[0];
    if (this.file4) {

      const reader = new FileReader();
      reader.onload = () => {
        this.foto4 = reader.result;
      };
      reader.readAsDataURL(this.file4);
    }
  }

  addFoto5(event: any): void {
    this.file5 = event.target.files[0];
    if (this.file5) {

      const reader = new FileReader();
      reader.onload = () => {
        this.foto5 = reader.result;
      };
      reader.readAsDataURL(this.file5);
    }
  }

  upload(file: any, name: any): void {
    if (file) {
      const fileName = name;
      this.service.uploadImage(file, fileName).subscribe((downloadUrl) => {
        console.log('Imagem enviada com sucesso! URL:', downloadUrl);
      }, error => {
        console.error('Erro ao Salvar imagem:', error);
      });
    }
  }

}
