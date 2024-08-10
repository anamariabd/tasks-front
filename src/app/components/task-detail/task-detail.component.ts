import { Component, inject, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router} from '@angular/router';
import { Task } from 'src/app/entities/Task';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {

  activeModal = inject(NgbActiveModal);
  closeResult = '';
  taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    status: ['pending']
  });

  
  router = inject(Router);
  selectedTask: any = this.router.getCurrentNavigation()?.extras?.state?.['taskParam'];
  constructor( private modalService: NgbModal, private taskService: TaskService, private formBuilder: FormBuilder){
    console.log(this.selectedTask)
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }
    );
  }

  editTask(){
    this.taskService.createTask(this.editTask).subscribe(
      (task) => {
        console.log('Task created:', task);
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

}
