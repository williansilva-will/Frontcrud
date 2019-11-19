import { Component, OnInit } from '@angular/core';
import { WebapiService } from 'src/app/webapi.service';
import { ModeloPessoa, NovaPessoa } from 'src/app/modelo-pessoa';
import { ToastrService } from 'ngx-toastr';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
            Validators.required,
          ])),
          nome: new FormControl(`${res.nome}`, Validators.compose([
            Validators.required,
            Validators.pattern(/^[A-Za-zÀ-Ÿ][a-zÀ-ÿ']+([A-Za-zÀ-ÿ' ]?)*$/),
          ])),
          sobre_Nome: new FormControl(`${res.sobre_Nome}`, Validators.compose([
            Validators.required,
            Validators.pattern(/^[A-Za-zÀ-Ÿ][a-zÀ-ÿ']+([A-Za-zÀ-ÿ' ]?)*$/),
          ])),
          email: new FormControl(`${res.email}`, Validators.compose([
            Validators.required,
            Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i),
          ])),
          sexo: new FormControl(`${res.sexo}`, Validators.compose([
            Validators.required,
          ])),
          dT_Nascimento: new FormControl(res.dT_Nascimento, Validators.compose([
            Validators.required,
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
      this.toasterService.error('Erro ao Atualizar os Dados de Usuário!');
    }
  }
}
