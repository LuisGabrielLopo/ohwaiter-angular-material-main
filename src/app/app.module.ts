import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { IndexComponent } from './pages/index/index.component';
import { NovoFuncionarioComponent } from './pages/funcionario/funcionario.component';
import { EditarFuncionarioComponent } from './pages/funcionario/funcionario.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { NovoEstoqueComponent } from './pages/estoque/estoque.component';
import { EditarEstoqueComponent } from './pages/estoque/estoque.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavItensComponent } from './template/nav-itens/nav-itens.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;


function initializeKeycloak (keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'ohwaiter',
        clientId: 'owaiter-web',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavItensComponent,
    FooterComponent,
    FuncionarioComponent,
    IndexComponent,
    NovoFuncionarioComponent,
    EditarFuncionarioComponent,
    EstoqueComponent,
    NovoEstoqueComponent,
    EditarEstoqueComponent,
    LoginComponent,
    PrincipalComponent,
    RegistrarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    KeycloakAngularModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
