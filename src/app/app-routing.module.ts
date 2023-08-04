import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'update/:taskId', component:UpdateTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
