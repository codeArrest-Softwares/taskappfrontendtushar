import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user.service.service';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TaskViewComponent } from '../task-view/task-view.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data:any=[];
  count:any=1;
  constructor(private service: UserServiceService, private toastr : ToastrService, private dialogRef : MatDialog){
    this.getTasks();
  
  }
  addtask = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl('Select Priority'),
    status: new FormControl('Select Status'),
    associatedProjects: new FormControl(''),
    percentage: new FormControl(''),
  
  });

  SaveData(){
    this.service.saveTask(this.addtask.value).subscribe((result)=>{
      this.getTasks();
      this.addtask.reset();
      this.toastr.success("Your task succesfully created");
    })
  }
    
  
  getTasks(){
    this.service.getTask().subscribe(
      (response:any) => {
        this.data = response;
      }
    );
  }
  delete_task(id:any){
    this.service.delete_task(id).subscribe((result)=>{
      if(result){
        this.toastr.success("Successfully Delete");
        this.getTasks();
      }
    })
  }

  opentask(id:any){
    this.dialogRef.open(TaskViewComponent , {
      width:'50%',
      data:{
        taskid:id
      }
    })
  }

  updatetaskbyid(id:any){
    this.dialogRef.open(UpdateTaskComponent , {
      width:'90%',
      data:{
        taskid:id
      }
    })
  }
}
