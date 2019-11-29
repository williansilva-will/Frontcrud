import { Injectable } from '@angular/core';
import { AbstractControl } from '../../node_modules/@angular/forms';
import { isCPF } from 'brazilian-values';

@Injectable({
  providedIn: 'root'
})

export class Validaçõesservice {
  
  static ValidaCpf(control: AbstractControl) 
  {
    const cpf = control.value;
    let valido: boolean;
    const regex = new RegExp(/^[0-9]{11}$/);

    if(cpf == null || cpf == "")
     {
       return{ cpfRequired: true };
     }

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      valido = false;
    else 
    {
    if(isCPF(cpf))
    {
      valido = true;
    }
    }
    
    if (!valido) 
    {
      return { cpfInvalido: true };
    }
  }

  static ValidaEmail(control: AbstractControl)
  {
     const email = control.value;
     const RegexEmail = RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i);

     if(email == null || email == "")
     {
       return{ emailRequired: true };
     }

     if(!RegexEmail.test(email))
     {
      return { emailInvalido: true };
     }
     
  }

  static ValidaNome(control: AbstractControl)
  {
     const nome = control.value;
     const RegexNome = RegExp(/^[A-Za-zÀ-Ÿ][a-zÀ-ÿ']+([A-Za-zÀ-ÿ' ]?)*$/);

     if(nome == null || nome == "")
     {
       return{ nomeRequired: true };
     }

     if(!RegexNome.test(nome))
     {
      return { nomeInvalido: true };
     }
  }

  static ValidaSobreNome(control: AbstractControl)
  {
     const sobrenome = control.value;
     const RegexSobreNome = RegExp(/^[A-Za-zÀ-Ÿ][a-zÀ-ÿ']+([A-Za-zÀ-ÿ' ]?)*$/);

     if(sobrenome == null || sobrenome == "")
     {
       return{ sobrenomeRequired: true };
     }

     if(!RegexSobreNome.test(sobrenome))
     {
      return { sobrenomeInvalido: true };
     }
     
  }

  static ValidaSexo(control: AbstractControl)
  {
    const sexo = control.value;

    if(sexo == null || sexo == "")
     {
       return{ sexoRequired: true };
     }
  }

  static ValidaDTnascimento(control: AbstractControl)
  {
    const dtnascimento = control.value;
    const nascimento = new Date(dtnascimento);
    const datenow = new Date();
    const datelimit = new Date("01-01-1900");

    if(dtnascimento == null || dtnascimento == "")
     {
       return { dtnascimentoRequired: true };
     }
     
     if(nascimento > datenow)
     {
      return { datafuturaInvalido: true }
     }
     
     if(nascimento < datelimit)
     {
       return { datalimiteInvalido: true }
     }
  }
}