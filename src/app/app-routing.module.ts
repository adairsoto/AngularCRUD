import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { PessoasComponent } from './componentes/pessoas/pessoas.component';

const routes: Routes = [
  { path:'pessoas', component: PessoasComponent},
  {  path:'', component: HomeComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
