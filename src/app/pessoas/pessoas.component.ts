import { Component, OnInit } from '@angular/core';
import { WebapiService } from 'src/app/webapi.service';
import { ModeloPessoa } from 'src/app/modelo-pessoa';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  listapessoas: ModeloPessoa[];
  umapessoa: ModeloPessoa;
  ModalRef: BsModalRef;

  constructor(private WebapiService: WebapiService, private toasterService: ToastrService, private ModalService: BsModalService) {}

  ngOnInit() {
    this.getall()
  }
  
  getall(){
    this.WebapiService.getPessoas().subscribe(res => {
      this.listapessoas = res;
      for (let x = 0; x < this.listapessoas.length; x++){
        this.listapessoas[x].cpf = this.listapessoas[x].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
      }
    })
  } 
  
  delete(id: string): void {
      this.WebapiService.deletePessoa(id).subscribe(() => {
      this.toasterService.success('Cadastro Removido com Sucesso');
      }) 
      location.reload();
  }
  
  getone(id: string){
    this.WebapiService.getPessoa(id).subscribe((res) => {
      this.umapessoa = {
        id: res.id,
        cpf: `${res.cpf}`,
        nome:`${res.nome}`,
        sobre_Nome:`${res.sobre_Nome}`,
        email:`${res.email}`,
        sexo:`${res.sexo}`,
        dT_Nascimento: res.dT_Nascimento
      };
      this.umapessoa.cpf = this.umapessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    })
  }

  openModal(template, id: string) {
    this.ModalRef = this.ModalService.show(template);
    this.getone(id);
  }
}
