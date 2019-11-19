import { Component, OnInit } from '@angular/core';
import { WebapiService } from 'src/app/webapi.service';
import { ModeloPessoa, NovaPessoa } from 'src/app/modelo-pessoa';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup, FormControl, Validator } from '@angular/forms';
import { isCPF, formatToCPF } from 'brazilian-values';
import { Validaçõesservice } from 'src/app/validações.service';

@Component({
  selector: 'app-adicionar-pessoa',
  templateUrl: './adicionar-pessoa.component.html',
  styleUrls: ['./adicionar-pessoa.component.css']
})
export class AdicionarPessoaComponent implements OnInit {

  NovaPessoa: FormGroup;
  Novo : ModeloPessoa;
  
  constructor(private WebapiService: WebapiService, private _route: Router, private toasterService: ToastrService) { }

  ngOnInit() {
    this.NovaPessoa = new FormGroup({
      cpf: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/),
        Validaçõesservice.ValidaCpf,
      ])),
      nome: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-Ÿ][a-zÀ-ÿ']+([A-Za-zÀ-ÿ' ]?)*$/),
      ])),
      sobre_Nome: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-Ÿ][a-zÀ-ÿ']+([A-Za-zÀ-ÿ' ]?)*$/),
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i),
      ])),
      sexo: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      dT_Nascimento: new FormControl(null, Validators.compose([
        Validators.required,
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
      this.toasterService.error('Erro ao Cadastrar Usuário!');
    }
  }

  

  
  













  Validacampos(criarPessoa: NovaPessoa){
    let NomeRegex = /^[A-Z][a-zA-Z]*[a-zA-Z]+[a-zA-Z]*$/;
    let EmailRegex =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if(!criarPessoa.cpf || criarPessoa.cpf == null){
      alert("Digite o Cpf!");
      return false;
    }
    if(!criarPessoa.nome || criarPessoa.nome == null){
      alert("Digite o Nome!");
      return false;
    }
    if(!NomeRegex.test(criarPessoa.nome)){
      alert("Nome Inválido!");
      return false;
    }
    if(!criarPessoa.sobre_Nome || criarPessoa.sobre_Nome == null){
      alert("Digite o sobrenome!");
      return false;
    }
    if(!NomeRegex.test(criarPessoa.sobre_Nome)){
      alert("Sobrenome Inválido");
      return false;
    }
    if(!criarPessoa.email || criarPessoa.email == null){
      alert("Digite o Email!");
      return false;
    }
    if(!EmailRegex.test(criarPessoa.email)){
      alert("Email Inválido");
      return false;
    }
    if(!criarPessoa.dT_Nascimento || criarPessoa.dT_Nascimento == null){
      alert("Informe a Data de Nascimento!");
      return false;
    }
    if(!criarPessoa.sexo || criarPessoa.sexo == null){
      alert("Informe o Sexo!");
      return false;
    }
    else
    {
      return true;
    }
  }
  ValidaCpf(criarPessoa: NovaPessoa){
    if(criarPessoa.cpf.length != 11){
      alert("Cpf Inválido");
      return false;
    }
  }
}
