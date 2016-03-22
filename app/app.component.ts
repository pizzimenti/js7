import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  template: `
  <h3 *ngFor="#currentTask of taskList" (click)="taskClicked(currentTask)">
    {{ currentTask.description }}
  </h3>
  `
})
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log("child", clickedTask);
    this.onTaskSelect.emit(clickedTask);
  }
}


@Component({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
  <div class="container">
  <h1>To-Do List</h1>
  <task-list
    [taskList]="tasks"
    (onTaskSelect)="taskWasSelected($event)">
  </task-list>
  </div>
  `
})

export class AppComponent {
  public tasks: Task[];  //Task[] (or Array<Task>) identifies tasks as an array of objects
  constructor(){
    this.tasks = [
      new Task("Create To-Do List app", 0),
      new Task("Learn Kung Fu", 1),
      new Task("Rewatch Lord of the Rings", 2),
      new Task("Do the Laundry", 3)
    ];
  }
  taskWasSelected(clickedTask: Task): void {
    console.log("parent",clickedTask);
  }
}


export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number){

  }
}
