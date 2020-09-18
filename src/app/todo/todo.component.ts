import { Component, OnInit } from '@angular/core';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  constructor(
    private _todoService: TodoService
  ) { }
  public todoListArray: any[];


  public onAdd(itemTitle): void{
    this._todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  public onDelete($key): void{
    this._todoService.removeTitle($key);
  }

  public alterCheck ($key: string, isChecked: boolean): void{
    this._todoService.checkOrUncheckTitle($key, !isChecked);
  }
  ngOnInit(): void {
    this._todoService.getTodoList().snapshotChanges()
      .subscribe(item => {
        this.todoListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.todoListArray.push(x);
        });
        // short the arrary isChecked false >> true
        this.todoListArray.sort((a,b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }
}
