import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../entities/Task';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private _refresh = new Subject<void>();
  constructor(private http: HttpClient) { }
  
  get refresh() {
    return this._refresh;
  }
  
    getTasks():Observable<Task[]> {
      return this.http.get<Task[]>(baseUrl);
    }
    
    getTaskById(id:any): Observable<Task[]> {
      return this.http.get<Task[]>(`${baseUrl}/${id}`)
    }
  
    createTask(task:any):Observable<any>{
      return this.http.post(baseUrl, task);
    }
  
    updateTask(task: any, id:any): Observable<any>{
      return this.http.put(`${baseUrl}/${id}`, task);
    }

     
    deleteTask(id:any): Observable<any>{
      return this.http.delete(`${baseUrl}/${id}`);
    }
  
}
