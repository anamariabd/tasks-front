import { Component, inject, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router} from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


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
    this.taskForm = this.formBuilder.group({
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      status: ['pending']
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }
    );
  }

  editTask(id:any){
    this.taskService.updateTask(this.taskForm.value, id).subscribe(
      (task) => {
        Swal.fire({
          icon: 'success',
          title: 'Tarea actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la tarea',
          text: error.message,
          showConfirmButton: true
        });
        console.error('Error editando task:', error);
      }
    );
  }

  eliminarTarea(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:  '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed)   
 {
        this.taskService.deleteTask(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado!',
              'La tarea ha sido eliminada.',
              'success'
            )
          },
          (error) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar la tarea.',
              'error'
            )
          }
        );
      }
    })
  }
}
