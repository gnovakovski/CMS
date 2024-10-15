import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service/service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Foto {
  file: any
  name: string
}

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public viagens: any
  public form: any;
  public clientes: any;
  public cep: any;

  public cliente: any;
  public clienteId: any;

  fotos: Foto[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: ServiceService, public formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {

    this.clienteId = this.activatedRoute.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      nome: '',
      data_nascimento: '',
      email: '',
      rg: '',
      telefone: '',
      cpf: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      doc1: '',
      doc2: '',
      doc3: '',
      doc4: '',
      doc5: '',

    });

    this.getVendaById(this.clienteId);

  }

  voltar(){

    this.router.navigate(['/clientes']);

  }

  getVendaById(id: any){

    this.service.getById(id, "clientes").subscribe(data => {
      this.cliente = data;

      this.form.controls['nome'].setValue(this.cliente.nome);
      this.form.controls['data_nascimento'].setValue(this.cliente.data_nascimento);
      this.form.controls['email'].setValue(this.cliente.email);
      this.form.controls['rg'].setValue(this.cliente.rg);
      this.form.controls['telefone'].setValue(this.cliente.telefone);
      this.form.controls['cpf'].setValue(this.cliente.cpf);
      this.form.controls['cep'].setValue(this.cliente.cep);
      this.form.controls['endereco'].setValue(this.cliente.endereco);
      this.form.controls['numero'].setValue(this.cliente.numero);
      this.form.controls['complemento'].setValue(this.cliente.complemento);
      this.form.controls['bairro'].setValue(this.cliente.bairro);
      this.form.controls['cidade'].setValue(this.cliente.cidade);
      this.form.controls['estado'].setValue(this.cliente.estado);

      if(this.cliente.doc1 === undefined){
        this.form.removeControl('doc1');
      }else{
        this.form.controls['doc1'].setValue(this.cliente.doc1);

        this.service.getImageUrl(this.cliente.doc1).subscribe((url) => {

          this.fotos.push({ file: '', name: this.cliente.doc1 });


         });
      }

      if(this.cliente.doc2 === undefined){
        this.form.removeControl('doc2');
      }else{
        this.form.controls['doc2'].setValue(this.cliente.doc2);

        this.service.getImageUrl(this.cliente.doc2).subscribe((url) => {

          this.fotos.push({ file: '', name: this.cliente.doc2 });

         });
      }

      if(this.cliente.doc3 === undefined){
        this.form.removeControl('doc3');
      }else{
        this.form.controls['doc3'].setValue(this.cliente.doc3);

        this.service.getImageUrl(this.cliente.doc3).subscribe((url) => {

          this.fotos.push({ file: '', name: this.cliente.doc3 });

         });
      }

      if(this.cliente.doc4 === undefined){
        this.form.removeControl('doc4');
      }else{
        this.form.controls['doc4'].setValue(this.cliente.doc4);

        this.service.getImageUrl(this.cliente.doc4).subscribe((url) => {

          this.fotos.push({ file: '', name: this.cliente.doc4 });

         });
      }

      if(this.cliente.doc5 === undefined){
        this.form.removeControl('doc5');
      }else{
        this.form.controls['doc5'].setValue(this.cliente.doc5);

        this.service.getImageUrl(this.cliente.doc5).subscribe((url) => {

          this.fotos.push({ file: '', name: this.cliente.doc5 });

         });
      }

    });
  }

  onSubmit() {

    let i = 1;

    this.fotos.forEach((item: any) => {
      const docKey = `doc${i}`;

      this.form.addControl(docKey, this.formBuilder.control(item.name));

      i++;

    });

    this.service.post(this.form.value, "clientes")
      .then((resp) => {
        console.log(resp)
        this.toastr.success('Cliente cadastrado com sucesso!', 'Cadastrar cliente');

        this.fotos.forEach((item: any) => {

          this.upload(item.file, item.name);

        });

        this.router.navigate(['/clientes']);
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
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

  getCep(){

    let form = this.form.getRawValue();

    if(form.cep.length > 8){
      this.service.getCep(form.cep).subscribe((resp) => {

        this.cep = resp;

        this.form.controls['endereco'].setValue(this.cep.logradouro);
        this.form.controls['estado'].setValue(this.cep.estado);
        this.form.controls['cidade'].setValue(this.cep.localidade);
        this.form.controls['bairro'].setValue(this.cep.bairro);

      });
    }
  }

  addDocumento(event: any): void {
    let documento = event.target.files[0];
    if (documento) {
      const reader = new FileReader();
      reader.onload = () => {
        let doc = reader.result;

        let fileName = documento.name + `${new Date().getTime()}`;

        this.fotos.push({ file: documento, name: fileName });

        console.log(this.fotos);
      };
      reader.readAsDataURL(documento);
    }
  }

  removerDoc(index: number) {
    this.fotos.splice(index, 1);
  }

}
