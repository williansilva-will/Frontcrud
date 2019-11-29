import { Component, OnInit } from '@angular/core';
import { WebapiService } from 'src/app/webapi.service';
import { ModeloPessoa } from 'src/app/modelo-pessoa';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Validaçõesservice } from 'src/app/validações.service';

@Component({
  selector: 'app-adicionar-pessoa',
  templateUrl: './adicionar-pessoa.component.html',
  styleUrls: ['./adicionar-pessoa.component.css']
})
export class AdicionarPessoaComponent implements OnInit {

  NovaPessoa: FormGroup;
  Novo: ModeloPessoa;
  
  constructor(private WebapiService: WebapiService, private _route: Router, private toasterService: ToastrService) { }

  ngOnInit() {
    this.NovaPessoa = new FormGroup({
      cpf: new FormControl(null, Validators.compose([
        Validaçõesservice.ValidaCpf,
      ])),
      nome: new FormControl(null, Validators.compose([
        Validaçõesservice.ValidaNome,
      ])),
      sobre_Nome: new FormControl(null, Validators.compose([
        Validaçõesservice.ValidaSobreNome,
      ])),
      email: new FormControl(null, Validators.compose([
        Validaçõesservice.ValidaEmail,
      ])),
      sexo: new FormControl(null, Validators.compose([
        Validaçõesservice.ValidaSexo,
      ])),
      dT_Nascimento: new FormControl(null, Validators.compose([
        Validaçõesservice.ValidaDTnascimento,
      ]))
    })
  }

  Adicionar()
  {
    if(this.NovaPessoa.valid)
    {
      this.WebapiService.addPessoa(this.NovaPessoa.value).subscribe((res) => {
        this.Novo = res
        this._route.navigate(['pessoas']);
        this.toasterService.success('Usuário Cadastrado com Sucesso!');
      })
    }
    else
    {
      this.toasterService.error('Erro ao Adicionar Cadastro!');
    }
  }

  get nome() {
    return this.NovaPessoa.get('nome');
  }

  get email() {
    return this.NovaPessoa.get('email');
  }

  get cpf() {
    return this.NovaPessoa.get('cpf');
  }

  get dT_Nascimento() {
    return this.NovaPessoa.get('dT_Nascimento');
  }

  get sobre_Nome() {
    return this.NovaPessoa.get('sobre_Nome');
  }

  get sexo() {
    return this.NovaPessoa.get('sexo');
  }

  teste(erro) {
    if(erro.cpfRequired)
    return "O Campo CPF é de Preenchimento Obrigatório!";

    if(erro.cpfInvalido)
    return "O CPF Inserido é Inválido!"

    if(erro.nomeRequired)
    return "O Campo Nome é de Preenchimento Obrigatório!";

    if(erro.nomeInvalido)
    return "O Nome Inserido é Inválido!"

    if(erro.sobrenomeRequired)
    return "O Campo Sobrenome é de Preenchimento Obrigatório!";

    if(erro.sobrenomeInvalido)
    return "O Sobrenome Inserido é Inválido!"

    if(erro.emailRequired)
    return "O Campo Email é de Preenchimento Obrigatório!";

    if(erro.emailInvalido)
    return "O Email Inserido é Inválido!"

    if(erro.sexoRequired)
    return "O Campo Sexo deve ter Alguma Opção Selecionada!";

    if(erro.dtnascimentoRequired)
    return "A data de Nascimento deve ser Informada!";

    if(erro.datafuturaInvalido)
    return "Não são Permitidas Datas de Nascimento Futuras!"

    if(erro.datalimiteInvalido)
    return "Não são Permitidas Datas de Nascimento Anteriores à 1900!!"
  }


}
