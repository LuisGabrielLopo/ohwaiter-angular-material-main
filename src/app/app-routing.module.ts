import { EstoqueComponent } from './pages/estoque/estoque.component';
import { IndexComponent } from './pages/index/index.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { RegistrarComponent } from './pages/registrar/registrar.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate:[UsuarioNaoAutenticadoGuard]},
  {path: '', component: PrincipalComponent,canActivate:[UsuarioAutenticadoGuard]},
  { path: 'funcionario', component: FuncionarioComponent, canActivate:[UsuarioAutenticadoGuard]},
  { path: 'estoque', component: EstoqueComponent, canActivate:[UsuarioAutenticadoGuard] },
  {path: 'registrar', component: RegistrarComponent} 
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
