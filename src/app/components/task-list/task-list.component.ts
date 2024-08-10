import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/entities/Task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent /*implements OnInit*/ {

  activeModal = inject(NgbActiveModal);
  closeResult = '';
  tasks: Task[] | undefined;
  taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    status: ['pending']
  });

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'pending',
    createdAt: '' 
  };

  constructor(private taskService: TaskService, private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
     this.listTask();

   /* this.tasks = [{
      id: 1,
      title: "Tarea 1",
      description: "Hacer tal cosa y tal tal",
      status: "PENDIENTE",
      createdAt: "03/01/12"
    }
    ];*/

    this.taskForm = this.formBuilder.group({
      id: 0,
      title: ['', Validators.required],
      description: [''],
      status: ['PENDING'],
      createdAt: '' 
    });
  }

  listTask(): void {
    this.taskService.getTasks().subscribe(
      {
        next: (data) => {
          this.tasks = data;
        }
      }
    )
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }
    );
  }

  addTask() {

    this.taskForm.patchValue({createdAt: new Date() })

    this.taskService.createTask(this.taskForm.value).subscribe(
      (task) => {
        console.log('Task created:', task);
        Swal.fire({
          icon: 'success',
          title: 'Tarea creada correctamente',
          showConfirmButton: true
        });

        this.listTask();
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }
}
