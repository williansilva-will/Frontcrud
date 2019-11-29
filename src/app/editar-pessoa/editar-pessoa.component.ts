import { Component, OnInit } from '@angular/core';
import { WebapiService } from 'src/app/webapi.service';
import { ModeloPessoa, NovaPessoa } from 'src/app/modelo-pessoa';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Validaçõesservice } from 'src/app/validações.service';


@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.css']
})
export class EditarPessoaComponent implements OnInit {

  id: string
  pessoainfo: FormGroup;

  constructor( private WebapiService: WebapiService, private route: ActivatedRoute, private _route: Router, private toasterService: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
      this.WebapiService.getPessoa(this.id).subscribe((res) => {
        this.pessoainfo = new FormGroup({
          id: new FormControl(res.id),
          cpf: new FormControl(`${res.cpf}`, Validators.compose([
            Validaçõesservice.ValidaCpf,
          ])),
          nome: new FormControl(`${res.nome}`, Validators.compose([
            Validaçõesservice.ValidaNome,
          ])),
          sobre_Nome: new FormControl(`${res.sobre_Nome}`, Validators.compose([
            Validaçõesservice.ValidaSobreNome,
          ])),
          email: new FormControl(`${res.email}`, Validators.compose([
            Validaçõesservice.ValidaEmail,
          ])),
          sexo: new FormControl(`${res.sexo}`, Validators.compose([
            Validaçõesservice.ValidaSexo,
          ])),
          dT_Nascimento: new FormControl(res.dT_Nascimento, Validators.compose([
            Validaçõesservice.ValidaDTnascimento,
          ]))
        })
      })
  }
  update() {
    if(this.pessoainfo.valid)
    {
    this.WebapiService.updatePessoa(this.id, this.pessoainfo.value).subscribe(()=>{
      this._route.navigate(['pessoas']);
      this.toasterService.success('Dados de Usuário Atualizados com Sucesso!');
    }) 
    }
    else
    {
      this.toasterService.error('Erro ao Atualizar Cadastro!');
    }
  }

  get nome() {
    return this.pessoainfo.get('nome');
  }

  get email() {
    return this.pessoainfo.get('email');
  }

  get cpf() {
    return this.pessoainfo.get('cpf');
  }

  get dT_Nascimento() {
    return this.pessoainfo.get('dT_Nascimento');
  }

  get sobre_Nome() {
    return this.pessoainfo.get('sobre_Nome');
  }

  get sexo() {
    return this.pessoainfo.get('sexo');
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

