import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas.component';
import { AdicionarPessoaComponent } from './adicionar-pessoa/adicionar-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { DeletarPessoaComponent } from './deletar-pessoa/deletar-pessoa.component';


const routes: Routes = [
  {path: "", component: PessoasComponent},
  {path: "pessoas", component: PessoasComponent},
  {path: "adicionar-pessoa", component: AdicionarPessoaComponent},
  {path: "editar-pessoa/:id", component: EditarPessoaComponent},
  {path: "deletar-pessoa", component: DeletarPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
