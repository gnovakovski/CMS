import { Component } from '@angular/core';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html'
})
export class CadastrarClienteComponent {
  cliente = {
    nome: '',
    dataNascimento: '',
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
    estado: ''
  };

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

  documento: File | null = null;

  constructor(private clienteService: ClienteService) {}

  selecionarDocumento(event: any) {
    this.documento = event.target.files[0];
  }

  cadastrar() {
    if (this.documento) {
      this.clienteService.post(this.cliente, this.documento, this.documento.name).then(() => {
        alert('Cliente cadastrado com sucesso!');
      }).catch((error) => {
        console.error('Erro ao cadastrar cliente:', error);
      });
    }
  }
}

