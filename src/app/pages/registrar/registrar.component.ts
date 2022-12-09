import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
}from'@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from 'src/app/services/login.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  login:string = "";
  senha:string = "";
  confirmaSenha:string = "";
  nome:string = "";
  cpf:string = "";
  concorda:boolean=true;

  mensagem:string ="";


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  criar(){
    if(this.validarCampos()){
      this.loginService.criar(this.login, this.senha, this.cpf,this.nome).subscribe(r => {
        this.router.navigate(['/'])
      });
    }
  }
  desabilitarBotaoCriar():boolean{
    return !this.concorda || this.senha === "" || this.senha !== this.confirmaSenha;
  }
  validarCampos():boolean{
    let resp:boolean = true;
    if(this.login ===""){
      this.mensagem += "Login obrigatório !";
      resp =false;
    }
    if(this.cpf ===""){
      this.mensagem += "CPF obrigatório !";
      resp = false;
    }
    if(this.nome === ""){
      this.mensagem += "Nome Obrigatorio !";
      resp =false;
    }
    return resp;
  }


}
