import { Injectable, OnInit } from '@angular/core';
import { login, signUp, task } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http : HttpClient, private router : Router, private toastr : ToastrService) { }
  data:any;
  userSignUp(user:signUp){
    this.http.post("https://localhost:7299/api/Register",user,{responseType: 'text'})
    .subscribe((result)=>{
      try {
        console.log('Received data from backend:', result);
        this.toastr.success("You are successfully Signup");
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        console.log('Received string data:', result);
      } 
    })
    
  }

  userLogIn(user:login){
    this.http.post("https://localhost:7299/api/Login",user,{responseType: 'text'})
    .subscribe((result)=>{
      if(result){
        console.log('Login token : ', result);
        localStorage.setItem('user',(result));
        this.toastr.success("You are successfully Login");
        this.router.navigate(['/']);
        
      } 
    })
  }

  getTask(){
    return this.http.get("https://localhost:7299/api/Task");
  }
  delete_task(id:any){
    return this.http.delete(`https://localhost:7299/api/Task/${id}`,{ responseType: 'text' });
  }
  getTaskById(id:any){
    return this.http.get(`https://localhost:7299/api/Task/${id}`);
  }

  saveTask(data:any){
     return this.http.post("https://localhost:7299/api/Task",data,{ responseType: 'text' });
    
  }
  updateData(id:any,data:any){
    return this.http.put(`https://localhost:7299/api/Task/${id}`,data,{ responseType: 'text' });
  }

  
}
