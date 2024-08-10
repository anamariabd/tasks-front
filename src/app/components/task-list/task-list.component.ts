import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/entities/Task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    //   this.listTask();

    this.tasks = [{
      id: 1,
      title: "Tarea 1",
      description: "Hacer tal cosa y tal tal",
      status: "PENDIENTE",
      createdAt: "03/01/12"
    }
    ];

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pendiente']
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
    this.taskService.createTask(this.newTask).subscribe(
      (task) => {
        console.log('Task created:', task);
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }
}
