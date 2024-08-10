import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailService {
    taskSelected: any;

  setTaskSelected(task: any) {
    this.taskSelected = task;
  }

  getTaskSelected() {
    return this.taskSelected;
  }
}