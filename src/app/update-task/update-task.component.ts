import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UserServiceService } from '../services/user.service.service';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  title:string="";
  description:string="";
  priority:any;
  status:any;
  data:any;
  data3:any;
  
  updatetask = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl('Select Priority'),
    status: new FormControl('Select Status'),
    percentage: new FormControl(''),
    associatedProjects: new FormControl('')
  });

  constructor(private router:ActivatedRoute, private service:UserServiceService , private toastr: ToastrService, private route : Router,
  @Inject (MAT_DIALOG_DATA) public data2 :any, private ref : MatDialogRef<UpdateTaskComponent> ){
    this.data3=this.data2
    
    
  }
  


  ngOnInit():void{
    this.service.getTaskById(this.data3.taskid).subscribe((result:any)=>{
      this.updatetask=new FormGroup({
        
        title: new FormControl(result['title']),
        description: new FormControl(result['description']),
        priority: new FormControl(result['priority']),
        status: new FormControl(result['status']),
        percentage: new FormControl(result['percentage']),
        associatedProjects: new FormControl(result['associatedProjects'])
      })
      
    })
  }
  

  updateData(){
    this.service.updateData(this.data3.taskid ,this.updatetask.value).subscribe(()=>{
      this.closepopup()
      this.service.getTask();
      this.toastr.success("Task Updated");
    })
  }

  closepopup(){
    this.ref.close();
  }

}
