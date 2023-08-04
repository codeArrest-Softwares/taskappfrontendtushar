import { Component, Inject } from '@angular/core';
import { UserServiceService } from '../services/user.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  data:any;
  inputdata:any;
  constructor(private service:UserServiceService,private router:ActivatedRoute,private route : Router,private toastr : ToastrService,
    @Inject (MAT_DIALOG_DATA) public data2 :any,private ref : MatDialogRef<TaskViewComponent>){
    this.inputdata=this.data2; 
    this.showtask()
   
  }
  ngOnInit():void{

  }
  showtask(){
    this.service.getTaskById(this.inputdata.taskid).subscribe((result)=>{
      this.data=result;
    })
  }

  delete_task(id:any){
    this.service.delete_task(id).subscribe((result)=>{
      if(result){
        this.closepopup()
        this.toastr.info("Successfully Delete");
        this.service.getTask();
      }
    })
  }
  

  closepopup(){
    this.ref.close();
  }
}
