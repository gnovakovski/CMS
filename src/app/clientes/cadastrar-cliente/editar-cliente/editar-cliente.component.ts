import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service/service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

interface Foto {
  file: any;
  name: string;
}

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  public viagens: any;
  public form: any;
  public clientes: any;
  public cep: any;

  public cliente: any;
  public clienteId: any;

  fotos: Foto[] = [];
  initialFotos: Foto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

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
    });

    if (this.clienteId) {
      this.getVendaById(this.clienteId);
    }
  }

  getVendaById(id: any) {
    this.fotos = [];
    this.service.getById(id, 'clientes').pipe(take(1)).subscribe((data) => {
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

      Object.keys(this.cliente).forEach((key) => {
        if (key.startsWith('doc') && this.cliente[key]) {
          this.form.addControl(key, this.formBuilder.control(this.cliente[key]));

          this.fotos.push({ file: '', name: this.cliente[key] });
          this.initialFotos.push({ file: '', name: this.cliente[key] });
        }
      });
    });
  }

  upload(file: any, name: any): void {
    if (file) {
      const fileName = name;
      this.service.uploadImage(file, fileName).subscribe(
        (downloadUrl) => {
          console.log('Imagem enviada com sucesso! URL:', downloadUrl);
        },
        (error) => {
          console.error('Erro ao Salvar imagem:', error);
        }
      );
    }
  }

  onSubmit() {

    const docsToRemove = this.initialFotos.filter(
      (initialFoto) => !this.fotos.some((foto) => foto.name === initialFoto.name)
    );

    docsToRemove.forEach((doc) => {

      this.service.removerFoto(doc.name)
        .then(() => {
          console.log('Foto removida com sucesso do Firebase Storage!');
        })
        .catch(error => {
          console.error('Erro ao remover a foto do Firebase Storage:', error);
        });

    });

    let i = 1;
    this.fotos.forEach((item: any) => {
      const docKey = `doc${i}`;

      if (!this.initialFotos.some((foto) => foto.name === item.name)) {
        this.upload(item.file, item.name);
      }
      this.form.addControl(docKey, this.formBuilder.control(item.name));
      i++;
    });

    this.service.update(this.clienteId, this.form.value, "clientes")
      .then((resp) => {
        this.toastr.success('Cliente editado com sucesso!', 'Editar cliente');
        this.router.navigate(['/clientes']);
      })
      .catch((error) => {
        this.toastr.error(error, 'Erro');
      });
  }

  getCep() {
    let form = this.form.getRawValue();

    if (form.cep.length > 8) {
      this.service.getCep(form.cep).subscribe((resp) => {
        this.cep = resp;

        this.form.controls['endereco'].setValue(this.cep.logradouro);
        this.form.controls['estado'].setValue(this.cep.estado);
        this.form.controls['cidade'].setValue(this.cep.localidade);
        this.form.controls['bairro'].setValue(this.cep.bairro);
      });
    }
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }

  addDocumento(event: any): void {
    let documento = event.target.files[0];
    if (documento) {
      const reader = new FileReader();
      reader.onload = () => {
        let fileName = documento.name + `${new Date().getTime()}`;
        this.fotos.push({ file: documento, name: fileName });
        console.log(this.fotos);
      };
      reader.readAsDataURL(documento);
    }
  }

  removerDoc(index: number) {
    const removedFoto = this.fotos[index];
    const docKey = Object.keys(this.form.controls).find((key) => this.form.controls[key].value === removedFoto.name);
    if (docKey) {
      this.form.controls[docKey].setValue('');
    }
    this.fotos.splice(index, 1);
  }
}
