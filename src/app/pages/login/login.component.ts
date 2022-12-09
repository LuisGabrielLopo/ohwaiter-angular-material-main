import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService){}
  login : string = "";
  senha : string = "";

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }
  logar(){
     this.login = this.form.get('uname')?.value;
     this.senha = this.form.get('password')?.value;
    localStorage.removeItem("ohwaitter_access_token");
    this.loginService.login(this.login,this.senha).subscribe(r =>{
      let token = r.access_token;
      let email = r.login;
      localStorage.setItem("ohwaitter_access_token", token);
      this.router.navigate(['']);
      console.log(token)
    })

  }






}
